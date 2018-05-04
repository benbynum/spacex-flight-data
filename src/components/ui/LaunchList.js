import { Component } from 'react'
import fetch from 'isomorphic-fetch'
import Launch from './Launch'
import Search from './Search'
import Options from './Options'
import moment from 'moment'

class LaunchList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            launches: [],
            filteredLaunches: [],
            loading: false,
            search: '',
            showMenu: true,
            ascending: true,
            success: true,
            failure: true,
            fromDate: null,
            toDate: null
        }

        this.formatLaunch = this.formatLaunch.bind(this);
        this.formatDate = this.formatDate.bind(this);
        this.updateFilters = this.updateFilters.bind(this);
        this.sortAscending = this.sortAscending.bind(this);
        this.sortDescending = this.sortDescending.bind(this);
        this.applyFilters = this.applyFilters.bind(this);
    }

    updateSearch(event) {
        this.setState({
            search: event.target.value.substr(0, 30)
        });
    }

    updateFilters(data) {
        console.log('update filters', data)

        this.setState({
            showMenu: !this.state.showMenu, // hide menu on apply
            ascending: data.isAscending,
            success: data.success,
            failure: data.failure,
            fromDate: data.fromDate,
            toDate: data.toDate
        }, function() {
            console.log('this.state: ', this.state)
            
            if (this.state.ascending === false) this.sortDescending(this.state.filteredLaunches)
            if (this.state.ascending === true) this.sortAscending(this.state.filteredLaunches)
            this.applyFilters(this.state.filteredLaunches);
            this.forceUpdate();
        })
    }

    sortAscending(arr) {
        console.log('sort ascending')
        arr.sort(function(a,b) {
            a = a.jsDate;
            b = b.jsDate;
            return a < b ? -1 : a > b ? 1 : 0;
        })
        
        return arr;
    }

    sortDescending(arr) {
        console.log('sort descending')
        arr.sort(function(a,b) {
            a = a.jsDate;
            b = b.jsDate;
            return a > b ? -1 : a < b ? 1 : 0;
        })

        return arr;
    }

    applyFilters(arr) {
        console.log('applyFilters')
        var _this = this;

        console.log('arr before filter: ', arr)
        // Success/Failure
        arr.forEach(function(launch, i) {
            launch.show = false;

            if (launch.launch_success && _this.state.success) launch.show = true;
            if (!launch.launch_success && _this.state.failure) launch.show = true;
            
            // From Date
            console.log('launch.jsDate: ', launch.jsDate)
            console.log('_this.state.fromDate:', _this.state.fromDate)
            console.log('moment(launch.jsDate).isBefore(_this.state.fromDate):', moment(launch.jsDate).isBefore(_this.state.fromDate))
            if (moment(launch.jsDate).isBefore(_this.state.fromDate)) launch.show = false;
            if (moment(launch.jsDate).isAfter(_this.state.toDate)) launch.show = false;
        })
        
        // TODO:
        // Date filter
    }

    clearSearch() {
        this.setState({
            search: ''
        });
    }

    toggleMenu() {
        this.setState({
            showMenu: !this.state.showMenu
        })
    }
    
    componentWillMount() {
        var _this = this;

        this.setState({loading: true})
        fetch(`https://api.spacexdata.com/v2/launches`)
            .then(response => response.json())
            .then(launches => this.formatLaunch(launches))
            .then(launches => this.setState({
                launches: launches,
                filteredLaunches: launches,
                loading: false
            }))
            .then(function() {
                console.log('this.state: ', _this.state)
            })
    }

    // Create String, JS dates, and show for each launch
    formatLaunch(arr) {
        return arr.map((launch, i) => {
            launch.jsDate = new Date(launch.launch_date_local);
            launch.formattedDate = this.formatDate(launch.launch_date_local);
            launch.show = true;
            return launch;
        });
    }

    formatDate(date) {
        console.log('formatting date')
        var d = new Date(date);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        var month = months[d.getMonth()];
        var day = d.getDate();
        var year = d.getFullYear();

        return month + ' ' + day + ', ' + year;
    }

    render() {
        let launches = this.state.filteredLaunches.filter(
            (launch) => {
                if (!this.state.search.length) {
                    return launch;
                } else if (launch.details == null){
                    launch.details = 'No available details';
                    return launch;
                } else if (launch.details.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1){
                    return launch;
                }

            }
        )

        return (
            <div>
                <Search
                    ref={(ref) => this.mainInput= ref}
                    value={this.state.search}
                    onChange={this.updateSearch.bind(this)}
                    clearSearch={this.clearSearch.bind(this)}
                    showMenu={this.state.showMenu}
                    toggleMenu={this.toggleMenu.bind(this)}/>

                <Options
                    showMenu={this.state.showMenu}
                    updateFilters={this.updateFilters}
                    toggleMenu={this.toggleMenu.bind(this)} />
                
                <div id="Launch-Container">
                    {
                    launches.map((launch, i) => 
                            <Launch missionPatch={launch.links.mission_patch_small}
                                    key={i}
                                    flight={launch.flight_number}
                                    details={launch.details}
                                    success={launch.launch_success}
                                    date={launch.formattedDate}
                                    location={launch.launch_site.site_name_long}
                                    video={launch.links.video_link}
                                    articleLink={launch.links.article_link}
                                    presskit={launch.links.presskit}
                                    show={launch.show}/>
                        )
                    }
                </div>
            </div>
        )
    }
}

export default LaunchList