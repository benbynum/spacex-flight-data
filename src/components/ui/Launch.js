import { Component } from 'react'
import './launch.scss'

class Launch extends Component {

    componentWillMount() {
        this.style = {
            backgroundImage: `url(${this.props.missionPatch})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            border: '10px solid white'
        }
    }

    render() {
        const { missionPatch } = this.props

        return (
            <div className="launch launch-item-container">
                <div className="launch-item">
                    <div className="badge" style={this.style}>
                        <div className="map-container">
                            <div className="map">
                            </div>
                        </div>
                    </div>
                    <div>Launch Details</div>
                </div>
            </div>
        )
    }
}

export default Launch