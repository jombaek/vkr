import * as firebase from 'firebase';
import 'firebase/auth';

import firebaseConfig from './firebaseConfig';

// Initialize Firebase App

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();

export const loginWithEmail = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

export const organizationLoginWithEmail = (email, password) => {
  firebase.firestore().collection("partners").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      if (doc.data().email === email)
        auth.signInWithEmailAndPassword(email, password);
    });
  });
}

export const checkIfPartner = (email) => {
  firebase.firestore().collection("partners").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log("DOC" + doc)
      if (doc.data().email === email) return true
    });
  });
  return false;
}

export const registerWithEmail = (email, password, name) => {
  auth.createUserWithEmailAndPassword(email, password)
    .then((result) => {
      firebase.firestore().collection("users")
        .doc(firebase.auth().currentUser.uid)
        .set({
          name,
          email
        })
      console.log(result)
    })
    .catch((error) => {
      console.log(error)
    })
};

export const profileUpdate = (name) => {
  return this.db
    .collection("users")
    .doc(this.auth.currentUser.uid)
    .set({
      name
    }, { merge: true })
    .catch((error) => console.error("Error: ", error));
};

export const addCode = (randomCode) => {
  firebase.firestore().collection("users")
    .doc(firebase.auth().currentUser.uid)
    .set({
      randomCode
    }, { merge: true })
};

export const getTotalCoins = () => {
  let a = firebase.firestore().collection("users")
    .doc(firebase.auth().currentUser.uid)
    .get().then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data().coins);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
};

export const setNewTotalCoins = () => {
  firebase.firestore().collection("users")
    .doc(firebase.auth().currentUser.uid)
    .update({
      coins: firebase.firestore.FieldValue.increment(1)
    });
};

export const logout = () => auth.signOut();

export const passwordReset = email => auth.sendPasswordResetEmail(email);