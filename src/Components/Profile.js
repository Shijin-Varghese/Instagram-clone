import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getMetadata,
} from "firebase/storage";
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
import Navbar from "./Navbar";
import Typography from "@mui/material/Typography";
import "./Profile.css";
import Video1 from "./Video1";
const _ = require("lodash");
function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  let empty = false;
  const usersss = JSON.parse(localStorage.getItem("usersss"));
  // const fin = JSON.parse(us);
  if (_.isEmpty(usersss)) empty = true;
  const [userData, setUserData] = useState(null);
  const [posts, setPost] = useState(null);
  const us = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    let datafetch = async (x) => {
      const docRef = doc(db, "users", `${usersss.uid}`);
      const docSnap = await getDoc(docRef);
      console.log(docSnap);
      console.log(docSnap.data(), "user");
      // localStorage.setItem("user", docSnap.data());
      // console.log(
      //   JSON.parse(localStorage.getItem("user")),
      //   "jasdgjfgsdaj"
      // );
      setUserData(docSnap.data());
      // if (userData != null) {
      let parr = [];
      if (us != null) {
        for (let i = 0; i < us.postIds.length; i++) {
          const querySnapshot = await getDocs(collection(db, "posts"));
          querySnapshot.forEach((doc) => {
            if (doc.data().userId === us.postIds[i]) {
              parr.push(doc.data());
            }
          });
        }
      }
      console.log(parr, "parr");
      setPost(parr);
      // }
    };
    datafetch();
  }, []);

  return (
    <>
      {empty ? (
        navigate("/login")
      ) : (
        <>
          {posts == null || userData == null ? (
            <>Loading...</>
          ) : (
            <>
              <Navbar></Navbar>
              <div className="spacer"></div>
              <div className="container">
                <div className="upper-part">
                  <div className="profile-img">
                    <img src={userData.profileUrl}></img>
                  </div>
                  <div className="info">
                    <Typography variant="h2">Email:{userData.email}</Typography>
                    <Typography variant="h4">
                      Posts:{userData.postIds.length}
                    </Typography>
                  </div>
                </div>
                <hr style={{ marginTop: "1rem", marginBottom: "3rem" }}></hr>
                <div className="profile-videos">
                  {/* {posts.length == 0 || empty ? (
        <CircularProgress />
      ) : ( */}
                  <>
                    <Video1 />
                  </>
                  {/* )} */}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

export default Profile;
