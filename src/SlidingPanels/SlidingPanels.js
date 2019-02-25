import React from 'react'
import InputEditor from '../MainContent/InputEditor/InputEditor';
import Chart from '../MainContent/Chart/Chart'
import './styles.css'

const defaultChartHeight = 300;
const chartPaddingBottom = 20;

class SlidingPanels extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			totalHeight: null,
			editorHeight: null,
			chartHeight: defaultChartHeight,
			resizing: false,
			pivot: {
				mousePosY: 0,
				chartHeight: 0
			}
		}
		this.onMouseDown = this.onMouseDown.bind(this);
		this.onMouseUp = this.onMouseUp.bind(this);
		this.onMouseMove = this.onMouseMove.bind(this);
	}

	componentDidMount() {
		window.addEventListener('mousemove', this.onMouseMove);
		window.addEventListener('mouseup', this.onMouseUp);
		setTimeout(() => {
			const height = document.getElementsByClassName('sliding_panels')[0].clientHeight;
			this.setState({
				totalHeight: height,
				editorHeight: height - defaultChartHeight,
				chartHeight: defaultChartHeight
			});
		}, 100);
	}

	onMouseDown(ev) {
		const currentMousePositionY = ev.clientY;
		this.setState((prevState, props) => {
			return {
				resizing: true,
				pivot: {
					totalHeight: document.getElementsByClassName('sliding_panels')[0].clientHeight,
					mousePositionY: currentMousePositionY,
					chartHeight: prevState.chartHeight,
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
			this.setState((prevState) => {
				let variation = currentMousePositionY - prevState.pivot.mousePositionY
				return {
					chartHeight: prevState.pivot.chartHeight - variation,
					editorHeight: prevState.pivot.editorHeight + variation
				}
			});
		}
	}

	render() {
		return (
			<div className='sliding_panels' ref={(divElement) => this.divElement = divElement}>
				<InputEditor onChange={this.props.onChangeInputEditor} onMouseDown={this.onMouseDown} height={this.state.editorHeight} value={this.props.inputEditorValue} />
				<Chart data={this.props.chartData} height={this.state.chartHeight - chartPaddingBottom} />
			</div>
		)
	}
}

export default SlidingPanels