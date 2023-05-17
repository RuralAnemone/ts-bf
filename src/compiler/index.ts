import { minify } from 'terser'
import { readFileSync } from 'fs'

async function compile(source: string): Promise<string></string> {
	let out: string | undefined = readFileSync('./boilerplate.js', 'utf8');
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

	out = (await minify(out)).code;
	if (typeof out === 'undefined') throw new Error('Failed to minify code');

	return out;
}

export { compile };