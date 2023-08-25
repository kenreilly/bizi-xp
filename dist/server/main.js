"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import * as http from 'node:https'
const http = require("node:http");
const bizia_config_1 = require("./bizia-config");
const static_app_router_1 = require("./static-app-router");
class BiziaServer {
    static http_port = 2600;
    static ws_port = 2601;
    server;
    router;
    constructor(cfg) {
        // this.server = http.createServer(cfg.ssl, this.on_request.bind(this))
        this.server = http.createServer(this.on_request.bind(this));
        this.init_routers(cfg);
    }
    init_routers(cfg) {
        try {
            this.router = new static_app_router_1.StaticAppRouter(cfg);
            // TODO: websocket upgrade handler
        }
        catch (e) {
            console.log(e);
        }
    }
    on_request(req, res) {
        if (req.method == 'GET') {
            this.router.handle(req, res);
        }
    }
    run() {
        this.server.listen(BiziaServer.http_port);
        console.log('running on port ' + BiziaServer.http_port);
    }
}
let server = new BiziaServer(new bizia_config_1.BiziaConfig);
server.run();
//# sourceMappingURL=main.js.map