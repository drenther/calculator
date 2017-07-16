import { ifCurrentIsOperator, ifStackHasEquals } from './utils.js';

export const operatorHelper = (current, stack, operator) => {
	if ( !ifStackHasEquals(stack) ) {
		if ( ifCurrentIsOperator(current) ) stack.pop();
		current = operator;
		stack.push(current);
	}
	return { current, stack };
};