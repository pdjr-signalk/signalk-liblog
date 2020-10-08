/**********************************************************************
 * Copyright 2020 Paul Reeve <preeve@pdjr.eu>
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you
 * may not use this file except in compliance with the License. You may
 * obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
 * implied. See the License for the specific language governing
 * permissions and limitations under the License.
 *
 * DebugLog interfaces the host application with debug  keys matching
 * the style of the npm debug library. The class circumvents some
 * restrictions in the Signal K use of debug.
 *
 * Debug keys have the form prefix:key where prefix will normally be
 * the name of the host Signal K plugin and key is the name of a
 * specific debug key, or "*" to indicate all keys.
 */

module.exports = class DebugLog {

  /********************************************************************
   * Create a new DebugLog instance. <prefix> is the debug key prefix
   * and <keys> is a list of supported key names.
   */

  constructor(prefix, keys = []) {
    this.prefix = prefix;
    this.keys = keys;
  }

  /********************************************************************
   * Output <message> to the console log, but only if <key> is a member
   * of the key list passed to the constructor and the environment
   * variable DEBUG contains a token of the form <prefix>:* or
   * <prefix>:<key>.
   */

  N(key, message, ...moreargs) {
    if ((process.env.DEBUG) && ((this.keys.includes(key)) || (key == "*"))) {
      var debugKeys = process.env.DEBUG.split(/[\s+|,]/);
      if (debugKeys.includes(this.prefix + ":*") || debugKeys.includes(this.prefix + ":" + key)) { 
        console.log(this.prefix + ":" + key + ": " + message, ...moreargs);
      }
    }
  }

  /********************************************************************
   * Return the <prefix> that was passed to the constructor.
   */

  getPrefix() {
    return(this.prefix);
  }

  /********************************************************************
   * Return the list of <keys> that were passed to the constructor.
   */

  getKeys() {
    return(this.keys);
  }

}
