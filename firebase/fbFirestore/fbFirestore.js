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
export const getBlogWriterProfile = async (id, setBlogerProfile) => {
  onSnapshot(doc(db, "Users", id), (doc) => {
    setBlogerProfile(doc.data());
    // console.log("blogerData", doc.data());
  });
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

export const getTagMatchBlog = (setTagsMatchBlogs, tag) => {
  const cRef = collection(db, "Allblogs");
  const q = query(cRef, where("tags", "array-contains", tag));
  onSnapshot(q, (querySnapshot) => {
    let blogs = [];
    querySnapshot.forEach((doc) => {
      let data = { value: doc.data(), id: doc.id };
      blogs.push(data);
    });
    setTagsMatchBlogs(blogs);
  });
};

export const deleteFromFb = async (id, collectionname) => {
  await deleteDoc(doc(db, collectionname, id));
};

export const deleteGroupAllPost = async (id) => {
  const q = query(collection(db, "Allblogs"), where("myId", "==", id));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    deleteFromFb(doc.id, "Allblogs");
  });
};

export const getMyCategorieBlogs = (setMyCategorieBlogs, categorie) => {
  const cRef = collection(db, "Allblogs");
  const q = query(cRef, where("categorie", "==", categorie));
  onSnapshot(q, (querySnapshot) => {
    let blogs = [];
    querySnapshot.forEach((doc) => {
      let data = { value: doc.data(), id: doc.id };
      blogs.push(data);
    });
    setMyCategorieBlogs(blogs);
  });
};

export const getSingleBlog = (setSingleBlog, id) => {
  onSnapshot(doc(db, "Allblogs", id), (doc) => {
    setSingleBlog(doc.data());
  });
};

export const getMyBlogs = (setMyBlogs, id) => {
  const cRef = collection(db, "Allblogs");
  const q = query(cRef, where("myId", "==", id));
  onSnapshot(q, (querySnapshot) => {
    let blogs = [];
    querySnapshot.forEach((doc) => {
      let data = { value: doc.data(), id: doc.id };
      blogs.push(data);
    });
    setMyBlogs(blogs);
    // console.log(groups);
  });
};

export const FavoriteBlog = async (data) => {
  await addDoc(
    collection(db, "Favorite", auth.currentUser.uid, "MyFavorite"),
    data
  );
};

export const deleteFavoriteBlog = async (id) => {
  await deleteDoc(doc(db, "Favorite", auth.currentUser.uid, "MyFavorite", id));
};

export const getMYFavoritesBlog = (setAllFavorites) => {
  const cRef = collection(db, "Favorite", auth.currentUser.uid, "MyFavorite");
  const q = query(cRef, orderBy("createdAt", "desc"));
  onSnapshot(q, (querySnapshot) => {
    let blogs = [];
    querySnapshot.forEach((doc) => {
      let data = { value: doc.data(), id: doc.id };
      blogs.push(data);
    });
    setAllFavorites(blogs);
  });
};

export const viewCounter = async (clickVal, id) => {
  await setDoc(doc(db, "Allblogs", id), { click: clickVal }, { merge: true });
};

export const followUser = async (followed, id) => {
  await updateDoc(
    doc(db, "Users", id),
    { followers: followed },
    { merge: true }
  );
};
export const NotificationFunc = async (notifications, id) => {
  await updateDoc(
    doc(db, "Users", id),
    { notifications: notifications },
    { merge: true }
  );
};

export const NotifyChange = async (id, notifyBoolean) => {
  await setDoc(
    doc(db, "Users", id),
    { newNotification: notifyBoolean },
    { merge: true }
  );
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
