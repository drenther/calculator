import React from 'react';

export const Button = (props) => {
	let classes = props.special ? `button special` : 'button';
	let val = props.for;
	return (
		<button className={classes} onClick={props.clickHandler.bind(null, val)}>
			{val}
		</button>
	);
};