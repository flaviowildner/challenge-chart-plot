import React from "react"
import './style.css'

function Header() {
	const name = 'Flávio'
	return (
		<header>
			<h1 className='header-text'>{name}'s Challenge</h1>
		</header>
	)
}

export default Header