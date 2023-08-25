import * as http2 from 'node:http2'
import { Http2Stream, IncomingHttpHeaders } from 'node:http2'
import { isNumberObject } from 'node:util/types'

class BiziaHeader {
	
	authority: string
	method: string
	path: string
	scheme: string
	
	constructor(h: IncomingHttpHeaders) {		
		for (var i in this) { ((x) => this[x] = h[':' + x]).bind(this)(i)}
	}
}

export abstract class BiziaRouter {

	static on_stream = (stream: Http2Stream, headers: IncomingHttpHeaders): any => 
		BiziaRouter.process_stream(stream, new BiziaHeader(headers))

	static process_stream = (stream: Http2Stream, h: BiziaHeader) => {
		
		debugger
	}
}