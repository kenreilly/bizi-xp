"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaticAppRouter = void 0;
const path = require("node:path");
const fs = require("node:fs");
const static_app_file_1 = require("./static-app-file");
class StaticAppRouter {
    content = {};
    load(static_root, dir, i) {
        try {
            if (!i.isFile())
                return;
            let fp = path.join(static_root, dir, i.name);
            let url = path.join('/', dir, i.name);
            this.content[url] = new static_app_file_1.StaticAppFile(fp);
        }
        catch (e) {
            console.log(e);
        }
    }
    traverse(static_root, dir) {
        try {
            let p = path.join(static_root, dir);
            let items = fs.readdirSync(p, { withFileTypes: true, recursive: true });
            for (var i = 0; i != items.length; ++i) {
                this.load(static_root, dir, items[i]);
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    constructor(cfg) {
        let index = path.join(cfg.server_root, 'index.html');
        this.content['/'] = new static_app_file_1.StaticAppFile(index);
        this.traverse(cfg.server_root, cfg.base_app_url);
        this.traverse(cfg.server_root, cfg.src_url);
        this.traverse(cfg.server_root, cfg.css_url);
    }
    handle(req, res) {
        if (req.url in this.content) {
            try {
                let file = this.content[req.url];
                res.setHeader('Content-Type', file.type);
                res.end(file.data);
                console.log('file sent for ' + req.url);
                return;
            }
            catch (e) {
                console.log(e);
            }
        }
        res.statusCode = 404;
        res.end('not found');
    }
}
exports.StaticAppRouter = StaticAppRouter;
//# sourceMappingURL=static-app-router.js.map