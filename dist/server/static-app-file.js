"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaticAppFile = exports.ContentType = void 0;
const fs = require("node:fs");
var ContentType;
(function (ContentType) {
    ContentType["html"] = "text/html";
    ContentType["css"] = "text/css";
    ContentType["js"] = "application/javascript";
    ContentType["ts"] = "application/typescript";
    ContentType["map"] = "application/octet-stream";
})(ContentType = exports.ContentType || (exports.ContentType = {}));
class StaticAppFile {
    type;
    data;
    constructor(fp) {
        let x = fp.substring(1 + fp.lastIndexOf('.'));
        this.data = fs.readFileSync(fp);
        this.type = ContentType[x];
    }
}
exports.StaticAppFile = StaticAppFile;
//# sourceMappingURL=static-app-file.js.map