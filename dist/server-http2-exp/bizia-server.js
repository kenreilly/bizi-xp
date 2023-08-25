"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BiziaServer = void 0;
const node_http2_1 = require("node:http2");
const bizia_router_1 = require("./bizia-router");
var RequestEvent;
(function (RequestEvent) {
    RequestEvent["STREAM"] = "stream";
    RequestEvent["ERROR"] = "error";
    RequestEvent["PING"] = "ping";
})(RequestEvent || (RequestEvent = {}));
class BiziaServer {
    static server;
    static on_error = (error) => console.log(error);
    static init(config) {
        let server = (0, node_http2_1.createSecureServer)({ key: config.ssl_key, cert: config.ssl_cert });
        server.on(RequestEvent.ERROR, BiziaServer.on_error);
        server.on(RequestEvent.STREAM, bizia_router_1.BiziaRouter.on_stream);
        BiziaServer.server = server;
        BiziaServer.server.listen(config.http_port);
    }
}
exports.BiziaServer = BiziaServer;
//# sourceMappingURL=bizia-server.js.map