import { Component } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment'
import './options.scss'
import FaBars from 'react-icons/lib/fa/bars' 
import FaClose from 'react-icons/lib/fa/close'
import FaCloseThin from 'react-icons/lib/md/close' 
import FaQuestionCircle from 'react-icons/lib/fa/question-circle' 

class Options extends Component {

	constructor(props) {
		super(props)

		this.state = {
			isAscending: true,
			success: true,
			failure: true,
			fromDate: null,
			toDate: null,
			about: false
		}
		
		this.style = {}
		this.style.showAbout = {
			opacity: 1
		}
		this.style.hideAbout = {
			opacity: 0,
			zIndex: -1
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
		this.toggleAbout = this.toggleAbout.bind(this);

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

	toggleAbout() {
		console.log('toggling about')
		this.setState({
			about: !this.state.about
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

				<div className="menu-icon" onClick={this.props.toggleMenu}>
					{(this.props.showMenu) ?
						<FaClose className="close-icon" onClick={this.props.toggleMenu}/> :
						<FaBars className="bars-icon" onClick={(event) => { this.props.toggleMenu(); this.cacheState(); }} />}
				</div>


				<div
					id="Options"
					className={(this.props.showMenu) ? 'opened' : 'closed'}>
					{(!this.state.about) ?
						<FaQuestionCircle className="about" onClick={this.toggleAbout}/> :
						<FaCloseThin className="aboutClose" onClick={this.toggleAbout}/>
					}
					<div className="options-bg"></div>
					<div className="about-bg" style={ (this.state.about) ? this.style.showAbout : this.style.hideAbout}>
						<span>
							I recently stumbled across an open API that has all of SpaceX’s launch data and decided it would be fun to make an app that fetches and displays it in a friendly, searchable manner.
							<br />
							<br />
							One mission particularly worth reading about is Flight 59. This included a satellite platform called RemoveDEBRIS which has the goal of cleaning up space junk (satellite pieces, boosters, nuts and bolts). There's about 750,000 pieces of debris floating around our planet at any given time.
							<br/>
							<br/>
							In 2015 alone, the International Space Station had to perform 5 maneuvers to avoid collisions. Not only would an impact be devastating, it could also create additional clouds of debris, potentially triggering a chain reaction and jeopardizing the safety of all astronauts, satellites, and future missions.
						</span>
					</div>
					<h3>{(!this.state.about) ? 'Options' : 'About'}</h3>
					<div className="options-content">
					<div className="spacer"></div>
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
								<span className="circlemark"></span>
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
								<span className="circlemark"></span>
							</label>
						</div>

						<div className="spacer"></div>

						<div>
							<label htmlFor="Successes" className="checkbox-container">Success
								<input
									type="checkbox"
									id="Successes"
									checked={this.state.success}
									value={this.state.success}
									onChange={this.changeSuccess}/>
								<span className="checkmark"></span>
							</label>
							<label htmlFor="Failures" className="checkbox-container">Failure
								<input
									type="checkbox"
									id="Failures"
									checked={this.state.failure}
									defaultChecked={this.state.failure}
									onChange={this.changeFailure}/>
								<span className="checkmark"></span>
							</label>
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