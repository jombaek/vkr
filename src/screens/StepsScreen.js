import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, FlatList, Button, TouchableOpacity } from 'react-native';
import { Pedometer } from 'expo-sensors';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { connect } from 'react-redux';
//Import moment for date and time
import moment from 'moment';

import { getTotalCoins, setNewTotalCoins } from '../../components/Firebase/firebase';
import Colors from '../res/colors';

function StepsScreen(props) {
    // const [isPedometerAvailable, setIsPedometerAvailable] = useState("checking");
    const { currentUser } = props;
    const [pastStepCount, setPastStepCount] = useState(0);
    const [count, setCount] = useState(4);
    const [crouchKey, setCrouchKey] = useState(false);
    const [validCoinsForToday, setValidCoinsForToday] = useState(1);

    const value = 0.66;
    const start = moment().startOf('day').toDate();
    
    let currentCoins;
    let totalCoins = 0;
    let newTotalCoins = 0;

    // var dateStart = moment().startOf('day').toDate();
    // var dateNow = moment();

    // if((new Date()-start) === 0){
    //     setValidCoinsForToday(100);
    //     console.log(validCoinsForToday);
    // }

    // console.log(moment().toDate());

    Pedometer.getStepCountAsync(start, moment().toDate()).then(
        (pastResult) => {
            setPastStepCount(pastResult.steps);
            if (!crouchKey) {
                setCrouchKey(true)
                setCount(Math.floor(pastStepCount / 100));
                console.log(31);
            }
        },
        (error) => {
            setPastStepCount("Could not get stepCount: " + error);
        }
    );

    useEffect(() => {
        _subscribe();
        return () => {
            _unsubscribe();
        };
    }, []);

    _subscribe = () => {
        _subscription = Pedometer.watchStepCount(() => {
            Pedometer.getStepCountAsync(start, moment().toDate()).then(
                (pastResult) => {
                    setPastStepCount(pastResult.steps);
                    console.log(pastStepCount);
                    setCount(Math.floor(pastStepCount / 100));
                },
                (error) => {
                    setPastStepCount("Could not get stepCount: " + error);
                }
            );
        });

    };

    _unsubscribe = () => {
        _subscription && _subscription.remove();
        _subscription = null;
    };

    currentCoins = Math.floor(pastStepCount / 100);

    return (
        <View style={{
            flex: 1,
            width: "100%",
        }}>
            <View style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
            }}>
                <AnimatedCircularProgress
                    size={205}
                    width={15}
                    fill={currentCoins}
                    rotation={0}
                    tintColor={Colors.primary}
                    backgroundColor="#3d5875">
                    {
                        (fill) => (
                            <Text style={{ color: Colors.black, fontSize: 36 }}>
                                {pastStepCount}
                            </Text>
                        )
                    }
                </AnimatedCircularProgress>
                <TouchableOpacity
                    onPress={() => {
                        setCount(count - 1);
                        setNewTotalCoins();
                        totalCoins = getTotalCoins();
                        // // newTotalCoins = setNewTotalCoins(totalCoins+1);
                        console.log(getTotalCoins());
                    }}
                    style={{
                        alignItems: 'center',
                        marginTop: 10
                    }}>
                    <Text style={{
                        fontSize: 24
                    }}>{count}</Text>
                    <MaterialCommunityIcons name="treasure-chest" size={72} color={Colors.primary} />
                </TouchableOpacity>
            </View>
            <View style={{
                marginBottom: 20,
                marginLeft: 20,
                flexDirection: 'row'
            }}>
                <FontAwesome5 name="coins" size={24} color={Colors.primary} />
                <Text style={{ color: Colors.black, fontSize: 24, marginLeft: 10 }}>
                    {newTotalCoins}
                </Text>
            </View>
        </View>
    )
}
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
export default connect(mapStateToProps, null)(StepsScreen);