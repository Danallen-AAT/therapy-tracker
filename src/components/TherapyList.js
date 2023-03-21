import React from 'react';
import '../index.css'

class TherapyList extends React.Component {

    render() {
        return (
            <div>
                <div className="banner-section">
                    <h1 className="banner-text" style={{ color: 'rgb(189, 183, 183)' }}>
                        Therapy List
                    </h1>
                </div>

                <div className="middle-section">
                    <table className="therapy-list-table">
                        <tr>
                            <th className="therapy-list-th">Date</th>
                            <th className="therapy-list-th">Name</th>
                            <th className="therapy-list-th">Description</th>
                        </tr>
                        <tr>
                            <td className="therapy-list-td">1/13/23</td>
                            <td className="therapy-list-td">Marsden Ball</td>
                            <td className="therapy-list-td">
                                With alternating palm hits, hit the ball. Using a smooth motion
                                repeat and follow the ball's trajectory inward and outward. Feel the
                                converging and diverging of your eyes.
                            </td>
                        </tr>
                    </table>
                </div>
            </div>

        )
    }
}

export default TherapyList