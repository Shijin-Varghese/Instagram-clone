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
  return (
    <div>
      {empty ? (
        <div>
          <CircularProgress />
        </div>
      ) : (
        <>
          <Video />
        </>
      )}
    </div>
  );
}

export default Post;
