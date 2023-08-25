"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketRouter = void 0;
const crypto = require("node:crypto");
const bizia_config_1 = require("./bizia-config");
class WebSocketRouter {
    ws_clients = {};
    constructor() { }
    on_upgrade(req, socket, head) {
        if (req.headers['upgrade'] != 'websocket')
            return;
        let key = req.headers['sec-websocket-key'];
        let hash = crypto.createHash('sha1');
        let accept = key + bizia_config_1.BiziaConfig.ws_rfc_guid;
        let accept_hash = hash.update(accept, 'binary').digest('base64');
        let headers = [
            'HTTP/1.1 101 Switching Protocols',
            'Upgrade: websocket',
            'Connection: Upgrade',
            'Sec-WebSocket-Accept: ' + accept_hash
        ];
        this.ws_clients[key] = socket;
        socket.on('data', this.on_data.bind(this, key));
        socket.write(headers.concat('\r\n').join('\r\n'));
    }
    on_data(id, data) {
        try {
            let final = Boolean(data[0] >>> 7);
            let opcode = (data[0] & 0b00001111);
            let masked = Boolean(data[1] >>> 7);
            let lvalue = (data[1] & 0b01111111);
            let length = ((lvalue == 126) ? data.readUInt16LE(2) : lvalue);
            let big_length = ((lvalue == 127) ? data.readBigUint64LE(2) : null);
            let mask = [];
            let offset = 2;
            offset += (lvalue == 127) ? 8 : (offset == 126 ? 2 : 0);
            if (masked) {
                for (i = 0; i != 4; ++i) {
                    mask[i] = data[offset + i];
                }
                offset += 4;
            }
            let payload = data.subarray(offset);
            let content = Buffer.alloc(data.length - offset);
            for (var i = 0; i != payload.length; ++i) {
                content.writeUint8(payload[i] ^ mask[i % 4], i);
            }
            let x = content.toString();
            this.parse(content);
        }
        catch (e) {
            console.log(e);
        }
    }
    parse(message) {
        try {
            let obj = JSON.parse(message.toString());
        }
        catch (e) {
            console.log(e);
        }
    }
}
exports.WebSocketRouter = WebSocketRouter;
//# sourceMappingURL=ws-router.js.map