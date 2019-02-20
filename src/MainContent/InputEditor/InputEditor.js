import React from 'react'
import AceEditor from 'react-ace'
import 'brace/theme/monokai'
import 'brace/mode/java'
import './style.css'

class InputEditor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editorHeight: 300,
			resizing: false,
			pivot: {
				mousePosY: 0,
				editorHeight: 0
			}
		}
		this.onMouseDown = this.onMouseDown.bind(this);
		this.onMouseUp = this.onMouseUp.bind(this);
		this.onMouseMove = this.onMouseMove.bind(this);
	}

	onMouseDown(ev) {
		const currentMousePositionY = ev.clientY;
		this.setState((prevState, props) => {
			return {
				resizing: true,
				pivot: {
					mousePositionY: currentMousePositionY,
					editorHeight: prevState.editorHeight
				},
			}
		});
	}

	onMouseUp() {
		this.setState({
			resizing: false
		})
	}

	onMouseMove(ev) {
		const currentMousePositionY = ev.clientY;
		if (this.state.resizing === true) {
			this.setState((prevState, props) => {
				let newHeight = this.state.pivot.editorHeight + (currentMousePositionY - prevState.pivot.mousePositionY)
				if (newHeight < 0) newHeight = 0;
				if(newHeight > 500) newHeight = 500;
				return {
					editorHeight: newHeight,
				}
			});
		}
	}

	componentDidMount() {
		window.addEventListener('mousemove', this.onMouseMove);
		window.addEventListener('mouseup', this.onMouseUp);
	}

	componentWillUnmount() {
		window.removeEventListener('mouseup', this.onMouseUp);
		window.removeEventListener('mousemove', this.onMouseMove);
	}

	render() {
		return (
			<div className='input_editor'>
				<AceEditor
					mode="java"
					theme="monokai"
					name="custom_ace_editor"
					width="100%"
					height={this.state.editorHeight + 'px'}
					value={this.props.value}
					onChange={this.props.onChange}
					showPrintMargin={false}
					editorProps={{ $blockScrolling: true }}
				/>
				<div className='resize_div'>
					<div className='resize_line' />
					<div className='resize_button' onMouseDown={this.onMouseDown} />
				</div>
			</div>
		)
	}
}

export default InputEditor