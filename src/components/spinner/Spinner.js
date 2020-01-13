import React, { Component } from 'react';
import { 
    View,
    Animated,
    Easing 
} from 'react-native';

import styles from './styles';

class Spinner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fadeAnim: new Animated.Value(0)
        };
    }

    componentDidMount() {
        Animated.loop(
            Animated.timing(
                this.state.fadeAnim,
                {
                    toValue: 1,
                    duration: 5000,
                    easing: Easing.linear
                }
            )
        ).start();
    }

    render() {
        return (
            <View style={styles.container}>
                <Animated.View style={[styles.spinner, {
                    transform: [
                        {
                            rotate: this.state.fadeAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 45]
                            })
                        }
                    ],
                    borderColor: this.props.color || '#000'
                }]}></Animated.View>
            </View>
        );
    };
};

export default Spinner;