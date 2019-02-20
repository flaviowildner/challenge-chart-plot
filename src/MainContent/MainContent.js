import React from 'react'
import InputEditor from './InputEditor/InputEditor';
import Chart from './Chart/Chart'


class MainContent extends React.Component {
	constructor() {
		super();
		this.state = {
			inputEditor: {
				value: 'Testando editor'
			},
			chart: {

			}
		}
		this.inputEditorOnChange = this.inputEditorOnChange.bind(this);
	}

	inputEditorOnChange(newValue) {
		this.setState({
			inputEditor: {
				value: newValue
			}
		});
	}

	render() {
		return (
			<div className='main_content'>
				<InputEditor onChange={this.inputEditorOnChange} value={this.state.inputEditor.value} />
				<Chart />
			</div>
		)
	}
}

export default MainContent