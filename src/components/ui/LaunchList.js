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
            loading: false,
            search: '',
            showMenu: false
        }

    }

    updateSearch(event) {
        this.setState({
            search: event.target.value.substr(0, 30)
        });
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
            .then(launches => this.setState({
                launches: launches,
                loading: false
            }))
            .then(function() {
                console.log('Launches: ', _this.state.launches)
            })
    }

    render() {
        let filteredLaunches = this.state.launches.filter(
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
                    showMenu={this.state.showMenu}/>
                
                <div id="Launch-Container">
                    {
                        filteredLaunches.map((launch, i) => 
                            <Launch missionPatch={launch.links.mission_patch_small}
                                    key={i}
                                    flight={launch.flight_number}
                                    details={launch.details}
                                    success={launch.launch_success}
                                    date={launch.launch_date_local}
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