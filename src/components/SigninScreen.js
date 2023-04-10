import React from "react"
import axios from "axios"
import { Link } from "react-router-dom"

import "../index.css"

class SigninScreen extends React.Component {
    constructor() {
        super()
        this.state = { username: null, password: null, newuser: false, signinSuccessful: false }
        this.urlBase = "https://flask-service.bp0d6s37bhscg.us-west-2.cs.amazonlightsail.com/"
        this.signinEndpoint = "/login"
        this.newUserEndpoint = "/registeruser"
    }

    loginChange(e, type) {
        this.setState({ ...this.state, [type]: e.target.value })
    }

    login() {
        const { username, password } = this.state;
        const headers = { 'Content-Type': 'application/json' }
        const body = {
            "username": username, "password": password
        }
        const config = {
            method: "POST",
            url: this.signinEndpoint,
            baseURL: this.urlBase,
            headers: headers,
            data: body
        }
        //axios call here
        axios(config).then(response => {
            const data = response.data
            console.log(data)
            console.log(data["username"])
            if (!data["username"]) {
                //make a new component visible for the user to "Create account"
                this.setState({ ...this.state, newuser: true })
            } else {
                //navigate to homescreen
                this.setState({...this.state, signinSuccessful: true})
            }
        }).catch(err => console.log(err))
    }

    addNewUser() {
        const { username, password } = this.state;
        const headers = { 'Content-Type': 'application/json' }

        const config = {
            method: "POST",
            baseURL: this.urlBase,
            url: this.newUserEndpoint,
            headers: headers,
            data: { username, password }
        }

        axios(config).then(response => {
            console.log(response.data)
            //return the username
            //navigate to next screen
            this.setState({ ...this.state, newuser: false, signinSuccessful: true })
        })
        console.log(`newUser: ${username} - ${password}`)
    }

    goToHomescreen() {

    }


    render() {
        const { practiceName } = this.props;
        const { username, password, newuser, signinSuccessful } = this.state;
        //define the loginchange function as a variable here in order to send parameters in the function down below
        const loginChange = this.loginChange.bind(this);
        return (
            <div className="SigninScreen">
                <div className="banner-section">
                    <h1 className="banner-text" >
                        Welcome to <i>{practiceName}</i>
                    </h1>
                </div>

                <div className="signin-box">
                    <h3>Sign In DEV</h3>
                    <span>Username: </span><input onChange={(e) => loginChange(e, "username")} value={username} />
                    <span>Password: </span><input onChange={(e) => loginChange(e, "password")} value={password} />
                    <button style={{ "margin-top": "5px" }} onClick={this.login.bind(this)}>Sign In</button>
                    {(newuser) &&
                        <div>
                            <p>No account found. Create one now?</p>
                            <button style={{ "margin-top": "5px" }} onClick={this.addNewUser.bind(this)}>Create New Account</button>
                        </div>
                    }

                    {
                        (signinSuccessful) && <div>
                            <p>Account Created. Click the button to continue to the homepage.</p>
                            <Link to="/homepage" >
                                <button>Go</button>
                            </Link>
                        </div>
                    }


                </div>
            </div>
        )
    }
}

export default SigninScreen