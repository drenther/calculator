import React, { Component } from 'react';
import { Display, Button } from './components';

class App extends Component {
	state = {
		stack: [],
		current: '0'
	}

	_clickHandlerForNumber = (number) => {
		const stack = [...this.state.stack];
		let current = this.state.current;
		if (stack.includes('=')) {
			this.setState({
				stack: [`${number}`],
				current: `${number}`
			});
		} else {
			const curr = parseFloat(current, 10);
			if (isFinite(curr) && current !== '0') {
				stack.pop();
				current = `${this.state.current}${number}`;
			} else if (current.includes('.')) {
				stack.pop();
				current = `${this.state.current}${number}`;
			} else {
				current = `${number}`;
			}
			if (current.length > 8) {
				this.setState({
					stack: [],
					current: 'Limit'
				});
			}
			stack.push(current);
			this.setState({stack, current});
		}
	}
	
	_clickHandlerForOperator = (operator) => {
		const stack = [...this.state.stack];
		const current = this.state.current;
		if (stack.length && !stack.includes('=')) {
			if (isFinite(parseFloat(current, 10))) {
				stack.push(operator);
			} else {
				stack.pop();
				stack.push(operator);
			}
			this.setState({
				current: operator,
				stack
			});
		}
	}

	_clickHandlerForDecimal = () => {
		const stack = [...this.state.stack];
		let current = this.state.current;
		if (!current.includes('.')) {
			if (current === 0 || !isFinite(parseFloat(current, 10)) || stack.includes('=')) {
				current = `0.`;
			} else {
				stack.pop();
				current = `${current}.`
			}
			stack.push(current);
			this.setState({stack, current});
		}
	}

	_clickHandlerForEquals = () => {
		const stack = [...this.state.stack];
		const current = this.state.current;
		if (isFinite(parseFloat(current, 10))) {
			let result = 0;
			for (let i = 1, term1, operator, term2; i < stack.length; i+=2) {
				term1 = (i === 1) ? parseFloat(stack[0], 10) : result;
				operator = stack[i];
				term2 = parseFloat(stack[i+1]);
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

			if (result > 8) {
				this.setState({
					stack: [],
					current: 'Limit'
				});
			}
			stack.push('=', `${result}`);
			this.setState({
				stack,
				current: `${result}`
			});
		}
	}

	_clickHandlerForClearEntry = () => {
		const stack = [...this.state.stack];
		if (!stack.includes('=')) {
			stack.pop();
			this.setState({
				stack,
				current: stack[stack.length - 1]
			});
		}
	}

	_clickHandlerForAllClear = () => {
		this.setState({
			stack: [],
			current: '0'
		})
	}

  render() {
    return (
      <div className="app">
        <Display stack={this.state.stack} current={this.state.current}/>
				<div className="buttons">
					<div className="row one">
						<Button for="AC" special={true} clickHandler={this._clickHandlerForAllClear} />
						<Button for="CE" clickHandler={this._clickHandlerForClearEntry} />
						<Button for="/" clickHandler={this._clickHandlerForOperator} />
					</div>
					<div className="row two">
						<Button for="7" clickHandler={this._clickHandlerForNumber} />
						<Button for="8" clickHandler={this._clickHandlerForNumber} />
						<Button for="9" clickHandler={this._clickHandlerForNumber} />
						<Button for="x" clickHandler={this._clickHandlerForOperator}/>
					</div>
					<div className="row three">
						<Button for="4" clickHandler={this._clickHandlerForNumber} />	
						<Button for="5" clickHandler={this._clickHandlerForNumber} />
						<Button for="6" clickHandler={this._clickHandlerForNumber} />
						<Button for="-" clickHandler={this._clickHandlerForOperator} />
					</div>
					<div className="row four">
						<Button for="1" clickHandler={this._clickHandlerForNumber} />
						<Button for="2" clickHandler={this._clickHandlerForNumber} />
						<Button for="3" clickHandler={this._clickHandlerForNumber} />
						<Button for="+" clickHandler={this._clickHandlerForOperator} />
					</div>
					<div className="row five">
						<Button for="0" clickHandler={this._clickHandlerForNumber} />
						<Button for="." clickHandler={this._clickHandlerForDecimal}/>
						<Button for="=" special={true} clickHandler={this._clickHandlerForEquals} />
					</div>
				</div>
				
      </div>
    );
  }
}

export default App;
