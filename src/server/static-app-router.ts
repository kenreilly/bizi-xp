import * as path from 'node:path'
import * as fs from 'node:fs'
import { Dirent } from 'node:fs'
import { BiziaConfig } from './bizia-config'
import { StaticAppFile } from "./static-app-file"
import { IncomingMessage, ServerResponse } from 'node:http'

export class StaticAppRouter {

	private content: { [url: string]: StaticAppFile } = {}

	private load(static_root: string, dir: string, i: Dirent) {

		try {
			if (!i.isFile()) return
			let fp: string = path.join(static_root, dir, i.name)
			let url = path.join('/', dir, i.name)
			this.content[url] = new StaticAppFile(fp)
		}
		catch (e) { console.log(e) }
	}

	private traverse(static_root: string, dir: string) {

		try {
			let p: string = path.join(static_root, dir)
			let items: Array<Dirent> = fs.readdirSync(p, { withFileTypes: true, recursive: true })
			for (var i = 0; i != items.length; ++i) { this.load(static_root, dir, items[i]) }
		}
		catch (e) { console.log(e) }
	}

	constructor(cfg: BiziaConfig) {

		let index = path.join(cfg.server_root, 'index.html')
		this.content['/'] = new StaticAppFile(index)

		this.traverse(cfg.server_root, cfg.base_app_url)
		this.traverse(cfg.server_root, cfg.src_url)
		this.traverse(cfg.server_root, cfg.css_url)
	}

	public handle(req: IncomingMessage, res: ServerResponse) {

		if (req.url in this.content) {

			try {
				let file = this.content[req.url]
				res.setHeader('Content-Type', file.type)
				res.end(file.data)

				console.log('file sent for ' + req.url)
				return
			}
			catch (e) { console.log(e) }
		}

		res.statusCode = 404
		res.end('not found')
	}
}
