import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// import { Provider } from 'react-redux'
// import { createStore, applyMiddleware } from 'redux'
// import thunk from 'redux-thunk'

// import rootReducer from '../../redux/reducers'
import OrganizationScreen from '../screens/OrganizationScreen';

// const store = createStore(rootReducer, applyMiddleware(thunk))

const Stack = createStackNavigator();

export default function AppPartnerStack() {
  return (
      <Stack.Navigator initialRouteName="Organization">
        <Stack.Screen name="Organization" component={OrganizationScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
  );
}