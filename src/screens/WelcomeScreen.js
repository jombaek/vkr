import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import { Button } from 'react-native-elements';

import AppButton from '../../components/AppButton';
import useStatusBar from '../../hooks/useStatusBar';
import Colors from '../res/colors';

export default function WelcomeScreen({ navigation }) {
  useStatusBar('light-content');

  return (
    <View style={styles.container}>
      <View style={styles.partnerButtonContainer}>
        <Button
          icon={
            <Octicons
              name="organization"
              size={30}
              color={Colors.secondary}
            />
          }
          type="clear"
          onPress={() => navigation.navigate('OrganizationLogin')}
        />
      </View>
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/flame.png')} style={styles.logo} />
        <Text style={styles.subtitle}>Шагомер</Text>
      </View>
      <View style={styles.buttonContainer}>
        <AppButton title="Войти" onPress={() => navigation.navigate('Login')} />
        <AppButton
          title="Регистрация"
          color="blue"
          onPress={() => navigation.navigate('Register')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: Colors.mediumGrey
  },
  logoContainer: {
    position: 'absolute',
    top: 60,
    alignItems: 'center'
  },
  partnerButtonContainer: {
    position: 'absolute',
    top: 60,
    right: 20
  },
  logo: {
    width: 125,
    height: 125
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '600',
    paddingVertical: 20,
    color: Colors.secondary
  },
  buttonContainer: {
    padding: 20,
    paddingBottom: 60,
    width: '100%'
  }
});
