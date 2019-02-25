import React from 'react'
import SlidingPanels from '../SlidingPanels/SlidingPanels'
import GenerateChartButton from '../GenerateChartButton/GenerateChartButton'
import { generateChartState } from '../Util/InputParser'
import './style.css'

import { initialValue } from '../Util/InitialInput'

class MainContent extends React.Component {
	constructor() {
		super();
		this.state = {
			slidingPanelsHeight: null,
			inputEditor: {
				value: initialValue,
			},
			chart: {
				data: []
			},
		}
		this.onClickGenerateChart = this.onClickGenerateChart.bind(this);
		this.onChangeInputEditor = this.onChangeInputEditor.bind(this);
	}

	componentDidMount() {
		this.onClickGenerateChart();
	}

	onClickGenerateChart() {
		//Improve error verification
		let newChartState = generateChartState(this.state.inputEditor.value);
		if (newChartState['errorMessage']) {
			alert(newChartState['errorMessage'])
			this.setState({
				chart: {
					data: []
				}
			});
		} else {
			this.setState({
				chart: newChartState
			})
		}
	}

	onChangeInputEditor(newValue, e) {
		this.setState({
			inputEditor: {
				value: newValue
			}
		});
	}

	render() {
		return (
			<div className='main_content'>
				<SlidingPanels
					onChangeInputEditor={this.onChangeInputEditor}
					inputEditorValue={this.state.inputEditor.value}
					chartData={this.state.chart.data}
				/>
				<GenerateChartButton onClickGenerateChart={this.onClickGenerateChart} />
			</div>
		)
	}
}

export default MainContent