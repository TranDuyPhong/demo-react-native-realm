import React, { Component } from 'react';

import LoginScreen from './src/screens/login/Login';
import MainScreen from './src/screens/main/Main';

import Spinner from './src/components/spinner/Spinner';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticate: true,
            isLoading: false
        };
    }

    loginSuccess = () => {
        this.setState(previousState => {
            return {
                ...previousState,
                isAuthenticate: true
            };
        });
    }

    loadingSpinner = () => {
        this.setState(previousState => {
            return {
                ...previousState,
                isLoading: true
            };
        });
    }

    closeSpinner = () => {
        this.setState(previousState => {
            return {
                ...previousState,
                isLoading: false
            };
        });
    }

    logOut = () => {
        this.setState(previousState => {
            return {
                ...previousState,
                isAuthenticate: false
            };
        });
    }

    render() {
        const { isAuthenticate, isLoading } = this.state;
        return (
            <React.Fragment>
                {isAuthenticate ? <MainScreen closeSpinner={this.closeSpinner} loadingSpinner={this.loadingSpinner} logOut={this.logOut} /> : <LoginScreen loadingSpinner={this.loadingSpinner} closeSpinner={this.closeSpinner} loginSuccess={this.loginSuccess} />}
                {isLoading && <Spinner color={!isAuthenticate && '#fff'} />}
            </React.Fragment>
        );
    };
};

export default App;