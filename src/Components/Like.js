import React, { useState, useEffect } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getMetadata,
} from "firebase/storage";
import firebase from "firebase/compat/app";
import {
  doc,
  updateDoc,
  getDocs,
  getDoc,
  setDoc,
  collection,
  serverTimestamp,
  getFirestore,
} from "firebase/firestore";
import { db } from "../firebase";
function Like(props) {
  const [posts, setPosts] = useState([]);
  const usersss = JSON.parse(localStorage.getItem("usersss"));
  const [userData, setUser] = useState();

  console.log(props.s);
  useEffect(() => {
    let parr = [];
    let datafetch = async (x) => {
      const docRef = doc(db, "users", `${usersss.uid}`);
      const docSnap = await getDoc(docRef);
      setUser(docSnap.data());
      const querySnapshot = await getDocs(collection(db, "posts"));
      querySnapshot.forEach((doc) => {
        let data = { ...doc.data(), postId: doc.id };
        //   console.log(doc.data(), doc.id);
        parr.push(data);
      });
      setPosts([...parr]);
      if (parr.length > 0) {
        console.log("hi");
        let check = parr[x].likes.includes(docSnap.data().userId)
          ? true
          : false;
        setLike(check);
      }
    };
    datafetch(props.s);
  }, []);
  const [like, setLike] = useState(null);
  const handleLike = async () => {
    if (like) {
      setLike(false);
      console.log("elvd ", posts[props.s], userData);
      let narr = posts[props.s].likes.filter((el) => {
        return el != userData.userId;
      });
      const docRef = doc(db, "posts", `${posts[props.s].postId}`);
      const docSnap = await getDoc(docRef)
        .then(() => {
          console.log("successduuu");
        })
        .catch((e) => {
          console.log(e.message);
        });
      console.log("narr=>", narr);
      await updateDoc(docRef, {
        likes: narr,
      })
        .then(() => {
          console.log("success1");
        })
        .catch((e) => {
          console.log(e.message);
        });
    } else {
      setLike(true);
      console.log("el ", posts[props.s].likes);
      let narr = [...posts[props.s].likes, userData.userId];
      const docRef = doc(db, "posts", `${posts[props.s].postId}`);
      const docSnap = await getDoc(docRef);
      await updateDoc(docRef, {
        likes: narr,
      })
        .then(() => {
          console.log("success2");
        })
        .catch((e) => {
          console.log(e.message);
        });
    }
  };
  return (
    <div>
      {like != null ? (
        <>
          {like ? (
            <ThumbUpIcon className={`icon-styling like`} onClick={handleLike} />
          ) : (
            <ThumbUpIcon
              className={`icon-styling unlike`}
              onClick={handleLike}
            />
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Like;
