import React, { Component } from 'react';
import './App.css';

import Header from './Header/Header'
import Footer from './Footer/Footer'
import MainContent from './MainContent/MainContent';

class App extends Component {
	onClickGenerateChart() {

	}

	render() {
		return (
			<div>
				<Header />
				<MainContent />
				<Footer onClickGenerateChart={this.onClickGenerateChart} />
			</div>
		);
	}
}

export default App;