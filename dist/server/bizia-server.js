"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import * as http from 'node:https'
const http = require("node:http");
const bizia_config_1 = require("./bizia-config");
const static_app_router_1 = require("./static-app-router");
const ws_router_1 = require("./ws-router");
class BiziaServer {
    static http_port = 2600;
    static ws_port = 2601;
    http_server;
    ws_server;
    app_router;
    ws_router;
    constructor(config) {
        // this.server = http.createServer(cfg.ssl, this.on_request.bind(this))
        this.http_server = http.createServer(this.on_http.bind(this));
        this.ws_server = http.createServer();
        this.app_router = new static_app_router_1.StaticAppRouter(config);
        this.ws_router = new ws_router_1.WebSocketRouter();
        this.ws_server.on('upgrade', this.ws_router.on_upgrade.bind(this.ws_router));
    }
    on_http(req, res) {
        if (req.method == 'GET') {
            return this.app_router.handle(req, res);
        }
        res.statusCode = 400;
        res.end();
    }
    run() {
        this.http_server.listen(BiziaServer.http_port);
        this.ws_server.listen(BiziaServer.ws_port);
        console.log('http running on port ' + BiziaServer.http_port);
        console.log('ws running on port ' + BiziaServer.ws_port);
    }
}
let server = new BiziaServer(new bizia_config_1.BiziaConfig);
server.run();
//# sourceMappingURL=bizia-server.js.map