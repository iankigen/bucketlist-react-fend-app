import React, {Component} from 'react';
import * as axios from "axios";
import * as constants from "../../constants/constants";

export default class Logout extends Component {


    componentDidMount() {
        this.handleSignUp()
    }

    handleSignUp(state) {

        axios({
            method: 'get',
            url: `${constants.URL}/auth/logout`,
            data: state,
            headers: {
                "Content-Type": "application/json",
                "token": window.sessionStorage.accessToken
            }
        }).then(function (response) {
        });
        window.sessionStorage.accessToken = "";
        window.location.replace('/');

    }

    render() {
        return (
            <div></div>
        );
    }


}