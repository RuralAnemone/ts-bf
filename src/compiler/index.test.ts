import 'jest'
import { compile } from './index'

const boilerplate = "let memory = new Uint32Array(30000).fill(0);\nlet memoryPointer = 0;"

describe('single character', () => {
	test('+', () => {
		expect(compile('+')).resolves.toBe(boilerplate + '\nmemory[memoryPointer]++;');
	});
	test('-', () => {
		expect(compile('-')).resolves.toBe(boilerplate + '\nmemory[memoryPointer]--;');
	});
	test('>', () => {
		expect(compile('>')).resolves.toBe(boilerplate + '\nmemoryPointer++;');
	});
	test('<', () => {
		expect(compile('<')).resolves.toBe(boilerplate + '\nmemoryPointer--;');
	});
	test('.', () => {
		expect(compile('.')).resolves.toBe(boilerplate + 'return String.fromCharCode(memory[memoryPointer]);');
	});
	test(',', () => {
		expect(compile(',')).resolves.toBe(boilerplate + '\nmemory[memoryPointer] = prompt(\'Input: \').charCodeAt(0);');
	});
	test('[', () => {
		expect(compile('[')).resolves.toBe(boilerplate + '\nwhile (memory[memoryPointer] != 0) {');
	});
	test(']', () => {
		expect(compile(']')).resolves.toBe(boilerplate + '\n}');
	});
});