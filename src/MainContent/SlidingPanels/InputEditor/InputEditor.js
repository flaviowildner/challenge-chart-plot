import React from 'react'
import MonacoEditor from 'react-monaco-editor';
import './style.css'

class InputEditor extends React.Component {
	render() {
		return (
			<div className='input_editor'>
				<MonacoEditor
					width="100%"
					height={this.props.height}
					language="javascript"
					font
					theme="vs-dark"
					value={this.props.value}
					onChange={this.props.onChange}
				/>
				<div className='resize_div'>
					<div className='resize_line' />
					<div className='resize_button' onMouseDown={this.props.onMouseDown} />
				</div>
			</div>
		)
	}
}

export default InputEditor