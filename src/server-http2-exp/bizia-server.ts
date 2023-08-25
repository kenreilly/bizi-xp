import * as fs from 'node:fs'
import { createSecureServer, Http2SecureServer, Http2Stream, IncomingHttpHeaders } from 'node:http2'
import { BiziaConfig } from './bizia-config'
import { BiziaRouter } from './bizia-router'

enum RequestEvent {

	STREAM = 'stream',
	ERROR = 'error',
	PING = 'ping'
}

export abstract class BiziaServer {

	static server: Http2SecureServer

	static on_error = (error: any): any => console.log(error)

	static init(config: BiziaConfig) {
		
		let server = createSecureServer({ key: config.ssl_key, cert: config.ssl_cert })
		server.on(RequestEvent.ERROR, BiziaServer.on_error)		
		server.on(RequestEvent.STREAM, BiziaRouter.on_stream)
		
		BiziaServer.server = server
		BiziaServer.server.listen(config.http_port)

	}
}