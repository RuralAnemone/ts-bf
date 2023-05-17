import { minify } from 'terser'

async function compile(source: string): Promise<string> {
	let out: string | undefined = "let memory = new Uint32Array(30000).fill(0);\nlet memoryPointer = 0;";
	let commands = source.split('\n');

	for (const command of commands) {
		if (command === "+") {
			out += "\nmemory[memoryPointer]++;";
		} else if (command === "-") {
			out += "\nmemory[memoryPointer]--;";
		} else if (command === ">") {
			out += "\nmemoryPointer++;";
		} else if (command === "<") {
			out += "\nmemoryPointer--;";
		} else if (command === ".") {
			out += "return String.fromCharCode(memory[memoryPointer]);";
		} else if (command === ",") {
			out += "\nmemory[memoryPointer] = prompt('Input: ').charCodeAt(0);";
		} else if (command === "[") {
			out += "\nwhile (memory[memoryPointer] != 0) {";
		} else if (command === "]") {
			out += "\n}";
		} else {
			// it's a comment; ignore
		}
	}

	// out = (await minify(out)).code;
	// if (typeof out === 'undefined') throw new Error('Failed to minify code');

	return out;
}

export { compile };