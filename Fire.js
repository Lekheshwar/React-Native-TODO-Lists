import firebase from "firebase";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAL65WaUBfUKvbzpC8tclPgheMnTg6-j8s",
  authDomain: "todoapp-6130f.firebaseapp.com",
  projectId: "todoapp-6130f",
  storageBucket: "todoapp-6130f.appspot.com",
  messagingSenderId: "1076214540680",
  appId: "1:1076214540680:web:9f974a750741d25a82f23d",
};

class Fire {
  constructor(callback) {
    this.inti(callback);
  }

  inti(callback) {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        callback(null, user);
      } else {
        firebase
          .auth()
          .signInAnonymously()
          .catch((error) => {
            callback(error);
          });
      }
    });
  }

  getLists(callback) {
    let ref = firebase
      .firestore()
      .collection("users")
      .doc(this.userID)
      .collection("lists");
    this.unsubscribe = ref.onSnapshot((snapShot) => {
      lists = [];

      snapShot.forEach((doc) => {
        lists.push({ id: doc, ...doc.data() });
      });
      callback(lists);
    });
  }
  get userID() {
    return firebase.auth().currentUser.uid;
  }

  detach() {
    this.unsubscribe();
  }
}

export default Fire;
