import { numberEntry } from './numbersHelper';

test("add number to current, push new current to stack", () => {
	const current = '0', stack = [], number = 1;
	const res = numberEntry(current, stack, number);
	expect(res).toEqual({current: '1', stack: ['1']});
	const res2 = numberEntry('', ['6.9', '+', ''], 8);
	expect(res2).toEqual({current: '8', stack: ['6.9', '+', '8']});
});

test("append new number to current, push new current to stack", () => {
	const res1 = numberEntry('1', ['1'], 2);
	expect(res1).toEqual({current: '12', stack: ['12']});
	const res2 = numberEntry('5', ['4', '+', '5'], 1);
	expect(res2).toEqual({current: '51', stack: ['4', '+', '51']});
});

test("append number after decimal, push new current to stack", () => {
	const res1 = numberEntry('0.', ['0.'], 5);
	expect(res1).toEqual({current: '0.5', stack: ['0.5']});
	const res2 = numberEntry('1.4', ['5', '+', '1.4'], 7);
	expect(res2).toEqual({current: '1.47', stack: ['5', '+', '1.47']});
	const res3 = numberEntry('0.54', ['5', '+', '0.54'], 2);
	expect(res3).toEqual({current: '0.542', stack: ['5', '+', '0.542']});
});

test("add new number after operator, push to stack", () => {
	const res1 = numberEntry('+', ['1', '+'], 7);
	expect(res1).toEqual({current: '7', stack: ['1', '+', '7']});
	const res2 = numberEntry('-', ['5', '-'], 9);
	expect(res2).toEqual({current: '9', stack: ['5', '-', '9']});
})

test("clear stack and add new number after equals", () => {
	const res1 = numberEntry('4', ['2', '+', '2', '=', '4'], 5);
	expect(res1).toEqual({current: '5', stack: ['5']});
	const res2 = numberEntry('-1', ['1', '-', '2', '=', '-1'], 0);
	expect(res2).toEqual({current: '0', stack: ['0']})
})