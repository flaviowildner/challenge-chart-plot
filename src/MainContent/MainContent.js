import React from 'react'
import InputEditor from './InputEditor/InputEditor';
import Chart from './Chart/Chart'
import './style.css'


class MainContent extends React.Component {
	render() {
		return (
			<div className='main_content'>
				<InputEditor onChange={this.props.onChangeInputEditor} value={this.props.inputEditorValue} />
				<Chart data={this.props.chartData} />
			</div>
		)
	}
}

export default MainContent