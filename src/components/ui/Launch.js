import { Component } from 'react'
import './launch.scss'

class Launch extends Component {

    render() {
        return (
            <div className="launch-item-container">
                <div className="launch-item">
                    <div className="badge">
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