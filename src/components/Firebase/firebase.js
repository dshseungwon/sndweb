import app from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/storage";

let config = {
  apiKey: "AIzaSyAwgy6w7sQIJeRSMlwZ9THhJpcYUhlSYiI",
  authDomain: "snd-session.firebaseapp.com",
  databaseURL: "https://snd-session.firebaseio.com",
  projectId: "snd-session",
  storageBucket: "snd-session.appspot.com",
  messagingSenderId: "738261258727",
  appId: "1:738261258727:web:9e0b91e57804dc37af2d42",
  measurementId: "G-PFRYKHNVBQ"
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.firestore();
    this.storage = app.storage();
    this.FieldValue = app.firestore.FieldValue;
  }

  // Auth API

  doCreateUserWithEmailAndPassword = (email, password) => 
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) => 
    this.auth.signInWithEmailAndPassword(email, password);
  
  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  // User API
  user = uid => this.db.collection('users').doc(uid);
  users = () => this.db.collection('users');

  doRecordUser = (authUser, email, password, name) => 
    this.user(authUser.user.uid)
        .set({
          email,
          password,
          name,
        })
        .then(()=>{
          console.log('New user added to database!');
        })
        .catch((error)=>{
          console.log(error);
        });

  getUserInfo = (authUser) => new Promise((resolve, reject) => {
    this.user(authUser.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          resolve(doc.data())
        } else {
            // doc.data() will be undefined in this case
          console.log("No such document!");
          reject();
        }
      })
      .catch((error) => {
        console.log(error);
        reject();
      });
  });
    

}

export default Firebase;
