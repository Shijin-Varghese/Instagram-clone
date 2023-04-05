import React, { useState, useEffect } from "react";
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
import Avatar from "@mui/material/Avatar";
function Comments({ postData, ind }) {
  const [comments, setComments] = useState(null);
  const [posts, setPosts] = useState([]);
  console.log(postData, ind);
  useEffect(() => {
    let datafetch = async (x) => {
      let parr = [];

      const querySnapshot = await getDocs(collection(db, "posts"));
      querySnapshot.forEach((doc) => {
        let data = { ...doc.data(), postId: doc.id };
        console.log("dkdldjkkldjkdh", querySnapshot);
        parr.push(data);
      });

      setPosts(parr[ind]);
      console.log(parr, "sdfghkyh");
      console.log(parr[x].comments[0], "ssss");
      let arr = [];
      for (let i = 0; i < parr[x].comments.length; i++) {
        const docRef = doc(db, "comments", `${parr[x].comments[i]}`);
        const docSnap = await getDoc(docRef);
        let dataa = docSnap.data();
        //   // let data=
        console.log("dss", dataa, docSnap.data());
        arr.push(dataa);
      }
      setComments(arr);
    };

    datafetch(ind);
  }, []);
  return (
    <div>
      {comments == null ? (
        <div>No Comments</div>
      ) : (
        <>
          {comments.map((comm, ind) => {
            return (
              <div>
                <Avatar alt="avatar" src={comm.uProfileImage} />
                <p>
                  <span>{comm.uName}</span>&nbsp;&nbsp;{comm.text}
                </p>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

export default Comments;
