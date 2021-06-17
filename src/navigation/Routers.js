import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { auth } from '../../components/Firebase/firebase';
import navigationTheme from './navigationTheme';
import AuthStack from './AuthStack';
import AppUserStack from './AppUserStack';
import { AuthUserContext } from './AuthUserProvider';
import Spinner from '../../components/Spinner';

export default function Routers() {
  const { user, setUser } = useContext(AuthUserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuth = auth.onAuthStateChanged(async authUser => {
      try {
        await (authUser ? setUser(authUser) : setUser(null));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    });

    // unsubscribe auth listener on unmount
    return unsubscribeAuth;
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <NavigationContainer theme={navigationTheme}>
      {user ? <AppUserStack /> : <AuthStack />}
    </NavigationContainer>
  );
}