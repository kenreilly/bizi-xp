"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BiziaConfig = void 0;
const path = require("node:path");
const fs = require("node:fs");
class BiziaConfig {
    static ws_rfc_guid = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
    server_root = process.cwd();
    css_url = 'css/';
    src_url = 'src/client-web/';
    base_app_url = 'dist/client-web/';
    get ssl() { return { key: this.ssl_key, cert: this.ssl_cert }; }
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