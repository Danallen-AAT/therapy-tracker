import React from "react";

import "../index.css";
import MiddleSectionBox from "./MiddleSectionBox";

class HomeScreen extends React.Component {

    render() {
        const { practiceName } = this.props;
        return (
            <div className="Homepage">
                <div className="banner-section">
                    <h1 className="banner-text" >
                        Welcome to <i>{practiceName}</i>
                    </h1>
                </div>

                <div className="middle-section">
                    <MiddleSectionBox label="Therapy List" linkto="/therapylist" />
                    <MiddleSectionBox label="Profile" linkto="/profile" />
                </div>

                <div className="middle-section">
                    <MiddleSectionBox label="Progress" linkto="/progress" />
                </div>
            </div>
        )
    }
}

export default HomeScreen
