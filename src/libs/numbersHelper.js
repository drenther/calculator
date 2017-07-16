import { ifCurrentHasDecimal, 
	ifStackHasEquals, 
	ifCurrentNeedsToBeAppended, 
	ifCurrentIsOperator, 
	ifCurrentIsEmptyOrZero } from './utils.js'; 

export const numberEntry = (current, stack, number) => {
	if ( ifStackHasEquals(stack) ) {
		stack.length = 0;
		current = '0';
		stack.push(current);
	}
	if ( ifCurrentIsEmptyOrZero(current) || ifCurrentIsOperator(current) ) {
		if (ifCurrentIsEmptyOrZero(current)) stack.pop();
		current = `${number}`;
		stack.push(current);
	} else if ( ifCurrentHasDecimal(current) || ifCurrentNeedsToBeAppended(current) ) {
		stack.pop();
		current = `${current}${number}`;
		stack.push(current);
	}
	return { current, stack };
};