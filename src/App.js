import React, { Component } from 'react';
import { Display, Button } from './components';
import { numberEntry, decimalHelper, operatorHelper } from './libs';

class App extends Component {
	state = {
		stack: ['0'],
		current: '0',
		warning: ''
	}

	_clickHandlerForNumber = (number) => {
		const current = this.state.current,
			stack = [...this.state.stack];
		const res = numberEntry(current, stack, number);
		this.setState({
			current: res.current,
			stack: res.stack
		});
	}
	
	_clickHandlerForOperator = (operator) => {
		const current = this.state.current,
			stack = [...this.state.stack];
		const res = operatorHelper(current, stack, operator);
		this.setState({
			current: res.current,
			stack: res.stack
		});
	}

	_clickHandlerForDecimal = () => {
		const current = this.state.current,
			stack = [...this.state.stack];
		const res = decimalHelper(current, stack);
		this.setState({
			current: res.current,
			stack: res.stack
		})
	}

	_clickHandlerForEquals = () => {
		const stack = [...this.state.stack];
		const current = this.state.current;
		if (isFinite(parseFloat(current, 10)) && stack.length > 2 && !stack.includes('=')) {
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
		let current;
		if (!stack.includes('=') && stack.length) {
			stack.pop();
			if ( stack.length ) {
				current = stack[stack.length - 1];
			} else {
				current = '0';
				stack.push(current);
			}
			this.setState({
				stack,
				current
			});
		}
	}

	_clickHandlerForAllClear = () => {
		this.setState({
			stack: ['0'],
			current: '0'
		})
	}

  render() {
    return (
      <div className="app">
				<div className={`warning ${this.state.warning}`}>
					Limit Reached
				</div>
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
