import React from 'react';

import '../index.css'

class Profile extends React.Component {
    render() {
        return (
            <div>
                <div class="top-section">
                    <img class="user-photo" src="../images/profile-photo.jpg" alt="profile" />
                    <div>
                        <p>John Smith</p>
                        <br />
                        <p>1/1/1975</p>
                        <br />
                        <p>Male</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile