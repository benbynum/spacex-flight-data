import { Component } from 'react'
import './options.scss'
import FaBars from 'react-icons/lib/fa/bars' 
import FaClose from 'react-icons/lib/fa/close' 

class Options extends Component {

	constructor(props) {
		super(props)

		this.state = {
			isAscending: true
		}

		this.changeAscending = this.changeAscending.bind(this);
		this.applyFilters = this.applyFilters.bind(this);

	}

	changeAscending(e) {
		const isAscending = e.currentTarget.value === 'true' ? true: false;
		console.log(isAscending)
		this.setState({
			isAscending
		})
	}

	applyFilters() {
		_this.props.updateFilters(this.state)
	}
	
	render() {

		let _this = this;
		const { isAscending } = this.state;

		const handleApply = function(btn) {
			console.log('handleApply')
			_this.props.updateFilters();
			_this.props.toggleMenu();
		}

		const handleCancel = function() {
			console.log('Cancelling')
		}

		const handleReset = function() {
			console.log('Resetting')
		}

		

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
								checked={isAscending === true}
								onChange={this.changeAscending}
								/>
							<label htmlFor="Ascending">Ascending</label>
							<br/>
							<input
								name="ascending"
								value="false"
								type="radio"
								id="Descending"
								checked={isAscending === false}
								onChange={this.changeAscending}
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
							<button id="Cancel" onClick={() => handleButtonClick('Cancel')}>Cancel</button>
							<button
								id="Apply"
								onClick={ () => this.props.updateFilters(this.state) }>Apply</button>
						</div>
						<div id="Reset-Container">
							<button id="Reset" onClick={() => handleButtonClick('Reset')}>reset</button>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Options