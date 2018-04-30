import { Component } from 'react'
import './launch.scss'
import FaMapMarker from 'react-icons/lib/fa/map-marker' 
import FaYoutubePlay from 'react-icons/lib/fa/youtube-play' 
import FaExternalLink from 'react-icons/lib/fa/external-link' 

class Launch extends Component {

    static defaultProps = {
        center: { lat: 40.7446790, lng: -73.9485420 },
        zoom: 11
    }

    constructor(props) {
        super(props)
        const successColor = '#5ed189';
        const failColor = '#ef9986';

        this.style = {}

        // TODO: Review color scheme and general UI layout
        this.style.successColor = {
            color: successColor
        }
        this.style.failColor = {
            color: failColor
        }
        this.style.successBgColor = {
            backgroundColor: successColor
        }
        this.style.failBgColor = {
            backgroundColor: failColor
        }


    }

    componentWillMount() {
        this.style.bg = {
            backgroundImage: `url(${this.props.missionPatch})`,
            backgroundSize: '50%',
            backgroundPosition: 'center 30px',
            backgroundRepeat: 'no-repeat'
        }
        this.style.p = {
            display: '-webkit-box',
            WebkitLineClamp: 5,
            WebkitBoxOrient: 'vertical'
        }

    }

    render() {
        const { missionPatch, details, flight, success, date, location, video, articleLink, presskit } = this.props
        const AnyReactComponent = ({ text }) => <div>{ text }</div>;

        const openUrl = function(url) {
            var win = window.open(url, '_blank');
        }
        const formatDate = function(date) {
            console.log('formatting date')
            var d = new Date(date);
            var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            var month = months[d.getMonth()];
            var day = d.getDate();
            var year = d.getFullYear();

            return month + ' ' + day + ', ' + year
        }

        return (
            <div className="launch launch-item-container" style={(success ? this.style.successBgColor : this.style.failBgColor)}>
                <div className="launch-item">
                    <div className="badge" style={this.style.bg}>
                        
                    </div>
                    <div className="launch-details">
                        <div className="launch-details-container">
                            <h3 className="title">Flight #{flight}</h3>
                            <span className="date">
                                {formatDate(date)}
                            </span>
                            <h3 className="status" style={(success) ? this.style.successColor : this.style.failColor}> 
                                {(success) ?
                                    'Success' :
                                    'Failure'
                                }
                            </h3>
                            <div className="fade">
                                <p className="details" style={this.style.p}>{(details) ? details : 'No available details.'}</p>
                                <div
                                    className="overlay"
                                    onClick={() => (articleLink) ? openUrl(articleLink) : openUrl(presskit)}>
                                    <span>Read more</span>
                                    <div><FaExternalLink /></div>
                                </div>
                            </div>
                        </div>
                        <div className={"map-icon-container" + (success ? ' success' : ' failure')}
                             onClick={() => openUrl('http://maps.google.com/?q=' + location)}>
                            <FaMapMarker className="map-icon" />
                        </div>
                        <div className={"video-icon-container" + (success ? ' success' : ' failure')}
                             onClick={() => openUrl(video)}>
                            <FaYoutubePlay className="video-icon"/>
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