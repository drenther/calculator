import { decimalHelper } from './decimalHelper';

test("add 0. if current is zero", () => {
	const res = decimalHelper('0', ['0']);
	expect(res).toEqual({current: '0.', stack: ['0.']});
});

test("add 0. if current is operator", () => {
	const res = decimalHelper('+', ['1', '+']);
	expect(res).toEqual({current: '0.', stack: ['1', '+', '0.']})
});

test("add 0. if stack includes =", () => {
	const res = decimalHelper('15', ['10', '+', '5', '=', '15']);
	expect(res).toEqual({current: '0.', stack: ['0.']});
});

test("append decimal if current is integer", () => {
	const res = decimalHelper('67', ['67']);
	expect(res).toEqual({current: '67.', stack: ['67.']});
});

test("do not change if current has decimal", () => {
	const res1 = decimalHelper('9.1', ['9.1']);
	const res2 = decimalHelper('0.', ['1', '+', '0.']);
	const res3 = decimalHelper('1.0', ['1.0']);
	expect(res1).toEqual({current: '9.1', stack: ['9.1']});
	expect(res2).toEqual({current: '0.', stack: ['1', '+', '0.']});
	expect(res3).toEqual({current: '1.0', stack: ['1.0']});
});