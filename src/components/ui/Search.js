import { Component } from 'react'
import './search.scss'
import FaSearch from 'react-icons/lib/fa/search' 

class Search extends Component {

	render() {

		return (
			<div
				id="Search"
				value={this.props.value}
				onChange={this.props.onChange}>
				<FaSearch className="search-icon"/>

				<input
					type="text"
					id="Search-Text"
					placeholder="Search flight data" />
			</div>
		)
	}
}

export default Search