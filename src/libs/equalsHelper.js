import {
	ifCurrentIsNumber,
	ifStackHasEquals,
	roundToTwoDecimal,
} from './utils.js';

export const equalsHelper = (current, stack) => {
	if (
		ifCurrentIsNumber(current) &&
		!ifStackHasEquals(stack) &&
		stack.length > 2
	) {
		let result = 0;
		for (let i = 1, term1, operator, term2; i < stack.length; i += 2) {
			term1 = i === 1 ? parseFloat(stack[0], 10) : result;
			operator = stack[i];
			term2 = parseFloat(stack[i + 1]);
			switch (operator) {
				case '+':
					result = term1 + term2;
					break;
				case '-':
					result = term1 - term2;
					break;
				case 'x':
					result = term1 * term2;
					break;
				default:
					result = term1 / term2;
			}
		}
		stack.push('=');
		current = roundToTwoDecimal(result);
		stack.push(`${current}`);
	}
	return { current, stack };
};
