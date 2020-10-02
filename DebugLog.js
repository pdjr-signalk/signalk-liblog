module.exports = class DebugLog {

    constructor(prefix, keys = []) {
        this.prefix = prefix;
        this.keys = keys;
    }

    N(key, message, ...moreargs) {
        if (this.keys.includes(key)) {
            var debugKeys = process.env.DEBUG.split(/[\s+|,]/);
            if (debugKeys.includes(this.prefix + ":*") || debugKeys.includes(this.prefix + ":" + key)) { 
                console.log(this.prefix + ":" + key + ": " + message, ...moreargs);
            }
        }
    }

    getKeys() {
        return(this.keys);
    }

}
