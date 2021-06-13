import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Menu, { MenuItem } from 'react-native-material-menu';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button } from 'react-native-elements';
import { TextInput } from 'react-native-paper';

import { logout } from '../../components/Firebase/firebase';
import Colors from '../res/colors';

export default OrganizationScreen = () => {
    const [text, setText] = useState('');
    async function handleSignOut() {
        try {
            await logout();
        } catch (error) {
            console.log(error);
        }
    }

    const menu = useRef();
    const showMenu = () => menu.current.show();

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Menu
                ref={menu}
                button={
                    <Button
                        icon={
                            <Icon
                                name="settings"
                                size={30}
                                color={Colors.secondary}
                            />
                        }
                        type="clear"
                        onPress={showMenu}
                    />
                }
            >
                <MenuItem textStyle={{ color: Colors.secondary, fontSize: 16 }} onPress={handleSignOut}>Выйти</MenuItem>
            </Menu>
            <TextInput
                label="Введите код"
                value={text}
                onChangeText={text => setText(text)}
            />
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