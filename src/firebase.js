import app from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBkP4aYMDahzuECIWfC59N2fznxbf92Dys",
    authDomain: "triiclientem.firebaseapp.com",
    databaseURL: "https://triiclientem.firebaseio.com/",
    projectId: "triiclientem",
    storageBucket: "triiclientem.appspot.com",
    messagingSenderId: "526988685659",
    appId: "1:526988685659:web:3154c98cf7b8191c51ea7e"
};

app.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = app.auth();

export {auth, db}