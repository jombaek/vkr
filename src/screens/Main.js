import React, { Component, useRef } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Menu, { MenuItem } from 'react-native-material-menu';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button } from 'react-native-elements';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchUser, clearData } from '../../redux/actions/index';
import { logout } from '../../components/Firebase/firebase';
import StepsScreen from './StepsScreen';
import PartnersScreen from './PartnersScreen';
import ProfileScreen from './ProfileScreen';
import Colors from '../res/colors';

const Tab = createBottomTabNavigator();

const StepsStack = createStackNavigator();
const StepsStackScreen = () => {
    return (
        <StepsStack.Navigator>
            <StepsStack.Screen
                name="Steps"
                component={StepsScreen}
                options={{
                    headerTitleAlign: 'center',
                    title: 'Шаги',
                    headerTintColor: Colors.secondary,
                    headerTitleStyle: {
                        fontSize: 28,
                    }
                }}
            />
        </StepsStack.Navigator>
    )
}

const PartnersStack = createStackNavigator();
const PartnersStackScreen = () => {
    return (
        <PartnersStack.Navigator>
            <PartnersStack.Screen
                name="Partners"
                component={PartnersScreen}
                options={{
                    headerTitleAlign: 'center',
                    title: 'Партнеры',
                    headerTintColor: Colors.secondary,
                    headerTitleStyle: {
                        fontSize: 28,
                    }
                }}
            />
        </PartnersStack.Navigator>
    )
}

const ProfileStack = createStackNavigator();
const ProfileStackScreen = () => {
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
        <ProfileStack.Navigator>
            <ProfileStack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    headerTitleAlign: 'center',
                    title: 'Профиль',
                    headerTintColor: Colors.secondary,
                    headerTitleStyle: {
                        fontSize: 28,
                    },
                    headerRight: () => (
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
                            <MenuItem textStyle={{color: Colors.secondary, fontSize: 16}} onPress={handleSignOut}>Выйти</MenuItem>
                        </Menu>
                    ),
                }}
            >
            </ProfileStack.Screen>
        </ProfileStack.Navigator>
    )
}

export class Main extends Component {
    componentDidMount() {
        this.props.clearData();
        this.props.fetchUser();
    }
    render() {
        return (
            <Tab.Navigator
                tabBarOptions={{
                    style: {
                        height: 80
                    },
                    labelStyle: {
                        fontSize: 12
                    }
                }}
                initialRouteName="Steps"
            >
                <Tab.Screen name="Steps" component={StepsStackScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="directions-run" color={color} size={30} />
                        ),
                        tabBarLabel: 'Шаги',
                    }} />
                <Tab.Screen name="Partners" component={PartnersStackScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="redeem" color={color} size={30} />
                        ),
                        tabBarLabel: 'Партнеры',
                    }} />
                <Tab.Screen name="Profile" component={ProfileStackScreen}
                    listeners={({ navigation }) => ({
                        tabPress: event => {
                            event.preventDefault();
                            navigation.navigate("Profile", { uid: firebase.auth().currentUser.uid })
                        }
                    })}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="account-circle" color={color} size={30} />
                        ),
                        tabBarLabel: 'Профиль',
                    }} />
            </Tab.Navigator>
        )
    }
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUser, clearData }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);