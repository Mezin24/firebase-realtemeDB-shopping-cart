import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyBK9HOW75c1zaXHSZJ6PSOdg5I6L9F_7VM',
  authDomain: 'playground-df87c.firebaseapp.com',
  databaseURL:
    'https://playground-df87c-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'playground-df87c',
  storageBucket: 'playground-df87c.appspot.com',
  messagingSenderId: '834770286394',
  appId: '1:834770286394:web:dfcea54adf6cc8d70a8203',
};

export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
