import { Component } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment'
import './options.scss'
import FaBars from 'react-icons/lib/fa/bars' 
import FaClose from 'react-icons/lib/fa/close' 

class Options extends Component {

	constructor(props) {
		super(props)

		this.state = {
			isAscending: true,
			success: true,
			failure: true,
			fromDate: null,
			toDate: null
		}

		this.cachedState = {}

		this.changeAscending = this.changeAscending.bind(this);
		this.changeSuccess = this.changeSuccess.bind(this);
		this.changeFailure = this.changeFailure.bind(this);
		this.applyFilters = this.applyFilters.bind(this);
		this.handleFromDate = this.handleFromDate.bind(this);
		this.handleToDate = this.handleToDate.bind(this);
		this.cacheState = this.cacheState.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		this.handleReset = this.handleReset.bind(this);

	}

	changeAscending(e) {
		const isAscending = e.currentTarget.value === 'true' ? true: false;
		this.setState({
			isAscending
		})
	}

	changeSuccess(e) {
		this.setState({
			success: e.currentTarget.checked
		})
	}

	changeFailure(e) {
		this.setState({
			failure: e.currentTarget.checked
		})
	}

	applyFilters() {
		_this.props.updateFilters(this.state)
	}
	
	handleFromDate(date) {
		this.setState({
			fromDate: date
		})
	}
	handleToDate(date) {
		this.setState({
			toDate: date
		})
	}

	cacheState(e) {
		this.cachedState = Object.assign({}, this.state);
		console.log('cachedState: ', this.cachedState);
	}
	
	handleCancel() {
		this.setState(this.cachedState);
		this.props.toggleMenu();
	}

	handleReset() {
		this.setState({
			isAscending: true,
			success: true,
			failure: true,
			fromDate: null,
			toDate: null
		})
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
					<FaBars className="bars-icon" onClick={(event) => { this.props.toggleMenu(); this.cacheState(); }} />}


				<div
					id="Options"
					className={(this.props.showMenu) ? 'opened' : 'closed'}>
					<div className="options-bg"></div>
					<h3>Options</h3>
					<div className="options-content">
						<div>
							<label className="radio-container">Ascending
								<input
									name="ascending"
									type="radio"
									id="Ascending"
									value="true"
									checked={isAscending === true}
									onChange={this.changeAscending}
									/>
								<span className="checkmark"></span>
							</label>
							<label className="radio-container">Descending
								<input
									name="ascending"
									value="false"
									type="radio"
									id="Descending"
									checked={isAscending === false}
									onChange={this.changeAscending}
									/>
								<span className="checkmark"></span>
							</label>
						</div>
						<div className="spacer"></div>
						<div>
							<input
								type="checkbox"
								id="Successes"
								checked={this.state.success}
								value={this.state.success}
								onChange={this.changeSuccess}/>
							<label htmlFor="Successes">Success</label>
							<br/>
							<input
								type="checkbox"
								id="Failures"
								checked={this.state.failure}
								defaultChecked={this.state.failure}
								onChange={this.changeFailure}/>
							<label htmlFor="Failures">Failure</label>
						</div>
						<div className="spacer"></div>
						<div>
							<DatePicker
								placeholderText="From Date"
								selected={this.state.fromDate}
								onChange={this.handleFromDate}/>
							<DatePicker 
								placeholderText="To Date"
								selected={this.state.toDate}
								onChange={this.handleToDate}/>
						</div>
						<div className="spacer"></div>
						<div>
							<button id="Cancel" onClick={this.handleCancel}>Cancel</button>
							<button
								id="Apply"
								onClick={ () => this.props.updateFilters(this.state) }>Apply</button>
						</div>
						<div id="Reset-Container">
							<button id="Reset" onClick={this.handleReset}>reset</button>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Options