import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { query, where, orderBy } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getMetadata,
} from "firebase/storage";
import firebase from "firebase/compat/app";
import {
  onSnapshot,
  collection,
  doc,
  updateDoc,
  getDocs,
  setDoc,
  serverTimestamp,
  getFirestore,
} from "firebase/firestore";
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from "@mui/material/Avatar";
import Video from "./Video";
import Like from "./Like";
// import "./Post.css";
const _ = require("lodash");

function Post() {
  const [posts, setPosts] = useState([]);
  const user = JSON.parse(localStorage.getItem("usersss"));
  let empty = false;
  if (_.isEmpty(user)) empty = true;

  // useEffect(() => {
  //   let parr = [];
  //   let datafetch = async () => {
  //     const querySnapshot = await getDocs(collection(db, "posts"));
  //     console.log(querySnapshot);
  //     querySnapshot.forEach((doc) => {
  //       let data = { ...doc.data(), postId: doc.id };
  //       //   console.log(doc.data(), doc.id);
  //       parr.push(data);
  //     });

  //     setPosts([...parr]);
  //     console.log(posts);
  //   };
  //   datafetch();

  //   // let parr = [];
  //   // const docRef = doc(db, "posts");
  //   // const q = query(docRef, orderBy("createdAt", "desc")).onSnapshot(
  //   //   (querysnapshot) => {
  //   //     parr = [];
  //   //     querysnapshot.forEach((doc) => {
  //   //       let data = { ...doc.data(), postId: doc.id };
  //   //       parr.push(data);
  //   //     });
  //   //     setPosts(parr);
  //   //   }
  //   // );
  //   // return q();
  // }, []);
  return (
    <div>
      {/* {posts.length == 0 || empty ? (
        <CircularProgress />
      ) : ( */}
      <>
        <Video />
      </>
      {/* )} */}
    </div>
  );
}

export default Post;
