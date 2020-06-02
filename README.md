# signalk-liblog

Log system interface library for Signal K node plugins.

Provides a small collection of methods suitable for writing messages
into the Signal K dashboard and the host system logs.

```
const Log = require("./lib/signalk-liblog/Log.js");

const log = new Log(plugin.id, { scallback: app.setProviderStatus, ecallback: app.setProviderError });

log.N("server listening on UDP port");

log.E("server rejected invalid client", false);
```

## Constructor

__Log(*message-prefix* [, *options* ])__



