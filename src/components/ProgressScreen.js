import React from 'react';
import '../index.css'

class ProgressScreen extends React.Component {
    render() {

        return (
            <div class="top-section">
                <img alt="chart" className="user-photo" src="data:image/png;base64,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" />
                <div>

                    <p>John Smith</p>
                    <br />
                    <p>1/1/1975</p>
                    <br />
                    <p>Male</p>
                </div>
            </div>
        )
    }
}

export default ProgressScreen