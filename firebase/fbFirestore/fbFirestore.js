import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  where,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { auth, db, storage } from "../firebase";

export const getCurrentUser = async () => {
  const userRef = doc(db, "Users", auth.currentUser.uid);
  const userSnap = await getDoc(userRef);
  let user;
  if (userSnap.exists()) {
    user = userSnap.data();
  } else {
    user = null;
  }
  return user;
};

export const addUserToFB = async (info, id) => {
  await setDoc(doc(db, "Users", id), info);
};

export const addBlogToFB = async (blog) => {
  await addDoc(collection(db, "Allblogs"), blog);
};

export const addProfilePic = async (url) => {
  await setDoc(
    doc(db, "Users", auth.currentUser.uid),
    { profileImg: url },
    { merge: true }
  );
};

export const getAllBlogs = (setAllBlogs) => {
  const cRef = collection(db, "Allblogs");
  const q = query(cRef, orderBy("createdAt", "desc"));
  onSnapshot(q, (querySnapshot) => {
    let blogs = [];
    querySnapshot.forEach((doc) => {
      let data = { value: doc.data(), id: doc.id };
      blogs.push(data);
    });
    setAllBlogs(blogs);
  });
};

export const getSingleBlog = (setSingleBlog, id) => {
  onSnapshot(doc(db, "Allblogs", id), (doc) => {
    setSingleBlog(doc.data());
  });
};

export const viewCounter = async (clickVal, id) => {
  await setDoc(doc(db, "Allblogs", id), { click: clickVal }, { merge: true });
};

export const likePost = async (liked, id) => {
  await updateDoc(doc(db, "Allblogs", id), { likes: liked }, { merge: true });
};

export const commentPost = async (userComment, id) => {
  await setDoc(
    doc(db, "Allblogs", id),
    { comments: userComment },
    { merge: true }
  );
};

export const uploadFileToStorage = (image) => {
  const promise = new Promise(async (resolve, reject) => {
    const imgFile = await (await fetch(image)).blob();
    const imagesRef = ref(storage, `profilePic/${imgFile._data.name}`);
    const uploadTask = uploadBytesResumable(imagesRef, imgFile);
    return uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });

  return promise;
};
