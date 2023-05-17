class Interpreter {
	private array: number[];
	private memoryPointer: number;
	private commandPointer: number;
	private commands: string[] = [];

	constructor(size: number = 30000) {
		this.array = new Array(size).fill(0);
		this.memoryPointer = 0;
		this.commandPointer = 0;
	}

	public get memory() {
		return this.array;
	}

	public interpret(code: string): void {
		this.commands = code.split("");

		// check for incorrect bracketing
		let depth = 0;
		for (const command of this.commands) {
			if (command === "[") {
				depth++;
			} else if (command === "]") {
				depth--;
			}
		}
		if (depth !== 0) {
			throw new Error("Incorrect bracketing");
		}


		while (this.commandPointer < this.commands.length) {
			this.interpretCommand(this.commands[this.commandPointer]);
		}
	}

	private interpretCommand(command: string): void {
		if (command === "+") {
			this.array[this.memoryPointer]++;
		} else if (command === "-") {
			this.array[this.memoryPointer]--;
		} else if (command === ">") {
			this.memoryPointer++;
		} else if (command === "<") {
			this.memoryPointer--;
		} else if (command === ".") {
			process.stdout.write(String.fromCharCode(this.array[this.memoryPointer]));
		} else if (command === ",") {
			// might work idk
			this.array[this.memoryPointer] = process.stdin.read();
		} else if (command === "[") {
			let depth = 1;
			while (depth > 0 && this.array[this.memoryPointer] !== 0 && this.commandPointer < this.commands.length) {
				this.interpret(this.commands[this.commandPointer]);
				if (this.commands[this.commandPointer] === "[") {
					depth++;
				} else if (this.commands[this.commandPointer] === "]") {
					depth--;
				}
			}
		} else if (command === "]") {
			throw new Error ("fuck you");
		} else {
			throw new Error(`Unknown command ${command}`);
		}
	}
}

export { Interpreter };
