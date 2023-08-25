import * as fs from 'node:fs'
import * as path from 'node:path';

enum RUNTIME_ENV { DEV, STAGE, PROD }
export class BiziaConfig {

	static runtime: RUNTIME_ENV = RUNTIME_ENV.DEV;

	static get is_prod(): boolean { return BiziaConfig.runtime == RUNTIME_ENV.PROD }
	get http_port(): number { return BiziaConfig.is_prod ? 8080 : 3000 }

	ssl_path: string;
	ssl_cert: Buffer;
	ssl_key: Buffer;

	constructor() {

		this.ssl_path = path.resolve('./ssl/')
		this.ssl_cert = fs.readFileSync(path.resolve(this.ssl_path + '/localhost-cert.pem'))
		this.ssl_key = fs.readFileSync(path.resolve(this.ssl_path + '/localhost-privkey.pem'))
	}
}
