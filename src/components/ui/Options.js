import { Component } from 'react'
import './options.scss'
import FaBars from 'react-icons/lib/fa/bars' 
import FaClose from 'react-icons/lib/fa/close' 

class Options extends Component {
	constructor(props) {
		super(props)

		this.state = {
			showMenu: true
		}
		this.toggleMenu = this.toggleMenu.bind(this);
	}

	toggleMenu() {
		console.log('toggling menu')
		this.setState({
			showMenu: !this.state.showMenu
		})
	}
	render() {
		return (
			<div id="Options-Container">

				{(this.state.showMenu) ?
					<FaClose className="close-icon" onClick={this.toggleMenu}/> :
					<FaBars className="bars-icon" onClick={this.toggleMenu} />}


				<div
					id="Options"
					className={(this.state.showMenu) ? 'opened' : 'closed'}>
					<h3>Options</h3>
					<div className="options-content">
						<div>
							<input type="radio" id="Ascending"/>
							<label htmlFor="Ascending">Ascending</label>
							<br/>
							<input type="radio" id="Descending"/>
							<label htmlFor="Descending">Descending</label>
						</div>
						<div className="spacer"></div>
						<div>
							<input type="checkbox" id="Successes"/>
							<label htmlFor="Successes">Success</label>
							<br/>
							<input type="checkbox" id="Failures"/>
							<label htmlFor="Failures">Failure</label>
						</div>
						<div className="spacer"></div>
						<div>
							<label htmlFor="FromDate">From</label>
							<input type="date" id="FromDate"/>
							<br/>
							<label htmlFor="ToDate">To</label>
							<input type="date" id="ToDate"/>
						</div>
						<div className="spacer"></div>
						<div>
							<button id="Cancel">Cancel</button>
							<button id="Apply">Apply</button>
						</div>
						<div id="Reset-Container">
							<button id="Reset">reset</button>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Options