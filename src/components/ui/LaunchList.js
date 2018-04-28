import { Component } from 'react'
import fetch from 'isomorphic-fetch'
import Launch from './Launch'

class LaunchList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            launches: [],
            loading: false
        }

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
        const { launches } = this.state
        
        return (
            <div id="Launch-Container">
                {
                    launches.map((launch, i) => 
                        <Launch missionPatch={launch.links.mission_patch_small}
                                key={i}
                                flight={launch.flight_number}
                                details={launch.details}
                                success={launch.launch_success}
                                date={launch.launch_date_local}/>
                    )
                }
            </div>
        )
    }
}

export default LaunchList