import React from 'react'
import './style.css'

function Footer(props) {
	return (
		<footer>
			<button className='generate_chart_btn' onClick={props.onClickGenerateChart} >
				GENERATE CHART
			</button>
		</footer>
	)
}

export default Footer