import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../../redux/reducers';
import MainScreen from '../screens/Main';

const store = createStore(rootReducer, applyMiddleware(thunk))

const Stack = createStackNavigator();

export default function AppUserStack() {
  return (
    <Provider store={store}>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </Provider>
  );
}