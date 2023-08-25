// import * as fs from 'node:fs'
// import * as path from 'node:path'
// import * as http2 from 'node:http2'
// import { BiziaConfig } from '../server/bizia-config'
// import { BiziaServer } from '../server/bizia-server'
// class ServerInitTest {
// 	static run() {
// 		BiziaServer.init(new BiziaConfig())
// 		let data = ''
// 		let ca: Buffer = fs.readFileSync(path.resolve('./ssl/localhost-cert.pem'))
// 		let session = http2.connect('https://localhost:3000/', { ca: ca } )
// 		session.on('error', (err) => console.error(err))
// 		let req = session.request({ ':path': '/' })
// 		req.setEncoding('utf8');
// 		req.on('response', (headers) => {
// 		})
// 		req.on('data', (x) => (data += x))
// 		req.on('end', () => {
// 			console.log(data)
// 			session.close()
// 		})
// 	}
// }
// ServerInitTest.run()
//# sourceMappingURL=server-init.js.map