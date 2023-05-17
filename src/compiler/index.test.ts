import 'jest'
import { compile } from './index'

const boilerplate = "let memory = new Uint32Array(30000).fill(0);\nlet memoryPointer = 0;"

describe('basic test', () => {
	test('+', () => {
		expect(compile('+')).resolves.toBe(boilerplate + 'memory[memoryPointer]++;');
	})
})