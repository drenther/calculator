import React, { Component } from 'react';
import { Display, Button } from './components';

class App extends Component {
	state = {
		stack: []
	}

	_clickHandlerForNumber = (number) => {
		const stack = [...this.state.stack];
		const lastElement = stack[stack.length - 1];
		if (parseInt(lastElement, 10)) {
			stack.push(`${lastElement}${number}`);
			this.setState({stack});
		}
	}
	
  render() {
    return (
      <div className="app">
        <Display />
				<div className="buttons">
					<div className="left-top">
						<div className="row one">
							<Button for="1" />
						</div>
						<div className="row two">
						</div>
						<div className="row three">
						</div>
					</div>
					<div className="right">

					</div>
					<div className="bottom">

					</div>
				</div>
				
      </div>
    );
  }
}

export default App;
