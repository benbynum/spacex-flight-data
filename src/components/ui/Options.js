import { Component } from 'react'
import './options.scss'
import FaBars from 'react-icons/lib/fa/bars' 
import FaClose from 'react-icons/lib/fa/close' 

class Options extends Component {
	constructor(props) {
		super(props)

		this.state = {
			showMenu: true,
			ascending: true,
			success: true,
			failure: true,
			fromDate: null,
			toDate: null
		}
		this.toggleMenu = this.toggleMenu.bind(this);
		this.onOrderChange = this.onOrderChange.bind(this)
	}

	toggleMenu() {
		console.log('toggling menu')
		this.setState({
			showMenu: !this.state.showMenu
		})
	}

	onOrderChange() {
		console.log('Ascending change')
		this.setState({
			ascending: !this.state.ascending
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
					<div className="options-bg"></div>
					<h3>Options</h3>
					<div className="options-content">
						<div>
							<input
								name="ascending"
								type="radio"
								id="Ascending"
								value="true"
								ref="Ascending"
								checked={this.state.ascending}
								onChange={this.onOrderChange} />
							<label htmlFor="Ascending">Ascending</label>
							<br/>
							<input
								name="ascending"
								value="false"
								type="radio"
								id="Descending"
								ref="Descending"
								onChange={this.onOrderChange}
								/>
							<label htmlFor="Descending">Descending</label>
							<form></form>
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