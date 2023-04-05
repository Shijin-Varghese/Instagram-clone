import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
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
  getDoc,
  getDocs,
  setDoc,
  collection,
  serverTimestamp,
  getFirestore,
} from "firebase/firestore";
import { db } from "../firebase";
import { v4 as uuidv4 } from "uuid";
function AddComment(props) {
  const usersss = JSON.parse(localStorage.getItem("usersss"));
  const [userData, setUser] = useState();
  const [postData, setPosts] = useState([]);
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
      setPosts(parr[props.s]);
    };

    datafetch();
  }, []);
  const [text, setText] = useState();
  const handleClick = async () => {
    console.log(postData);
    let uid = uuidv4();
    let obj = {
      text: text,
      uProfileImage: userData.profileUrl,
      uName: userData.fullname,
    };
    const docRef = doc(db, "posts", `${postData.postId}`);
    const docSnap = await getDoc(docRef);
    await setDoc(doc(db, "comments", `${uid}`), {
      text: text,
      uProfileImage: userData.profileUrl,
      uName: userData.fullname,
    })
      .then(async (ref) => {
        console.log("Hi reached second step");
        console.log(ref);
        await updateDoc(docRef, {
          comments: [...postData.comments, uid],
        });
      })
      .then(() => {
        console.log("Hi reached third step");
        setText("");
      })
      .catch((err) => {
        console.log("errroror", err);
      });
  };
  return (
    <div>
      <TextField
        id="outlined-basic"
        label="Comment"
        variant="outlined"
        size="small"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button variant="contained" onClick={handleClick}>
        Post
      </Button>
    </div>
  );
}

export default AddComment;
