import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button, CardActionArea, CardActions } from "@mui/material";
import UploadFile from "./UploadFile";
import Post from "./Post";
import Navbar from "./Navbar";
import { db } from "../firebase";
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
  setDoc,
  serverTimestamp,
  getFirestore,
} from "firebase/firestore";
import { createClient } from "pexels";
const _ = require("lodash");

function Feed() {
  const { logout } = useContext(AuthContext);
  const [userdata, setUserdata] = useState();

  const navigate = useNavigate();
  let empty = false;
  let x = localStorage.getItem("usersss");
  if (_.isEmpty(x)) empty = true;
  return (
    <>
      {empty ? (
        navigate("login")
      ) : (
        <>
          <Navbar></Navbar>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <UploadFile user={userdata}></UploadFile>
          </div>
          <div>
            <Post />
          </div>
        </>
      )}
    </>
  );
}

export default Feed;
