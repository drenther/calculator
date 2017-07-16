import React, { Component } from 'react';
import { Display, Button } from './components';
import { numberEntry, decimalHelper, operatorHelper, equalsHelper, ifLimitReached } from './libs';

class App extends Component {
	state = {
		stack: ['0'],
		current: '0',
		warning: ''
	}

	_clickHandlerForNumber = (number) => {
		const current = this.state.current,
			stack = [...this.state.stack];
		let warning = '';
		const res = numberEntry(current, stack, number);
		if ( ifLimitReached(res.current) ) {
			res.current = '0';
			res.stack = ['0'];
			warning = 'show';
		}
		this.setState({
			current: res.current,
			stack: res.stack,
			warning
		});
	}
	
	_clickHandlerForOperator = (operator) => {
		const current = this.state.current,
			stack = [...this.state.stack];
		const res = operatorHelper(current, stack, operator);
		this.setState({
			current: res.current,
			stack: res.stack,
			warning: ''
		});
	}

	_clickHandlerForDecimal = () => {
		const current = this.state.current,
			stack = [...this.state.stack];
		const res = decimalHelper(current, stack);
		this.setState({
			current: res.current,
			stack: res.stack,
			warning: ''
		})
	}

	_clickHandlerForEquals = () => {
		const stack = [...this.state.stack], 
			current = this.state.current;
		let warning = '';
		const res = equalsHelper(current, stack);
		if ( ifLimitReached(res.current) ) {
			res.current = '0';
			res.stack = ['0'];
			warning = 'show';
		}
		this.setState({
			current: res.current,
			stack: res.stack,
			warning
		});
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
				current,
				warning: ''
			});
		}
	}

	_clickHandlerForAllClear = () => {
		this.setState({
			stack: ['0'],
			current: '0',
			warning: ''
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
