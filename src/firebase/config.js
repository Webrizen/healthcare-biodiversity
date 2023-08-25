// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAxiBrtzp8f1dnk_zOXUTickFOmAPkzCEU",
    authDomain: "healthcare-biodiversity.firebaseapp.com",
    databaseURL: "https://healthcare-biodiversity-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "healthcare-biodiversity",
    storageBucket: "healthcare-biodiversity.appspot.com",
    messagingSenderId: "1013153530816",
    appId: "1:1013153530816:web:b7cf98a33980b1004dfe25",
    measurementId: "G-V9ERT6SV3Q"
};

// Initialize Firebase
let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default firebase_app;