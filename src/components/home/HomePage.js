import React from 'react';
import imag from './../../intro.jpg';
import {Card, CardMedia, CardTitle, RaisedButton} from "material-ui";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class HomePage extends React.Component {
    links() {
        const token = window.sessionStorage.accessToken;
        if (!token) {
            return (
                <div>
                    <RaisedButton
                        href="/signup"
                        label="Sign up"
                        secondary={true}
                        style={{margin: 10}}
                    />
                    <RaisedButton
                        href="/login"
                        label="Sign in"
                        primary={true}
                        style={{margin: 10}}
                    />

                </div>
            );
        } else {
            return (
                <div>
                    <RaisedButton
                        href="/bucketlist"
                        label="View Bucketlist"
                        secondary={true}
                        style={{margin: 10}}
                    />

                </div>
            );
        }
    }

    render() {
        return (
            <div style={{
                textAlign: 'center',
                height: '45vw'
            }}>
                <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                    <Card>
                        <CardMedia
                            overlay={<div style={{margin: 100}}>

                                <h1><CardTitle style={{color: 'white'}} title="Bring your dreams closer to you"/></h1>
                                {this.links()}

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

export default HomePage;
