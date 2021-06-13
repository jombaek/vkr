import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Pressable, TouchableOpacity, ImageBackground } from 'react-native';
import { connect } from 'react-redux';

import { addCode } from '../../components/Firebase/firebase';
import Colors from '../res/colors';

export default function PartnersScreen() {
    const [generateRandomNumber, setGenerateRandomNumber] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
                onShow={() => {
                    addCode(generateRandomNumber);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{generateRandomNumber}</Text>
                        <Pressable
                            style={[styles.button]}
                            onPress={() => {
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <Text style={styles.textStyle}>OK</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <View style={styles.partnersContainer}>
                <TouchableOpacity
                    style={[styles.container]}
                    onPress={() => {
                        setModalVisible(true);
                        setGenerateRandomNumber(Math.floor(100000 + Math.random() * 900000));
                    }}
                >
                    <ImageBackground
                        style={styles.backgroundImage}
                        imageStyle={{
                            borderRadius: 20,
                            backgroundColor: Colors.secondary
                        }}
                        source={require("../../assets/Anel.png")}
                    >
                        <View style={styles.centeredView}>
                            <Text
                                style={{ color: Colors.black, fontSize: 32, fontWeight: "bold" }}>
                                Анель
                            </Text>
                            <Text
                                style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>
                                Магазин женской одежды
                            </Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: Colors.secondary
    },
    textStyle: {
        color: Colors.white,
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        fontSize: 32,
        textAlign: "center"
    },
    container: {
        height: 400,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        padding: 10
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        width: '100%'
    },
    partnersContainer: {
        flex: 1,
        alignItems: "center",
        width: "100%",
        padding: 15
    }
})