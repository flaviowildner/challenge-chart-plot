import React from 'react'
import './style.css'

function Footer(props) {
	return (
		<div className='generate_chart_div'>
			<button className='generate_chart_btn' onClick={props.onClickGenerateChart} >
				GENERATE CHART
			</button>
		</div>
	)
}

export default Footer