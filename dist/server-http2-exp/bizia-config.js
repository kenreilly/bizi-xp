"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BiziaConfig = void 0;
const fs = require("node:fs");
const path = require("node:path");
var RUNTIME_ENV;
(function (RUNTIME_ENV) {
    RUNTIME_ENV[RUNTIME_ENV["DEV"] = 0] = "DEV";
    RUNTIME_ENV[RUNTIME_ENV["STAGE"] = 1] = "STAGE";
    RUNTIME_ENV[RUNTIME_ENV["PROD"] = 2] = "PROD";
})(RUNTIME_ENV || (RUNTIME_ENV = {}));
class BiziaConfig {
    static runtime = RUNTIME_ENV.DEV;
    static get is_prod() { return BiziaConfig.runtime == RUNTIME_ENV.PROD; }
    get http_port() { return BiziaConfig.is_prod ? 8080 : 3000; }
    ssl_path;
    ssl_cert;
    ssl_key;
    constructor() {
        this.ssl_path = path.resolve('./ssl/');
        this.ssl_cert = fs.readFileSync(path.resolve(this.ssl_path + '/localhost-cert.pem'));
        this.ssl_key = fs.readFileSync(path.resolve(this.ssl_path + '/localhost-privkey.pem'));
    }
}
exports.BiziaConfig = BiziaConfig;
//# sourceMappingURL=bizia-config.js.map