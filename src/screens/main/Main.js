import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Image,
    Alert
} from 'react-native';

import { getListProduct, deleteProduct } from '../../db/dbRealm';

import styles from './styles';

import UpdateProduct from '../../components/product/updateProduct/UpdateProduct';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUpdateProduct: false,
            productEditId: '',
            products: []
        }
    }

    componentDidMount() {
        this.props.loadingSpinner();
        let timeOutGetListProduct = setTimeout(() => {
            getListProduct().then(products => {
                this.setState(previousState => {
                    return {
                        ...previousState,
                        products
                    }
                });
            }).catch(err => {
                console.log(err);
            });
            this.props.closeSpinner();
            clearTimeout(timeOutGetListProduct);
        }, 1000);
    }

    onLogOut = () => {
        this.props.logOut();
    }

    onCancelModalAddProduct = () => {
        this.setState(previousState => {
            return {
                ...previousState,
                isUpdateProduct: false,
                productEditId: ''
            }
        });
    }

    onOpenModalAddProduct = () => {
        this.setState(previousState => {
            return {
                ...previousState,
                isUpdateProduct: true,
                productEditId: ''
            }
        });
    }

    onUpdate = (id) => () => {
        this.setState(previousState => {
            return {
                ...previousState,
                isUpdateProduct: true,
                productEditId: id
            }
        });
    }

    onDelete = (id) => () => {
        Alert.alert(
            'Comfirm',
            'Are you sure want to delete the selected line ?',
            [
                {
                    text: 'Cancel',
                    onPress: () => { },
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: () => {
                        deleteProduct(id).then(() => {
                            Alert.alert(
                                'Information',
                                'Delete successfully',
                                [
                                    {
                                        text: 'Cancel',
                                        onPress: () => { },
                                        style: 'cancel',
                                    }
                                ]
                            );
                        }).catch(err => {
                            console.log(err);
                        });
                    },
                    style: 'default'
                }
            ]
        )
    }

    render() {
        const { products, isUpdateProduct, productEditId } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerLeft}></View>
                    <View style={styles.headerCenter}>
                        <Text style={styles.title}>System</Text>
                        <Text style={styles.subTitle}>( Demo Realm )</Text>
                    </View>
                    <View style={styles.headerRight}>
                        <TouchableOpacity onPress={this.onLogOut}>
                            <Text style={styles.logOutText}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.body}>
                    <FlatList
                        data={products}
                        renderItem={({ item }) => {
                            return (
                                <View style={{
                                    marginBottom: 10,
                                    height: 250,
                                    borderBottomWidth: 1,
                                    borderBottomColor: 'rgba(0, 0, 0, 0.5)'
                                }}>
                                    <Image style={{
                                        flex: 0.8
                                    }} source={{
                                        uri: item.image
                                    }} />
                                    <View style={{
                                        flex: 0.2,
                                        flexDirection: 'row',
                                        justifyContent: 'space-around',
                                        alignItems: 'center'
                                    }}>
                                        <Text style={{
                                            fontSize: 16,
                                            fontWeight: 'bold',
                                            color: '#fff',
                                            backgroundColor: '#0c2461',
                                            paddingHorizontal: 9,
                                            paddingVertical: 3,
                                            borderRadius: 3
                                        }}>{item.title}</Text>
                                        <Text style={{
                                            fontSize: 14,
                                            fontStyle: 'italic',
                                            color: '#b33939'
                                        }}>{item.price.toFixed(2)} đ</Text>
                                    </View>
                                    <View style={{
                                        flex: 0.2,
                                        flexDirection: 'row',
                                        justifyContent: 'flex-end',
                                        alignItems: 'center'
                                    }}>
                                        <TouchableOpacity onPress={this.onUpdate(item.id)} style={{
                                            backgroundColor: '#74b9ff',
                                            paddingHorizontal: 10,
                                            paddingVertical: 5,
                                            borderRadius: 3,
                                            marginRight: 10
                                        }}>
                                            <Text>Edit</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={this.onDelete(item.id)} style={{
                                            backgroundColor: '#b33939',
                                            paddingHorizontal: 15,
                                            paddingVertical: 5,
                                            borderRadius: 3
                                        }}>
                                            <Text style={{
                                                color: '#fff'
                                            }}>Delete</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        }}
                        keyExtractor={item => item.id}
                    />
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity onPress={this.onOpenModalAddProduct} style={styles.buttonAdd}>
                        <Text style={styles.buttonAddText}>Add</Text>
                    </TouchableOpacity>
                </View>
                {isUpdateProduct && <UpdateProduct productEditId={productEditId} onCancel={this.onCancelModalAddProduct} />}
            </View>
        )
    }
}

export default Main;