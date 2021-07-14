import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import UserAvatar from 'react-native-user-avatar';

import useStatusBar from '../../hooks/useStatusBar';
import Colors from '../res/colors';

const getFirstLetter = (text) => {
    return text.split(' ').map((w) => w ? w.substring(0,1).toUpperCase() : w).join('');
}

function ProfileScreen(props) {
    useStatusBar('dark-content');

    const { currentUser } = props;

    return (
        <View style={styles.container}>
            <UserAvatar size={100} name={getFirstLetter(currentUser.name)} bgColor={Colors.secondary} />
            <View style={styles.containerInfo}>
                <Text style={{ fontSize: 24, color: Colors.black }}>{currentUser.name}</Text>
                <Text style={{ fontSize: 24, color: Colors.black }}>{currentUser.email}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        marginTop: 100
    },
    containerInfo: {
        alignItems: 'center',
        margin: 30
    },
})

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
export default connect(mapStateToProps, null)(ProfileScreen);