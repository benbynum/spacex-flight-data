import { Component } from 'react'
import './launch.scss'

class Launch extends Component {

    constructor(props) {
        super(props)

        this.style = {}
    }

    componentWillMount() {
        this.style.bg = {
            backgroundImage: `url(${this.props.missionPatch})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            border: '10px solid #fbfbfb'
        }
        this.style.p = {
            display: '-webkit-box',
            WebkitLineClamp: 7,
            WebkitBoxOrient: 'vertical'
        }
    }

    render() {
        const { missionPatch, details, flight, success, date } = this.props

        return (
            <div className="launch launch-item-container">
                <div className="launch-item">
                    <div className="badge" style={this.style.bg}>
                        <div className="map-container">
                            <div className="map">
                            </div>
                        </div>
                    </div>
                    <div className="launch-details">
                        <div className="launch-details-container">
                            <h3>Flight #{flight}</h3>
                            <span className="date">
                                {new Intl.DateTimeFormat('en-US', { 
                                  year: 'numeric', 
                                  month: 'long', 
                                  day: '2-digit' 
                                }).format(new Date(date))}
                            </span>
                            <span>Location</span>
                            <h3 className="status">
                                {(success) ?
                                    'Success' :
                                    'Failure'
                                }
                            </h3>
                            <p className="details" style={this.style.p}>{details}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Launch