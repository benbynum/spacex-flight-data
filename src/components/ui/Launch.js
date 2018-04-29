import { Component } from 'react'
import './launch.scss'
// import GoogleMapReact from 'google-map-react'

class Launch extends Component {

    static defaultProps = {
        center: { lat: 40.7446790, lng: -73.9485420 },
        zoom: 11
    }

    constructor(props) {
        super(props)

        this.style = {}

        // TODO: Review color scheme and general UI layout
        this.style.failure = {
            backgroundColor: '#ef9986'
        }
        this.style.success = {
            backgroundColor: '#5ed189'
        }

    }

    componentWillMount() {
        this.style.bg = {
            backgroundImage: `url(${this.props.missionPatch})`,
            backgroundSize: '50%',
            backgroundPosition: 'center 30px',
            backgroundRepeat: 'no-repeat'
            // border: '10px solid #fbfbfb'
        }
        this.style.p = {
            display: '-webkit-box',
            WebkitLineClamp: 7,
            WebkitBoxOrient: 'vertical'
        }

    }

    render() {
        const { missionPatch, details, flight, success, date, location } = this.props
        const AnyReactComponent = ({ text }) => <div>{ text }</div>;

        return (
            <div className="launch launch-item-container">
                <div className="launch-item">
                    <div className="badge" style={this.style.bg}>
                        
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
                            <h3 className="status">
                                {(success) ?
                                    'Success' :
                                    'Failure'
                                }
                            </h3>
                            <p className="details" style={this.style.p}>{details}</p>
                        </div>
                    </div>
                    <div className="launch-item-bg">
                        <div className="badgeShadow"></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Launch