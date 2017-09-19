import React from 'react';
import AppBar from 'material-ui/AppBar';
import {Drawer, MenuItem} from "material-ui";
import {Link} from "react-router";
import SvgIcon from 'material-ui/SvgIcon';


class Nav extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            opens: false,
        };
    }

    handleToggle = () => this.setState({open: !this.state.open});

    menu(style) {
        const token = window.sessionStorage.accessToken;
        if (token) {
            return (
                <div>
                    <Link to="/bucketlist" style={style}><MenuItem primaryText="BUCKET LIST"
                                                                   onClick={this.handleToggle}/></Link>
                    <Link to="/logout" style={style}><MenuItem onClick={this.handleToggle} primaryText="LOGOUT"/></Link>
                </div>
            );
        } else {
            return (
                <div>
                    <Link to="/login" style={style}><MenuItem primaryText="LOGIN" onClick={this.handleToggle}/></Link>
                    <Link to="/signup" style={style}><MenuItem primaryText="SIGN UP"
                                                               onClick={this.handleToggle}/></Link>
                </div>
            )
        }
    }


    render() {

        const style = {textDecoration: 'none'};

        const HomeIcon = (props) => (
            <SvgIcon {...props}>
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </SvgIcon>
        );

        return (
            <div>
                <Drawer width={200} open={this.state.open}>

                    <AppBar title="MENU" onClick={this.handleToggle}/>
                    <Link to="/" style={style}><MenuItem leftIcon={<HomeIcon/>} onClick={this.handleToggle}/></Link>
                    {this.menu(style)}
                </Drawer>
                <AppBar
                    title="Bucketlist"
                    onClick={this.handleToggle}
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                />
            </div>
        );
    }
}

export default Nav;
