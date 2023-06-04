import React from "react";
import { Link} from 'react-router-dom';

import "../index.css"

class MiddleSectionBox extends React.Component {

    render() {
        const { label, linkto, state } = this.props;
        // const location = useLocation();
        return (
            <Link className="middle-section-text" state={{...state}} to={linkto}>
                <div className="middle-section-box" >
                    <div>
                        {label}
                    </div>
                </div>
            </Link>
        )
    }
}

export default MiddleSectionBox