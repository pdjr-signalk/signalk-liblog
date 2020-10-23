/**********************************************************************
 * Copyright 2020 Paul Reeve <preeve@pdjr.eu>
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you
 * may not use this file except in compliance with the License. You
 * may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
 * implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

const sprintf = require("sprintf-js").sprintf;

module.exports = class Log {

  constructor(prefix, options={}) {
    this.prefix = prefix;
    this.options = options;
    if ((this.options.ncallback) && (!this.options.wcallback)) this.options.wcallback = this.options.ncallback;
    if ((this.options.ncallback) && (!this.options.ecallback)) this.options.ecallback = this.options.ncallback;
  }

  N(message, ...moreargs) {
    this.log(0, message, ...moreargs);
  }

  W(message, ...moreargs) {
    this.log(1, message, ...moreargs);
  }

  E(message, ...moreargs) {
    this.log(2, message, ...moreargs);
  }

  log(type, message, ...moreargs) {
    if (message) {
      // Always write message to syslog
      console.log("%s:%s " + message, (this.prefix)?this.prefix:"(undefined)", ["", "warning:", "error:"][type], ...moreargs);
      var toConsole = ((!moreargs.length) || (moreargs.length == 0))?true:(moreargs[moreargs.length - 1]);
    
      if (toConsole) {
        message = message.charAt(0).toUpperCase() + message.slice(1);
        switch (type) {
          case 0:
            if (this.options.ncallback) this.options.ncallback(sprintf(message, ...moreargs));
            break;
          case 1:
            if (this.options.wcallback) this.options.wcallback(sprintf(message, ...moreargs));
            break;
          case 2:
            if (this.options.ecallback) this.options.ecallback(sprintf(message, ...moreargs));
            break;
        }
      }
    }
  }

}
