abstract class View {
	
	public element: HTMLElement;
	constructor(el: HTMLElement) { this.element = el }
}

class Header extends View {

	constructor() {

		let el = document.createElement('div')
		el.classList.add('header')
		super(el)
	}
}

class Terminal extends View {

	constructor() {

		let el = document.createElement('div')
		el.classList.add('terminal')
		super(el)
	}
}

class Viewport extends View {

	constructor() {

		let el = document.createElement('div')
		el.classList.add('viewport')
		super(el)
	}
}

class MainView extends View {

	static on_kb_input = (kbi: KeyboardEvent) => {}

	h: Header
	t: Terminal
	v: Viewport

	constructor(el: HTMLElement) {
		
		super(el)
		
		this.h = new Header()
		this.v = new Viewport()
		this.t = new Terminal()
		
		this.element.append(this.h.element, this.v.element, this.t.element)
		this.element.onkeyup = MainView.on_kb_input.bind(this)
	}
}

class BiziaClient {

	static view: View
	static wsc: WebSocket

	static init() {

		let el = document.querySelector('body')
		BiziaClient.view = new MainView(el)

		// let host = location.hostname + ":2601"
		// BiziaClient.wsc = new WebSocket("location.")

		BiziaClient.wsc = new WebSocket('ws://' + window.location.hostname + ':2601')
		BiziaClient.wsc.onopen = (ev: Event) => {
			
			console.log(ev)
			BiziaClient.wsc.send(JSON.stringify({ asdf:1234 }))
			// BiziaClient.wsc.send("Hello")
		}

		BiziaClient.wsc.onerror = (ev: Event) => {

			console.log(ev)
		}
	}
}

BiziaClient.init()
window['BiziaClient'] = BiziaClient