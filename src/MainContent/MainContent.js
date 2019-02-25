import React from 'react'
import SlidingPanels from '../SlidingPanels/SlidingPanels'
import GenerateChartButton from '../GenerateChartButton/GenerateChartButton'
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
	
	componentDidMount(){

		/*
		let ownElement = getComputedStyle(document.getElementsByClassName('main_content')[0]);
		const height = parseInt(ownElement['height']);
		const paddingTop = parseInt(ownElement['paddingTop']);
		const paddingBottom = parseInt(ownElement['paddingBottom']);
		this.setState({
			slidingPanelsHeight: height - paddingTop - paddingBottom
		})
		console.log(height)
		*/
		this.onClickGenerateChart();
	}

	strToJson(str) {
		try {
			var inputSplitted, inputParsed;
			inputSplitted = str.split('\n'); // Convert json input string to valid json
			inputSplitted = inputSplitted.filter(el => el.trim()); // Remove empty and only whitespaces lines
			inputParsed = inputSplitted.map((el) => JSON.parse(JSON.stringify(eval("(" + el + ")")))); // Parse JSON
			return inputParsed;
		} catch (err) {
			alert(err.message);
		}
	}

	generateChartState(inputEventsString) {
		let select, group, begin, end, data = [];
		try {
			let inputParsed, indexLastStart;
			inputParsed = this.strToJson(inputEventsString);
			inputParsed.sort((a, b) => { // Sort events based on timestamp. If the timestamp is equal, the priority is used to tie break.
				const priority = { "start": 1, "span": 2, "data": 3, "stop": 4 };
				if (a.timestamp < b.timestamp) return -1;
				if (a.timestamp > b.timestamp) return 1;
				if (priority[a.type] < priority[b.type]) return -1;
				if (priority[a.type] > priority[b.type]) return 1;
				return 0;
			});
			indexLastStart = inputParsed.length - inputParsed.slice().reverse().findIndex((el) => { //Find the last start type event
				return el.type === 'start'
			}) - 1;
			for (let i = indexLastStart; i < inputParsed.length; i++) {
				const currEvent = inputParsed[i];
				const { type, timestamp } = currEvent;

				switch (type) {
					case 'start':
						if (!currEvent.select) throw Error('Event of type start should have a set of select')
						if (!currEvent.group) throw Error('Event of type start should have a set of group')
						select = currEvent.select;
						group = currEvent.group;
						break;
					case 'span':
						if (!currEvent.begin < 0) throw Error('The begin value should be greater than 0')
						if (!currEvent.begin && currEvent.begin !== 0) throw Error('Event of type span should have a begin timestamp')
						if (!currEvent.end) throw Error('Event of type span should have a end timestamp')
						if (!currEvent.end && currEvent.end !== 0) throw Error('Event of type span should have a begin timestamp')
						begin = currEvent.begin;
						end = currEvent.end;
						break;
					case 'data':
						if (timestamp < begin || timestamp > end) break;
						select.forEach((currSelect) => {
							if (currEvent[currSelect]) {
								const groupName = group.reduce((r, c) => currEvent[r] + '_' + currEvent[c]);
								const lineName = groupName + '-' + currSelect;
								if (!data[lineName]) data[lineName] = { data: [] }
								data[lineName] = { name: lineName, data: { ...data[lineName].data, [currEvent.timestamp]: currEvent[currSelect] } };
							}
						});
						break;
					case 'stop':
						i = inputParsed.length;
						break;
					default:
						throw Error('Invalid event type - (\'' + type + '\').')
				}
			}

			const newChartState = Object.keys(data).map((p) => data[p]);
			return {
				data: newChartState
			}
		} catch (err) {
			alert(err.message);
			return {
				data: []
			}
		}
	}

	onClickGenerateChart() {
		//Improve error verification
		try {
			let newChartState = this.generateChartState(this.state.inputEditor.value);
			this.setState({
				chart: newChartState
			})
		} catch (err) {
			this.setState({
				chart: {
					data: ""
				}
			});
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