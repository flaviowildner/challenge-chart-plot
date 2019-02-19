import React from 'react'
import InputEditor from './InputEditor/InputEditor';


class MainContent extends React.Component {
	constructor() {
		super();
		this.state = {
			editor: {
				value: 'Testando editor'
			},
			chart: {

			}
		}
	}

	render() {
		return (
			<div className='main_content'>
				<InputEditor value={this.state.editor.value} />
			</div>
		)
	}
}

export default MainContent