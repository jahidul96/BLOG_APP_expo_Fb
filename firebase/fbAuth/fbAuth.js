import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";

export const fbUserRegister = (email, password) => {
  const promise = new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((info) => {
        resolve(info);
      })
      .catch((err) => {
        reject(err);
      });
  });

  return promise;
};

export const signinWithFb = (email, password) => {
  const promise = new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        resolve(user);
      })
      .catch((err) => {
        reject(err);
      });
  });

  return promise;
};
