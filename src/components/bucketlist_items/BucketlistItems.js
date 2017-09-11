import React, {Component} from 'react';
import * as axios from "axios";
import Dialog from 'material-ui/Dialog';
import {
    Card, CardHeader, CardText, FlatButton, FloatingActionButton, MuiThemeProvider, Snackbar,
    TextField
} from "material-ui";
import ContentAdd from 'material-ui/svg-icons/content/add';
import * as constants from "../constants/constants";


class BucketlistItems extends Component {
    constructor() {
        super();
        this.state = {
            token: "",
            id: "",
            error: "This field is required",
            open: false,
            valid: false,
            items: "",
            opensnakbar: false,
            msg: "",
            page: 1
        };

        this.handleGoalChange = this.handleGoalChange.bind(this);
        this.getBucketlist = this.getBucketlist.bind(this);
    }

    componentDidMount() {
        this.setState({
            token: window.sessionStorage.accessToken,
            id: this.props.params.id
        });

        this.getBucketlist();
        const token = window.sessionStorage.accessToken;
        if (!token) {
            window.location.replace('/login')
        }
    }


    getBucketlist() {

        const th = this;
        let page = this.state.page;
        let url = `${constants.URL}/bucketlist/${this.props.params.id}/items`;

        if (page > 1) {
            url = `${constants.URL}/bucketlist/${this.props.params.id}/items?page=${page}`;
        }
        axios({
            method: 'get',
            url: url,
            headers: {
                "Content-Type": "application/json",
                "token": window.sessionStorage.accessToken
            }
        }).then(function (response) {
            let items = response.data['Bucket list items'];
            th.setState({
                items: items
            })

        }).catch(error => {
                if (error.response.status === 401) {
                    window.location.replace('/login')
                }
            }
        );

    }

    handleGoalChange(e) {

        if (e.target.value !== "") {
            this.setState({
                goal: e.target.value,
                error: "",
                valid: true
            });
        } else {
            this.setState({
                error: "This field is required",
                valid: false
            });
        }

    }

    handleSubmit(e) {
        e.preventDefault();

        this.handleClose();
        this.setState({
            error: "This field is required",
        });

        this.handlePost();

    }

    handlePost() {
        const th = this;
        if (this.state.error === "" && this.state.goal !== "") {
            axios({
                method: 'post',
                url: `${constants.URL}/bucketlist/${this.props.params.id}/items`,
                data: this.state,
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
            })
        }


    }


    handleOpen = () => {
        this.setState({open: true});
    };

    close = () => {
        this.setState({open: false});
    };

    handleClose = () => {
        if (this.state.error === "") {
            this.setState({open: false});
        }
    };

    renderUserMessage(param) {
        if (param) {
            return (
                " Completed"
            );
        } else {
            return " Pending"
        }
    }


    deleteItem(e) {
        const th = this;
        let item_id = e.currentTarget.getAttribute('id');
        axios({
            method: 'delete',
            url: `${constants.URL}/bucketlist/${this.props.params.id}/items/${item_id}`,
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
        })
    }

    markDone(e) {
        const th = this;
        let item_id = e.currentTarget.getAttribute('id');

        axios({
            method: 'put',
            url: `${constants.URL}/bucketlist/${this.props.params.id}/items/${item_id}`,
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
        })
    }

    renderMarkDone(param, id) {
        if (!param) {
            return (
                <FlatButton label="Mark as Done" primary={true} onClick={this.markDone.bind(this)} id={id}/>
            );
        }
    }

    nextPage() {
        this.setState((prevState, nextProps) => ({
            page: prevState.page + 1
        }), () => {
            this.getBucketlist();
        });

    }

    prevPage() {
        this.setState((prevState, nextProps) => ({
            page: prevState.page - 1
        }), () => {
            this.getBucketlist();
        });
    }

    button() {
        const items = this.state.items;


        if (items !== "") {
            if (this.state.page === 1) {

                if (items.length > 4) {
                    return (
                        <div style={{margin: 30, display: 'flex'}}>

                            <button onClick={this.nextPage.bind(this)}>NEXT</button>
                        </div>
                    );
                }


            } else {
                if (items.length > 4) {
                    return (
                        <div>
                            <button onClick={this.prevPage.bind(this)}>PREVIOUS</button>
                            <button onClick={this.nextPage.bind(this)}>NEXT</button>
                        </div>
                    )
                }
                return (
                    <div style={{margin: 30, display: 'flex'}}>
                        <button onClick={this.prevPage.bind(this)}>PREVIOUS</button>
                    </div>
                );
            }

        }
    }

    handleRequestClose = () => {
        this.setState({
            opensnakbar: false,
            msg: ""
        });
    };

    isEmpty() {
        if (!this.state.items) {
            return (
                <div>
                    <h1>Bucket list items not available at the moment</h1>
                </div>
            );
        }
    }

    render() {

        let items = this.state.items;

        const style = {
            margin: 50,
        };

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


        return (
            <div>
                {this.isEmpty()}
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
                        title="Add bucket list item"
                        actions={actions}
                        modal={true}
                        open={this.state.open}
                    >
                        <form action="" method="post">
                            <TextField
                                name="goal"
                                hintText="Bucket list item name"
                                errorText={this.state.error}
                                onChange={this.handleGoalChange.bind(this)}
                                floatingLabelText="Add Goal"
                            /><br/>
                        </form>
                    </Dialog>

                </MuiThemeProvider>
                <MuiThemeProvider>

                    <FloatingActionButton style={style} onClick={this.handleOpen}>
                        <ContentAdd/>
                    </FloatingActionButton>
                </MuiThemeProvider>

                {


                    Object.keys(items).map((key, value) => (

                        <div key={key} style={{padding: 10}}>
                            <MuiThemeProvider>
                                <Card>

                                    <CardHeader
                                        title={items[key]['goal']}
                                    />

                                    <CardText>
                                        <b>STATUS: </b> {this.renderUserMessage(items[key]['completed'])}
                                    </CardText>
                                    {this.renderMarkDone(items[key]['completed'], items[key]['id'])}
                                    <FlatButton label="Delete" secondary={true} id={items[key]['id']}
                                                onClick={this.deleteItem.bind(this)}/>
                                </Card>
                            </MuiThemeProvider>
                        </div>


                    ))

                }

                {this.button()}


            </div>
        );
    }
}

export default BucketlistItems;