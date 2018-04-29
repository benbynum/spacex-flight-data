import { Component } from 'react'
import './search.scss'
import FaSearch from 'react-icons/lib/fa/search' 
import FaClose from 'react-icons/lib/fa/close' 

class Search extends Component {
	render() {

	let _Search;
	let _this = this;

	const clearSearch = function() {
		_this.props.clearSearch();
		_Search.value = '';
		_Search.focus();
	}

		return (
			<div
				id="Search"
				value={this.props.value}
				onChange={this.props.onChange}>
				<FaSearch className="search-icon"/>
				{(this.props.value) ? <FaClose className="close-icon" onClick={clearSearch}/> : null}
				<input
					type="text"
					id="Search-Text"
					placeholder="Search flight data"
					ref="Search"
					ref={input => _Search = input}/>
			</div>
		)
	}
}

export default Search