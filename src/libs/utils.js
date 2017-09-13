export const ifStackHasEquals = stack => stack.includes('=');

export const ifCurrentIsEmptyOrZero = current =>
	current === '' || current === '0';

export const ifCurrentIsOperator = current =>
	['+', '-', 'x', '/'].includes(current);

export const ifCurrentHasDecimal = current => current.includes('.');

export const ifCurrentNeedsToBeAppended = current =>
	current !== '0' && !isNaN(parseFloat(current, 10));

export const ifCurrentIsInteger = current => isFinite(parseInt(current, 10));

export const ifCurrentIsNumber = current => isFinite(parseFloat(current, 10));

export const roundToTwoDecimal = num => Math.round(num * 100) / 100;

export const ifLimitReached = current => current.length > 9;
