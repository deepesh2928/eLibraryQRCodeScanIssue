import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class TransactionScreen extends Component {
    constructor() {
        super();
        this.state = {
            domState: 'normal',
            hasCameraPermissions: null,
            scanned: false,
            scannedData: ''
        }
    }

    getCameraPermissions = async (domState) => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermissions: status === 'granted',
            domState: domState,
            scanned: false
        })
    }

    handleBarcodeSccaned=async({type,data})=>{
        this.setState({
            scannedData:data,
            domState:'normal',
            scanned:true
        })
    }
    // handleBarCodeScanned = async ({ type, data }) => {
    //     const { domState } = this.state;

    //     if (domState === "bookId") {
    //         this.setState({
    //             bookId: data,
    //             domState: "normal",
    //             scanned: true
    //         });
    //     } else if (domState === "studentId") {
    //         this.setState({
    //             studentId: data,
    //             domState: "normal",
    //             scanned: true
    //         });
    //     }
    // };

    render() {
        const { domState, hasCameraPermissions, scannedData, scanned } = this.state;
        if (domState == 'scanner') {
            return (
                <BarCodeScanner onBarcodeScanned={scanned ? undefined : this.handleBarcodeSccaned} style={StyleSheet.absoluteFillObject} />
            );
        }
        return (
            <View style={styles.container}>
                <Text>
                    {hasCameraPermissions ? scannedData : 'Allow Camera Permissions'}
                </Text>
                <TouchableOpacity style={styles.button} onPress={() => this.getCameraPermissions('scanner')}>
                    <Text style={styles.text}>
                        Scan QR Code
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#5653D4"
    },
    text: {
        color: "#ffff",
        fontSize: 30
    },
    button: {
        width: '55%',
        height: 55,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#f48d20',
        borderRadius: 15
    }
});