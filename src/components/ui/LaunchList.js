import { Component } from 'react'
import fetch from 'isomorphic-fetch'
import Launch from './Launch'
import Search from './Search'

class LaunchList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            launches: [],
            loading: false,
            search: ''
        }

    }

    updateSearch(event) {
        console.log('Updating search');
        this.setState({
            search: event.target.value.substr(0, 30)
        });
    }

    componentWillUpdate(nextProps) {

    }

    componentDidUpdate(prevProps) {

    }
    
    componentWillMount() {
        var _this = this;

        this.setState({loading: true})
        fetch(`https://api.spacexdata.com/v2/launches`)
            .then(response => response.json())
            .then(launches => this.setState({
                launches: launches,
                loading: false
            }))
            .then(function() {
                console.log('Launches: ', _this.state.launches)
            })
    }

    componentDidMount() {
       
    }

    render() {
        // const { launches } = this.state
        console.log('this.state.launches: ', this.state.launches)
        let filteredLaunches = this.state.launches.filter(
            (launch) => {
                if (!this.state.search.length) {
                    return launch;
                } else if (launch.details == null){
                    launch.details = 'No availabel details';
                    return launch;
                } else if (launch.details.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1){
                    return launch;
                }

            }
        )

        return (
            <div>
                <Search
                    value={this.state.search}
                    onChange={this.updateSearch.bind(this)}/>
                <div id="Launch-Container">
                    {
                        filteredLaunches.map((launch, i) => 
                            <Launch missionPatch={launch.links.mission_patch_small}
                                    key={i}
                                    flight={launch.flight_number}
                                    details={launch.details}
                                    success={launch.launch_success}
                                    date={launch.launch_date_local}
                                    location={launch.launch_site.site_name_long}/>
                        )
                    }
                </div>
            </div>
        )
    }
}

export default LaunchList