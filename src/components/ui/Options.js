import { Component } from 'react'
import './options.scss'

class Options extends Component {
	render() {
		return (
			<div id="Options">
				<h3>Options</h3>
				<div>
					<input type="radio" id="Ascending"/>
					<label htmlFor="Ascending">Ascending</label>
					<br/>
					<input type="radio" id="Descending"/>
					<label htmlFor="Descending">Descending</label>
				</div>
				<hr />
				<div>
					<input type="checkbox" id="Successes"/>
					<label htmlFor="Successes">Success</label>
					<br/>
					<input type="checkbox" id="Failures"/>
					<label htmlFor="Failures">Failure</label>
				</div>
				<hr />
				<div>
					<label htmlFor="FromDate">From</label>
					<input type="date" id="FromDate"/>
					<br/>
					<label htmlFor="ToDate">To</label>
					<input type="date" id="ToDate"/>
				</div>
				<hr />
				<div>
					<button>Cancel</button>
					<button>Save</button>
				</div>
			</div>
		)
	}
}

export default Options