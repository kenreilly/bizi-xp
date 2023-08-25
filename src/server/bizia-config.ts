import * as path from 'node:path'
import * as fs from 'node:fs'

export class BiziaConfig {

	public static readonly ws_rfc_guid: string = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11'

	public readonly server_root = process.cwd()
	public readonly css_url = 'css/'
	public readonly src_url = 'src/client-web/'
	public readonly base_app_url = 'dist/client-web/'

	get ssl() { return { key: this.ssl_key, cert: this.ssl_cert } }

	ssl_path: string
	ssl_cert: Buffer
	ssl_key: Buffer

	constructor() {

		this.ssl_path = path.resolve('./ssl/')
		this.ssl_cert = fs.readFileSync(path.resolve(this.ssl_path + '/localhost-cert.pem'))
		this.ssl_key = fs.readFileSync(path.resolve(this.ssl_path + '/localhost-privkey.pem'))
	}
}
