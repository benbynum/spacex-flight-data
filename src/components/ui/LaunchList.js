import { Component } from 'react'
import fetch from 'isomorphic-fetch'
import Launch from './Launch'
import Search from './Search'
import Options from './Options'

class LaunchList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            launches: [],
            filteredLaunches: [],
            loading: false,
            search: '',
            showMenu: false,
            ascending: true,
            success: true,
            failure: true,
            fromDate: null,
            toDate: null
        }

        this.formatDates = this.formatDates.bind(this);
        this.formatDate = this.formatDate.bind(this);
        this.updateFilters = this.updateFilters.bind(this);
        this.sortAscending = this.sortAscending.bind(this);
        this.sortDescending = this.sortDescending.bind(this);
    }

    updateSearch(event) {
        this.setState({
            search: event.target.value.substr(0, 30)
        });
    }

    updateFilters(data) {
        console.log('update filters', data)

        this.setState({
            ascending: data.isAscending,
            showMenu: !this.state.showMenu
        }, function() {
            console.log('this.state: ', this.state)
            // TODO: Finish filtering

            if (this.state.ascending === false) this.sortDescending(this.state.filteredLaunches)
            if (this.state.ascending === true) this.sortAscending(this.state.filteredLaunches)
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
            .then(launches => this.formatDates(launches))
            .then(launches => this.setState({
                launches: launches,
                filteredLaunches: launches,
                loading: false
            }))
            .then(function() {
                console.log('this.state: ', _this.state)
            })
    }

    // Create String and JS dates for each launch
    formatDates(arr) {
        return arr.map((launch, i) => {
            launch.jsDate = new Date(launch.launch_date_local);
            launch.formattedDate = this.formatDate(launch.launch_date_local);
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
                                    presskit={launch.links.presskit}/>
                        )
                    }
                </div>
            </div>
        )
    }
}

export default LaunchList