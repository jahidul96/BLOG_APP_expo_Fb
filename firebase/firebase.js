import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAKJQjrXitEk4itJIbqTvpf3nKmATS5FHw",
  authDomain: "blog-rn12.firebaseapp.com",
  projectId: "blog-rn12",
  storageBucket: "blog-rn12.appspot.com",
  messagingSenderId: "994400930478",
  appId: "1:994400930478:web:b2e3f72090ff758351fb3f",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
export const storage = getStorage(app);
