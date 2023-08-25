"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BiziaRouter = void 0;
class BiziaHeader {
    authority;
    method;
    path;
    scheme;
    constructor(h) {
        for (var i in this) {
            ((x) => this[x] = h[':' + x]).bind(this)(i);
        }
    }
}
class BiziaRouter {
    static on_stream = (stream, headers) => BiziaRouter.process_stream(stream, new BiziaHeader(headers));
    static process_stream = (stream, h) => {
        debugger;
    };
}
exports.BiziaRouter = BiziaRouter;
//# sourceMappingURL=bizia-router.js.map