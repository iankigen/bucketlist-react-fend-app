import React from 'react';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import axios from 'axios';
import * as constants from "../../constants/constants";
import {Card, CardMedia, RaisedButton} from "material-ui";
import imag from './../../../../src/intro.jpg';


class SignUp extends React.Component {

    constructor() {
        super();

        this.state = {
            "name": "",
            "password": "",
            "c_password": "",
            "error": "",
            "c_error": "",
            "email_error": "",
            "valid": false
        };

        this.handleNameChange = this.handleNameChange.bind(this)
        this.handlePassChange = this.handlePassChange.bind(this)
        this.handleConfirmPassChange = this.handleConfirmPassChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleNameChange(e) {
        this.setState({
            name: e.target.value
        });

        this.setState({
            email_error: "",
            valid: true
        });
        if (!this.validateEmail(this.state.name)) {
            this.setState({
                email_error: "Invalid Email Address",
                valid: false
            })
        }

    }

    validateEmail(email) {
        let re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    handlePassChange(e) {
        this.setState({
            password: e.target.value
        });

        this.setState({
            error: "",
            valid: true
        });

        if (e.target.value.length < 6) {
            this.setState({
                error: "Password must be more than 6 characters",
                valid: false
            })
        }

    }

    handleConfirmPassChange(e) {
        this.setState({
            c_password: e.target.value
        });

        this.setState({
            error: "",
            c_error: "",
            valid: true
        });

        if (this.state.password !== e.target.value) {
            this.setState({
                c_error: "Password Mismatch",
                valid: false
            })
        }


    }


    handleSubmit(e) {
        e.preventDefault();
        const state = this.state;
        if (state.name && state.password && state.c_password) {
            this.handleSignUp(state);
        }

    }

    handleSignUp(state) {

        axios({
            method: 'post',
            url: `${constants.URL}/auth/register`,
            data: state,
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (response) {
            window.sessionStorage.accessToken = response.data.access_token;
            window.location.replace('/login')


        });
    }


    render() {
        const styles = {
            main: {
                textAlign: 'center',
            },
            button: {
                margin: 10
            },
            overlay: {
                margin: '23%'
            }
        };

        return (

            <div style={styles.main}>

                <MuiThemeProvider>
                    <Card>
                        <CardMedia
                            overlay={<div style={styles.overlay}>

                                <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                                    <form method="POST" action="">
                                        <div>
                                            <TextField
                                                hintText="Email"
                                                name="name"
                                                required="required"
                                                type="email"
                                                errorText={this.state.email_error}
                                                onChange={this.handleNameChange}
                                                floatingLabelText="Email"
                                            /><br/>
                                        </div>

                                        <div>
                                            <TextField
                                                type="password"
                                                name="password"
                                                hintText="password"
                                                errorText={this.state.error}
                                                onChange={this.handlePassChange}
                                                floatingLabelText="Password"
                                            />

                                            <br/>
                                        </div>

                                        <div>
                                            <TextField
                                                type="password"
                                                name="c_password"
                                                hintText="Confirm password"
                                                errorText={this.state.c_error}
                                                onChange={this.handleConfirmPassChange}
                                                floatingLabelText="Confirm password"
                                            />

                                            <br/>
                                        </div>

                                        <div>
                                            <RaisedButton
                                                label="Sign Up"
                                                primary={true}
                                                style={styles.button}
                                                onClick={this.handleSubmit}
                                            />

                                            <RaisedButton
                                                secondary={true}
                                                style={styles.button}
                                                label="Cancel"
                                            />
                                        </div>


                                    </form>
                                </MuiThemeProvider>

                            </div>}
                        >
                            <img src={imag} alt=""/>
                        </CardMedia>

                    </Card>
                </MuiThemeProvider>
            </div>
        )
            ;
    }
}


export default SignUp;