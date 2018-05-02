import { Component } from 'react'
import './search.scss'
import FaSearch from 'react-icons/lib/fa/search' 
import FaBars from 'react-icons/lib/fa/bars' 
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
		const menuClick = function() {
			console.log('menu click: ', _this.props.showMenu)
			_this.props.showMenu = !_this.props.showMenu;
		}
		const showOptions = function() {

		}
		const hideOptions = function() {

		}

		return (
			<div
				id="Search"
				value={this.props.value}
				onChange={this.props.onChange}>
				<FaSearch className="search-icon"/>

				{(this.props.showMenu === true) ? <FaClose className="close-icon" onClick={this.props.toggleMenu}/> :
							  <FaBars className="bars-icon" onClick={this.props.toggleMenu} />}

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