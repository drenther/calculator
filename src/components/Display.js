import React from 'react';

export const Display = (props) => {
	return (
		<div className="display">
			<div className="current">
				{props.current}
			</div>
			<div className="stack">
				{props.stack.join('')}			
			</div>
		</div>
	);
};