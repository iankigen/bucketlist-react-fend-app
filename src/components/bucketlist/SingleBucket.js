import React from 'react';
import axios from 'axios';
import {Card, CardHeader} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Link} from "react-router";
import {CardText, Dialog, Snackbar, TextField} from "material-ui";
import * as constants from "../constants/constants";


export default class SingleBucket extends React.Component {
    constructor() {
        super();

        this.state = {
            bucketlist: "",
            open: false,
            id: "",
            hint: "",
            error: "This field is required",
            desc: "",
            opensnakbar: false,
            msg: ""
        }
    }

    componentDidMount() {
        this.getBucketlist();
        const token = window.sessionStorage.accessToken;
        if (!token) {
            window.location.replace('/login')
        }
    }

    getBucketlist() {
        const th = this;
        const id = this.props.params.id;
        axios({
            method: 'get',
            url: `${constants.URL}/bucketlist/${id}`,
            headers: {
                "Content-Type": "application/json",
                "token": window.sessionStorage.accessToken
            }
        }).then(function (response) {
            th.setState({
                bucketlist: response.data
            })


        }).catch(error => {
                if (error.response.status === 401) {
                    window.location.replace('/login')
                }

            }
        );
    }

    handleOpen(e) {
        this.setState({
            open: true,
            id: e.currentTarget.getAttribute('data-id'),
            hint: e.currentTarget.getAttribute('data-desc')
        });
    }

    handleDelete(e) {
        const th = this;
        let id = e.currentTarget.getAttribute('data-id');

        axios({
            method: 'delete',
            url: `${constants.URL}/bucketlist/${id}`,
            headers: {
                "Content-Type": "application/json",
                "token": window.sessionStorage.accessToken
            }
        }).then(function (response) {
            th.getBucketlist();
            window.location.replace('/bucketlist')
        });
    }

    handleDescChange(e) {
        e.preventDefault();
        if (e.target.value !== "") {
            this.setState({
                desc: e.target.value,
                error: ""
            });
        } else {
            this.setState({
                desc: "",
                error: "This field is required"
            });
        }
    }

    handleClose = () => {
        if (this.state.error === "") {
            this.setState({open: false});
        }

    };

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.desc !== "") {
            this.setState({
                error: "",
            })
        }
        let state = this.state;
        this.handleClose();
        this.handleSave(state);

    }

    handleSave(state) {
        const th = this;
        if (state.error === "" && state.desc !== "") {

            axios({
                method: 'put',
                url: `${constants.URL}/bucketlist/${state.id}`,
                data: state,
                headers: {
                    "Content-Type": "application/json",
                    "token": window.sessionStorage.accessToken
                }
            }).then(function (response) {
                th.setState({
                    msg: response.data.message,
                    opensnakbar: true
                });
                th.getBucketlist();
            });
        }
    }

    close() {
        this.setState({
            open: false
        })
    }

    handleRequestClose = () => {
        this.setState({
            opensnakbar: false,
            msg: ""
        });
    };

    render() {

        const actions = [
            <FlatButton
                label="Cancel"
                secondary={true}
                onClick={this.close}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                onClick={this.handleSubmit.bind(this)}
            />,
        ];

        let bucket = this.state.bucketlist;


        return (
            <div style={{margin: 30}}>

                <div>
                    <MuiThemeProvider>
                        <Snackbar
                            open={this.state.opensnakbar}
                            message={this.state.msg}
                            autoHideDuration={4000}
                            onRequestClose={this.handleRequestClose}
                        />
                    </MuiThemeProvider>
                </div>

                <MuiThemeProvider>
                    <Dialog
                        title="Edit Bucket list"
                        actions={actions}
                        modal={true}
                        open={this.state.open}
                    >
                        <form method="POST" action="">
                            <div>
                                <TextField
                                    hintText={this.state.hint}
                                    name="desc"
                                    errorText={this.state.error}
                                    onChange={this.handleDescChange.bind(this)}
                                    floatingLabelText={this.state.hint}
                                /><br/>

                            </div>
                        </form>
                    </Dialog>
                </MuiThemeProvider>

                <div>
                    <MuiThemeProvider>

                        <Card>

                            <CardHeader
                                title={bucket['description']}

                            />


                            <CardText>
                                {
                                    <div>
                                        <p>Created: {bucket['created_date']}</p>
                                        <p>Modified: {bucket['modified_date']}</p>
                                    </div>

                                }
                            </CardText>
                            <FlatButton label="Edit" onClick={this.handleOpen.bind(this)} data-id={bucket['id']}
                                        data-desc={bucket['description']} primary={true}/>
                            <FlatButton label="Delete" data-id={bucket['id']} secondary={true}
                                        onClick={this.handleDelete.bind(this)}/>
                            <Link to={"/bucketlist/" + bucket['id'] + "/items"}><FlatButton
                                label="View Items"/></Link>
                        </Card>
                    </MuiThemeProvider>
                </div>

            </div>

        );


    }
}