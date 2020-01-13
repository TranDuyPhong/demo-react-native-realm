import React, { Component } from 'react';
import { 
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Image,
    Alert 
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
const uuid = require('uuid/v1');

import styles from './styles';

import { addProduct, getOneProduct, editProduct } from '../../../db/dbRealm';

const optionImagePickers = {
    title: 'Select Image Product',
    storageOptions: {
        skipBackup: true,
        path: 'images'
    },
};

class UpdateProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            price: '',
            image: ''
        };
        this.inputTitle = React.createRef();
        this.inputPrice = React.createRef();
    }

    componentDidMount() {
        const { productEditId: id } = this.props;
        if (id) {
            getOneProduct(id).then(({ title, price, image }) => {
                this.setState(previousState => {
                    return {
                        ...previousState,
                        title, 
                        price: price.toString(), 
                        image
                    }
                });
            }).catch(err => {
                console.log(err);
            });
        }
        this.inputTitle.current.focus();
    }

    onChooseImage = () => {
        ImagePicker.showImagePicker(optionImagePickers, (res) => {
            if (!res.didCancel && !res.error && !res.customButton) {
                this.setState(previousState => {
                    return {
                        ...previousState,
                        image: `data:image/jpeg;base64,${res.data}`
                    }
                });
            }
        });
    }

    onChangeInput = (field) => (value) => {
        this.setState(previousState => {
            return {
                ...previousState,
                [field]: value
            }
        });
    }

    onCancel = () => {
        this.props.onCancel();
    }

    onSubmit = () => {
        const { title, price, image } = this.state;
        const { productEditId : id } = this.props;
        if (title.trim().length === 0) {
            Alert.alert(
                'Warning !',
                'Please enter title',
                [
                    {
                        text: 'Cancel',
                        onPress: () => { },
                        style: 'cancel',
                    }
                ]
            )
            this.inputTitle.current.focus();
            return;
        }
        if (price.trim().length === 0) {
            Alert.alert(
                'Warning !',
                'Please enter price',
                [
                    {
                        text: 'Cancel',
                        onPress: () => { },
                        style: 'cancel',
                    }
                ]
            )
            this.inputPrice.current.focus();
            return;
        }
        if (image.trim().length === 0) {
            Alert.alert(
                'Warning !',
                'Please choose image',
                [
                    {
                        text: 'Cancel',
                        onPress: () => { },
                        style: 'cancel',
                    }
                ]
            )
            return;
        }
        if (id) {
            editProduct({
                id,
                title,
                price: parseFloat(price),
                image,
                modifiedDate: new Date(),
                modifiedBy: 'admin'
            }).then((res) => {
                Alert.alert(
                    'Information !',
                    'Edit product successfully',
                    [
                        {
                            text: 'OK',
                            onPress: () => this.onCancel(),
                            style: 'default',
                        }
                    ]
                )
            }).catch((err) => {
                console.log(err);
            });
        } else {
            addProduct({
                id: uuid(),
                title,
                price: parseFloat(price),
                image,
                createdDate: new Date(),
                createdBy: 'admin',
                modifiedDate: null,
                modifiedBy: ''
            }).then((res) => {
                Alert.alert(
                    'Information !',
                    'Add product successfully',
                    [
                        {
                            text: 'OK',
                            onPress: () => this.onCancel(),
                            style: 'default',
                        }
                    ]
                )
            }).catch((err) => {
                console.log(err);
            });
        }
    }

    render() {
        const { title, price, image } = this.state;
        const { productEditId: id } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.formAdd}>
                    <Text style={styles.title}>{id ? 'Edit' : 'Add'} Product</Text>
                    <ScrollView>
                        <View style={styles.formAddItem}>
                            <Text style={styles.label}>Title</Text>
                            <TextInput ref={this.inputTitle} onChangeText={this.onChangeInput('title')} value={title} style={styles.input} />
                        </View>
                        <View style={styles.formAddItem}>
                            <Text style={styles.label}>Price</Text>
                            <TextInput ref={this.inputPrice} onChangeText={this.onChangeInput('price')} value={price} keyboardType={'numeric'} style={styles.input} />
                        </View>
                        <View style={styles.formAddItem}>
                            <Text style={styles.label}>Image</Text>
                            <TouchableOpacity onPress={this.onChooseImage} style={styles.buttonChooseImage}>
                                <Text style={styles.buttonChooseImageText}>Choose a image</Text>
                            </TouchableOpacity>
                            {image ? <Image style={styles.imageProduct} source={{
                                uri: image
                            }} /> : null}
                        </View>
                        <View style={styles.formAction}>
                            <TouchableOpacity onPress={this.onSubmit} style={styles.formActionButtonAccept}>
                                <Text style={styles.formActionButtonAcceptText}>Accept</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.onCancel} style={styles.formActionButtonCancel}>
                                <Text style={styles.formActionButtonCancelText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    };
};

export default UpdateProduct;