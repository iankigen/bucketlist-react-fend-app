import React, {PropTypes} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Nav from './common/Nav';

class App extends React.Component {
    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <Nav/>
                </MuiThemeProvider>
                {this.props.children}
            </div>
        );
    }
}


App.propTypes = {
    children: PropTypes.object.isRequired
};

export default App;
