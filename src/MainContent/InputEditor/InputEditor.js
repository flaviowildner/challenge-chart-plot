import React from 'react'
import AceEditor from 'react-ace'
import 'brace/theme/monokai'
import 'brace/mode/java'

class InputEditor extends React.Component {
	render() {
		return (
			<div className='input_editor'>
				<AceEditor
					mode="java"
					theme="monokai"
					width="100%"
					height='300px'
					value={this.props.value}
					showPrintMargin = {false}
				/>
			</div>
		)
	}
}

export default InputEditor