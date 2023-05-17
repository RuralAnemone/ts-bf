// import { minify } from 'terser'
const script = document.createElement('script')
script.setAttribute('src', 'https://cdn.jsdelivr.net/npm/terser/dist/bundle.min.js');
document.body.appendChild(script);

async function compileBF(source) {
	let out = "let memory = new Uint32Array(30000).fill(0);\nlet memoryPointer = 0;";
	let commands = source.split('');

	for (const command of commands) {
		out += '\n';
		switch (command) {
			case '+':
				out += 'memory[memoryPointer]++;';
				break;
			case '-':
				out += 'memory[memoryPointer]--;';
				break;
			case '>':
				out += 'memoryPointer++;';
				break;
			case '<':
				out += 'memoryPointer--;';
				break;
			case '.':
				out += 'console.log(String.fromCharCode(memory[memoryPointer]));';
				break;
			case ',':
				out += 'memory[memoryPointer] = prompt("Input:").charCodeAt(0);';
				break;
			case '[':
				out += 'while (memory[memoryPointer] !== 0) {';
				break;
			case ']':
				out += '}';
				break;
		}
	}

	return (await minify(out)).code;
}