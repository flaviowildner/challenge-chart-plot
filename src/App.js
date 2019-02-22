import React, { Component } from 'react';
import './App.css';

import Header from './Header/Header'
import Footer from './Footer/Footer'
import MainContent from './MainContent/MainContent';

function strToJson(str) {
	const x = eval("(" + str + ")");
	return JSON.stringify(x);
}

function generateChartState(inputEventsString) {
	let select, group, begin, end, data = [];
	try {
		const inputSplitted = inputEventsString.split('\n');
		const inputParsed = inputSplitted.map((el) => JSON.parse(strToJson(el)));
		for (let i = 0; i < inputParsed.length; i++) {
			const currEvent = inputParsed[i];
			const { type } = currEvent;

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
					begin = currEvent.begin;
					end = currEvent.end;
					break;
				case 'data':
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
					break;
				default:
					throw Error('Invalid event type - (\'' + type + '\').')
			}
		}

		const newChartState = Object.keys(data).map((p) => data[p]);
		return {
			range: {
				begin,
				end
			},
			data: newChartState
		}
	} catch (err) {
		alert(err.message);
		return {
			range: {
				begin: null,
				end: null
			},
			data: ""
		}
	}
}

class App extends Component {
	constructor() {
		super();
		this.state = {
			inputEditor: {
				value: `{type: 'start', timestamp: 0, select: ['min_response_time', 'max_response_time'], group: ['os', 'browser']}
{ type: 'data', timestamp: 0, os: 'linux', browser: 'chrome', min_response_time: 1, max_response_time: 2 }
{ type: 'data', timestamp: 0, os: 'win32', browser: 'chrome', min_response_time: 3, max_response_time: 6 }
{ type: 'data', timestamp: 1, os: 'linux', browser: 'chrome', min_response_time: 4, max_response_time: 7 }
{ type: 'data', timestamp: 1, os: 'win32', browser: 'chrome', min_response_time: 2, max_response_time: 5 }`
			},
			chart: {
				//SPAN
				range: {
					begin: null,
					end: null
				},
				//DATA
				data: []
			}
		}
		this.onClickGenerateChart = this.onClickGenerateChart.bind(this);
		this.onChangeInputEditor = this.onChangeInputEditor.bind(this);
	}

	onClickGenerateChart() {
		//Improve error verification
		try {
			let newChartState = generateChartState(this.state.inputEditor.value);
			this.setState({
				chart: newChartState
			})

		} catch (err) {
			console.log(err);
			this.setState({
				chart: {
					data: ""
				}
			});
		}
	}

	onChangeInputEditor(newValue) {
		this.setState({
			inputEditor: {
				value: newValue
			}
		});
	}

	render() {
		return (
			<div>
				<Header />
				<MainContent
					onChangeInputEditor={this.onChangeInputEditor}
					inputEditorValue={this.state.inputEditor.value}
					chartData={this.state.chart.data}
				/>
				<Footer onClickGenerateChart={this.onClickGenerateChart} />
			</div>
		);
	}
}

export default App;