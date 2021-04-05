import firebase from 'firebase/app';
import '@firebase/firestore';

const config = {
  apiKey: 'AIzaSyDNw-lxrkDg_8arrxISsUr3efKqyM_cOuE',
  authDomain: 'todoapp-f8541.firebaseapp.com',
  projectId: 'todoapp-f8541',
  storageBucket: 'todoapp-f8541.appspot.com',
  messagingSenderId: '758572140030',
  appId: '1:758572140030:web:18a9ba8c8440b865ff6caf',
};
firebase.initializeApp(config);
const db = firebase.firestore();
export { db };
