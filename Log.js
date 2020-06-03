module.exports = class Log {

    constructor(prefix, options={}) {
        this.prefix = prefix;
        this.options = options;
        if ((this.options.ncallback) && (!this.options.wcallback)) this.options.wcallback = this.options.ncallback;
        if ((this.options.ncallback) && (!this.options.ecallback)) this.options.ecallback = this.options.ncallback;
    }

    N(message, toConsole = true) {
        this.log(message, 0, toConsole);
    }

    W(message, toConsole = true) {
        this.log(message, 1, toConsole);
    }

    E(message, toConsole = true) {
        this.log(message, 2, toConsole);
    }

    log(message, type, toConsole) {
        if (message) {
            // Always write message to syslog
	        console.log("%s:%s %s", (this.prefix)?this.prefix:"(undefined)", ["", "warning:", "error:"][type], message);
    
            if (toConsole) {
                message = message.charAt(0).toUpperCase() + message.slice(1);
                switch (type) {
                    case 0:
                        if (options.ncallback) options.ncallback(message);
                        break;
                    case 1:
                        if (options.wcallback) options.wcallback(message);
                        break;
                    case 2:
                        if (options.ecallback) options.ecallback(message);
                        break;
                }
            }
        }
    }
}
