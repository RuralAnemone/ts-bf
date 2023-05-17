import 'jest'
import { compile } from './index'

describe('basic test', () => {
	test('+', () => {
		expect(compile('+')).resolves.toBe('memory[memoryPointer]++;');
	})
})