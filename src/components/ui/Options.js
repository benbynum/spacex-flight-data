import { Component } from 'react'
import './options.scss'
import FaBars from 'react-icons/lib/fa/bars' 
import FaClose from 'react-icons/lib/fa/close' 

class Options extends Component {

	onOrderChange() {
		console.log('Ascending change')
		this.setState({
			ascending: !this.state.ascending
		})
	}

	onApply() {
		console.log('Applying')
	}

	render() {
		return (
			<div id="Options-Container">


				{(this.props.showMenu) ?
					<FaClose className="close-icon" onClick={this.props.toggleMenu}/> :
					<FaBars className="bars-icon" onClick={this.props.toggleMenu} />}


				<div
					id="Options"
					className={(this.props.showMenu) ? 'opened' : 'closed'}>
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
								checked={this.props.filters.ascending}
								/>
							<label htmlFor="Ascending">Ascending</label>
							<br/>
							<input
								name="ascending"
								value="false"
								type="radio"
								id="Descending"
								ref="Descending"
								
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
							<button id="Apply" onClick={() => onApply()}>Apply</button>
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