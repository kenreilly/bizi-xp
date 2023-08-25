// import * as http from 'node:https'
import * as http from 'node:http'
import { IncomingMessage, ServerResponse } from 'node:http'
import { BiziaConfig } from './bizia-config'
import { StaticAppRouter } from './static-app-router'
import { WebSocketRouter } from './ws-router'

class BiziaServer {

	static readonly http_port: number = 2600
	static readonly ws_port: number = 2601
		
	private http_server: http.Server
	private ws_server: http.Server

	private app_router: StaticAppRouter
	private ws_router: WebSocketRouter
	
	constructor(config: BiziaConfig) {
	
		// this.server = http.createServer(cfg.ssl, this.on_request.bind(this))
		this.http_server = http.createServer(this.on_http.bind(this))
		this.ws_server = http.createServer()

		this.app_router = new StaticAppRouter(config)
		this.ws_router = new WebSocketRouter()
		this.ws_server.on('upgrade', this.ws_router.on_upgrade.bind(this.ws_router))
	}

	private on_http(req: IncomingMessage, res: ServerResponse): void {
		
		if (req.method == 'GET') { return this.app_router.handle(req, res) }		
		res.statusCode = 400
		res.end()
	}

	public run(): void {

		this.http_server.listen(BiziaServer.http_port)
		this.ws_server.listen(BiziaServer.ws_port)

		console.log('http running on port ' + BiziaServer.http_port)
		console.log('ws running on port ' + BiziaServer.ws_port)
	}
}

let server: BiziaServer = new BiziaServer(new BiziaConfig)
server.run()