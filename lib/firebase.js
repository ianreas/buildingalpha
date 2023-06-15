// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYcfd5BOzP06TKVkZCoqi4UMDwq_dadkU",
  authDomain: "buildingalpha-8ea98.firebaseapp.com",
  projectId: "buildingalpha-8ea98",
  storageBucket: "buildingalpha-8ea98.appspot.com",
  messagingSenderId: "1079992000008",
  appId: "1:1079992000008:web:658b7dea23a6a8d72bbbbd",
  measurementId: "G-S48FCRVGGK"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

export const auth = getAuth(app)

export async function queryAI(prompt){
    const ref = await admin
                .firestore()
                .collection('text_document')
                .add({
                    prompt: prompt,
                })

    ref.onSnapshot(snap => {
        if (snap.get('response')) console.log(
            'RESPONSE:' + 
            snap.get('response')
        )
    })

}