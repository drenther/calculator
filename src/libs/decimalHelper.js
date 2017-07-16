import { ifStackHasEquals, 
	ifCurrentHasDecimal, 
	ifCurrentIsEmptyOrZero, 
	ifCurrentIsOperator, 
	ifCurrentIsInteger } from './utils.js';

export const decimalHelper = (current, stack) => {
	if ( ifStackHasEquals(stack) ) {
		stack.length = 0;
		current = '0';
		stack.push(current);
	}
	if ( ifCurrentIsEmptyOrZero(current) || ifCurrentIsOperator(current) ) {
		if (ifCurrentIsEmptyOrZero(current)) stack.pop();
		current = `0.`;
		stack.push(current);
	} else if ( ifCurrentIsInteger(current) && !ifCurrentHasDecimal(current) ) {
		stack.pop();
		current = `${current}.`;
		stack.push(current);
	}
	return { current, stack };
};