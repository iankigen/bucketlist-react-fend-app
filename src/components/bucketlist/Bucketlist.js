import React from 'react';
import axios from 'axios';
import {Card, CardHeader} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Link} from "react-router";

import {CardText, Dialog, FloatingActionButton, RaisedButton, Snackbar, TextField} from "material-ui";
import {ContentAdd} from "material-ui/svg-icons/index";
import * as constants from './../constants/constants'

class Bucketlist extends React.Component {

    constructor() {
        super();

        this.state = {
            token: "",
            open: false,
            open_add_bucket: false,
            opensearch: false,
            error: "This field is required",
            desc: "",
            hint: "",
            id: "",
            test: "",
            search: "",
            page: 1,
            bucketlists: "",
            loading: false,
            msg: "",
            opensnakbar: false
        };
        this.getBucketlist = this.getBucketlist.bind(this);
        this.handleDescChange = this.handleDescChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.setState({
            token: window.sessionStorage.accessToken,
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
        let url = `${constants.URL}/bucketlist`;

        if (page > 1) {
            url = `${constants.URL}/bucketlist?page=${page}`;
        }

        axios({
            method: 'get',
            url: url,
            headers: {
                "Content-Type": "application/json",
                "token": window.sessionStorage.accessToken
            }
        }).then(function (response) {
                let bucketlist = response.data['Bucket lists'];
                th.setState({
                    bucketlists: bucketlist
                })

            }
        );
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

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.desc !== "") {
            this.setState({
                error: "",
                valid: true
            })
        }
        let state = this.state;
        this.handleClose();
        this.handleSaveUpdate(state);

    }

    handleSaveUpdate(state) {
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

        this.setState({
            desc: "",
            valid: false,
            "error": "This field is required",
        });
    }

    handleDelete = (e) => {
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

            th.setState({
                msg: response.data.message,
                opensnakbar: true
            });

            th.getBucketlist();
        });
    };


    handleOpen = (e) => {
        this.setState({
            open: true,
            id: e.currentTarget.getAttribute('data-id'),
            hint: e.currentTarget.getAttribute('data-desc')
        });
    };

    handleClose = () => {
        if (this.state.error === "") {
            this.setState({
                open: false,
                desc: ""

            });
        }

    };


    close = () => {
        this.setState({
            open: false,
            desc: ""
        })
    };


    handleSearch = () =>{
        this.setState({opensearch: !this.state.opensearch});
    }

    handleSearchChange(e) {
        this.setState({search: e.target.value});
    }

    handleSearch(e) {
        e.preventDefault();
        const th = this;
        axios({
            method: 'get',
            url: `${constants.URL}/bucketlist?q=${this.state.search}`,
            headers: {
                "Content-Type": "application/json",
                "token": window.sessionStorage.accessToken
            }
        }).then(function (response) {

            let bucketlist = response.data['Bucket lists'];
            th.setState({
                search: "",
                bucketlists: bucketlist
            })

        }).catch(

        );
        this.handleSearch();
    }


    handleCloseBucket() {
        this.setState({
            open_add_bucket: false,
            desc: ""
        });
    }

    handleOpenBucket() {
        this.setState({
            open_add_bucket: true
        })
    }

    handleAddBucketDescChange(e) {
        if (e.target.value) {
            this.setState({
                desc: e.target.value,
                error: ""
            })
        }

    }

    handleAddBucketSubmit(e) {
        e.preventDefault();
        if (this.state.desc) {
            this.handleSave();
        }
        this.handleCloseBucket()

    }

    handleSave() {
        const th = this;
        if (this.state.error === "" && this.state.desc !== "") {

            axios({
                method: 'post',
                url: `${constants.URL}/bucketlist`,
                data: this.state,
                headers: {
                    "Content-Type": "application/json",
                    "token": window.sessionStorage.accessToken
                }
            }).then(function (response) {
                th.setState({
                    msg: response.data.message,
                    opensnakbar: true
                })
            });
        }
        this.setState({
            desc: "",
            error: "This field is required"
        });
        th.getBucketlist()
    }

    handleRequestClose = () => {
        this.setState({
            opensnakbar: false,
            msg: ""
        });
    };

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
        const bucket = this.state.bucketlists;


        if (bucket !== "") {
            if (this.state.page === 1) {

                if (bucket.length > 4) {
                    return (
                        <div style={{margin: 30, display: 'flex'}}>

                            <button onClick={this.nextPage.bind(this)}>NEXT</button>
                        </div>
                    );
                }


            } else {
                if (bucket.length > 4) {
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

    isEmpty = (style) => {
        if (!this.state.bucketlists) {
            return (
                <div>
                    <h1>
                        Bucket lists not available at the moment
                    </h1>
                    <br/>
                    <div>
                        <MuiThemeProvider>
                            <FloatingActionButton style={style} onClick={this.handleOpenBucket.bind(this)}>
                                <ContentAdd/>
                            </FloatingActionButton>
                        </MuiThemeProvider>
                    </div>
                </div>

            );
        } else {
            return (
                <div style={{margin: 30, display: 'flex'}}>
                    <div>
                        <MuiThemeProvider>
                            <FloatingActionButton style={style} onClick={this.handleOpenBucket.bind(this)}>
                                <ContentAdd/>
                            </FloatingActionButton>
                        </MuiThemeProvider>
                    </div>
                    <div style={{margin: 15}}>
                        <MuiThemeProvider>
                            <RaisedButton primary={true} label="Search Bucket list" onClick={this.handleSearch}/>
                        </MuiThemeProvider>
                    </div>
                </div>
            );
        }
    };


    render() {

        let bucket = this.state.bucketlists;

        const styles = {
            card2: {
                position: 'relative',
                padding: 30,
            },
            align: {
                align: 'left'
            }
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


        const actions2 = [
            <FlatButton
                label="Cancel"
                secondary={true}
                onClick={this.handleSearch}
            />,
            <FlatButton
                label="Search"
                primary={true}
                onClick={this.handleSearch.bind(this)}
            />,
        ];

        const customContentStyle = {
            width: '40%',
            maxWidth: 'none',
        };

        const actionsaddbucket = [
            <FlatButton
                label="Cancel"
                secondary={true}
                onClick={this.handleCloseBucket.bind(this)}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                onClick={this.handleAddBucketSubmit.bind(this)}
            />,
        ];


        return (
            <div>
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

                <div>
                    <MuiThemeProvider>
                        <Dialog
                            title="Add Bucketlist"
                            actions={actionsaddbucket}
                            modal={true}
                            open={this.state.open_add_bucket}
                        >
                            <div>
                                <TextField
                                    hintText="Description"
                                    name="desc"
                                    errorText={this.state.error}
                                    onChange={this.handleAddBucketDescChange.bind(this)}
                                    floatingLabelText="Description"
                                />

                            </div>
                        </Dialog>
                    </MuiThemeProvider>
                </div>


                {this.isEmpty()}


                <MuiThemeProvider>
                    <Dialog
                        title="Search Bucket list"
                        actions={actions2}
                        modal={true}
                        contentStyle={customContentStyle}
                        open={this.state.opensearch}
                    >
                        <TextField
                            hintText="Search"
                            name="q"
                            onChange={this.handleSearchChange.bind(this)}
                            floatingLabelText="Search"
                        />

                    </Dialog>
                </MuiThemeProvider>


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


                    {

                        Object.keys(bucket).map((key, value) => (

                            <div style={styles.card2} key={key}>
                                <MuiThemeProvider>

                                    <Card>

                                        <Link to={"bucketlist/" + bucket[key]['id']}><CardHeader
                                            title={bucket[key]['description']}
                                        /></Link>


                                        <CardText>
                                            {

                                            }
                                        </CardText>
                                        <FlatButton label="Edit" onClick={this.handleOpen.bind(this)}
                                                    data-id={bucket[key]['id']} data-desc={bucket[key]['description']}
                                                    primary={true}/>
                                        <FlatButton label="Delete" data-id={bucket[key]['id']} secondary={true}
                                                    onClick={this.handleDelete.bind(this)}/>
                                        <Link to={"bucketlist/" + bucket[key]['id'] + "/items"}><FlatButton
                                            label="View Items"/></Link>
                                    </Card>
                                </MuiThemeProvider>
                            </div>


                        ))


                    }

                    {this.button()}


                </div>

            </div>
        )
    }
}

export default Bucketlist;