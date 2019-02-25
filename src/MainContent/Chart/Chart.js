import React from 'react'
import ReactChartkick, { LineChart } from 'react-chartkick'
import { Chart as ChartLib } from 'chart.js'
import './style.css'

ReactChartkick.addAdapter(ChartLib);

class Chart extends React.Component {
	render() {
		return (
			<div className='chart'>
				<LineChart
					data={this.props.data}
					curve={false}
					legend='right'
					messages={{ empty: "No data" }}
					height={this.props.height}
					onChange={this.props.onChange}
				/>
			</div>
		)
	}
}

export default Chart