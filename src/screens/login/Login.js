import React, { Component } from 'react';
import {
    View, 
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    Alert,
    Keyboard
} from 'react-native';

import styles from './styles';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.inputUsername = React.createRef();
        this.inputPassword = React.createRef();
    }

    onLogin = () => {
        const { username, password } = this.state;
        if (username.trim().length === 0) {
            Alert.alert(
                'Warning !',
                'Please enter username',
                [
                    {
                        text: 'Cancel',
                        onPress: () => { },
                        style: 'cancel',
                    }
                ]
            )
            this.inputUsername.current.focus();
            return;
        }
        if (password.trim().length === 0) {
            Alert.alert(
                'Warning !',
                'Please enter password',
                [
                    {
                        text: 'Cancel',
                        onPress: () => { },
                        style: 'cancel',
                    }
                ]
            )
            this.inputPassword.current.focus();
            return;
        }
        if (username === 'admin' && password === 'admin') {
            Keyboard.dismiss();
            this.props.loadingSpinner();
            let timeOutLogin = setTimeout(() => {
                this.props.closeSpinner();
                this.props.loginSuccess();
                clearTimeout(timeOutLogin);
            }, 2000);
        }
    }

    onChangeInput = (field) => (value) => {
        this.setState(previousState => {
            return {
                ...previousState,
                [field]: value
            };
        });
    }

    render() {
        const { username, password } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.boxTitle}>
                    <Text style={styles.title}>
                        Login to System
                    </Text>
                    <Text style={styles.subTitle}>
                        ( Demo Realm )
                    </Text>
                </View>
                <ScrollView style={[styles.formLogin, { marginBottom: 40 }]}>
                    <KeyboardAvoidingView behavior='position' style={styles.formLogin}>
                        <View style={styles.formItem}>
                            <TextInput ref={this.inputUsername} value={username} onChangeText={this.onChangeInput('username')} autoFocus={true} autoCapitalize='none' style={styles.formInput} placeholder='Username' 
                            placeholderTextColor='rgba(255, 255, 255, 0.5)' />
                        </View>
                        <View style={styles.formItem}>
                            <TextInput ref={this.inputPassword} value={password} onChangeText={this.onChangeInput('password')} autoCapitalize='none' secureTextEntry={true} style={styles.formInput} placeholder='Password' 
                            placeholderTextColor='rgba(255, 255, 255, 0.5)' />
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
                <View style={styles.formActions}>
                    <TouchableOpacity onPress={this.onLogin} style={styles.formButtonLogin}>
                        <Text style={styles.formButtonLoginText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default Login;