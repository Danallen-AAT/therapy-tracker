import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import React from 'react';
import ReactDOM from 'react-dom/client';

import SigninScreen from './components/SigninScreen';
import HomeScreen from './components/HomeScreen';
import TherapyList from './components/TherapyList';
import Profile from './components/Profile';
import ProgressScreen from './components/ProgressScreen';
import './index.css';

//set up the navigation here

class Main extends React.Component {
    render() {
        const practiceName = "Example Therapy Name"
        return (
            <div className='Main'>
                <Routes>
                    <Route path="/" element={<SigninScreen state={{practiceName}} practiceName={practiceName} />} />
                    <Route path="/homepage" element={<HomeScreen state={{practiceName:practiceName}} practiceName={practiceName} />} />
                    <Route path="/therapylist" element={<TherapyList />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/progress" element={<ProgressScreen />} />
                </Routes>
            </div>
        )
    }
}

//Find the element with id root in the HTML file, and place our Main class there.
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Router>
        <Main />
    </Router>
);