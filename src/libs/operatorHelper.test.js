import { operatorHelper } from './operatorHelper';

test('add operator after number', () => {
	const res1 = operatorHelper('91', ['91'], '+');
	expect(res1).toEqual({current: '+', stack: ['91', '+']});
});

test('replace operator if current is an operator', () => {
	const res = operatorHelper('+', ['10', '+'], '-');
	expect(res).toEqual({current: '-', stack: ['10', '-']});
});

test('add operator only if stack does not have =', () => {
	const res = operatorHelper('0', ['1', '-', '1', '=', '0'], '/');
	expect(res).toEqual({current: '0', stack: ['1', '-', '1', '=', '0']});
});