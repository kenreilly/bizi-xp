import * as http from 'node:http'
import * as crypto from 'node:crypto'
import { IncomingMessage, ServerResponse } from 'node:http'
import { Duplex } from "node:stream";
import { BiziaConfig } from './bizia-config'

export class WebSocketRouter {
	
	private ws_clients: { [id: string]: Duplex } = {}

	constructor() { }

	public on_upgrade(req: IncomingMessage, socket: Duplex, head: Buffer) {

		if (req.headers['upgrade'] != 'websocket') return

		let key: string = req.headers['sec-websocket-key']
		let hash: crypto.Hash = crypto.createHash('sha1')
		let accept: string = key + BiziaConfig.ws_rfc_guid
		let accept_hash: string = hash.update(accept, 'binary').digest('base64')

		let headers = [
			'HTTP/1.1 101 Switching Protocols',
			'Upgrade: websocket',
			'Connection: Upgrade',
			'Sec-WebSocket-Accept: ' + accept_hash
		]

		this.ws_clients[key] = socket
		socket.on('data', this.on_data.bind(this, key))
		socket.write(headers.concat('\r\n').join('\r\n'))
	}

	private on_data(id: string, data: Buffer) {

		try {
			let final: boolean = Boolean(data[0] >>> 7)
			let opcode: number = (data[0] & 0b00001111)
			let masked: boolean = Boolean(data[1] >>> 7)
			let lvalue: number = (data[1] & 0b01111111)
			let length: number = ((lvalue == 126) ? data.readUInt16LE(2) : lvalue)
			let big_length: bigint = ((lvalue == 127) ? data.readBigUint64LE(2) : null)
			let mask: Array<number> = []

			let offset: number = 2
			offset += (lvalue == 127) ? 8 : (offset == 126 ? 2 : 0)

			if (masked) {
				for (i = 0; i != 4; ++i) { mask[i] = data[offset + i] }
				offset += 4
			}

			let payload: Buffer = data.subarray(offset)
			let content: Buffer = Buffer.alloc(data.length - offset)

			for (var i = 0; i != payload.length; ++i) {
				content.writeUint8(payload[i] ^ mask[i % 4], i)
			}
			
			let x = content.toString()
			this.parse(content)
		}
		catch (e) { console.log(e) }
	}

	private parse(message: Buffer) {

		try {
			let obj = JSON.parse(message.toString())

		}
		catch(e) { console.log(e) }
	}
}