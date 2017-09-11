import React from 'react';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import axios from 'axios';
import * as constants from "../../constants/constants";
import {Card, CardMedia, RaisedButton} from "material-ui";
import imag from './../../../../src/intro.jpg';


class Login extends React.Component {

    constructor() {
        super();

        this.state = {
            name: "",
            password: "",
            error: "",
            email_error: "",
            valid: false,
            msg: ""
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePassChange = this.handlePassChange.bind(this);
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
        if (!this.validateEmail(e.target.value)) {
            this.setState({
                email_error: "Invalid Email Address",
                valid: false
            })
        }

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

    validateEmail(email) {
        let re = /\S+@\S+\.\S+/;
        return re.test(email);
    }


    handleSubmit(e) {
        e.preventDefault();
        const state = this.state;
        if (state.name && state.password) {
            this.handleSignUp(state);
        } else {

        }

    }

    handleSignUp(state) {
        const th = this;
        axios({
            method: 'post',
            url: `${constants.URL}/auth/login`,
            data: state,
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (response) {

            let token = response.data.token;

            if (token) {
                window.sessionStorage.accessToken = token;
                window.location.replace('/bucketlist')
            }


        }).catch(
            error => {

                th.setState({
                    msg: "Invalid username or password"
                })

            }
        );

    }

    showError() {
        return (
            <div style={{color: '#9f1409'}}>
                {this.state.msg}
            </div>);
    }


    render() {

        const styles = {
            overlay: {
                margin: '23%'
            },
            main: {
                textAlign: 'center'
            },
            button: {
                margin: 10
            },
        };

        return (
            <div style={styles.main}>


                <MuiThemeProvider>
                    <Card>
                        <CardMedia
                            overlay={<div style={styles.overlay}>
                                {this.showError()}

                                <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>

                                    <form method="POST" action="">
                                        <div>
                                            <TextField
                                                hintText="Email"
                                                name="name"
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
                                            <RaisedButton
                                                label="Sign In"
                                                primary={true}
                                                style={styles.button}
                                                onClick={this.handleSubmit}
                                            />

                                            <RaisedButton
                                                secondary={true}
                                                style={styles.button}
                                                href="/login"
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
        );
    }
}


export default Login;
