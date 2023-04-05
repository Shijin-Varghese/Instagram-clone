import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { Button, CardActionArea, CardActions } from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import LinearProgress from "@mui/material/LinearProgress";
import { v4 as uuidv4 } from "uuid";
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
  collection,
  serverTimestamp,
  getFirestore,
} from "firebase/firestore";
import { db } from "../firebase";
function UploadFile({ props }) {
  // const props =
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = async (file) => {
    const x = JSON.parse(localStorage.getItem("usersss"));
    setLoading(true);
    if (file == null) {
      setError("Please upload file");
      setTimeout(() => {
        setError("");
      }, 2000);
      setLoading(false);
      return;
    }
    if (file.size / (1024 * 1024) > 100) {
      setError("Please upload file with less than 100 mb");
      setTimeout(() => {
        setError("");
      }, 2000);
      setLoading(false);
      return;
    }

    let uid = uuidv4();
    const storage = getStorage();
    console.log(uid);
    const docRef = doc(db, "users", `${x.uid}`);
    const docSnap = await getDoc(docRef);
    console.log(docSnap.data().userId);
    const storageRef = ref(storage, `/posts/${uid}/${file.name}`);

    let uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        setError("something went wrong");
        setTimeout(() => {
          setError("");
        }, 2000);
        setLoading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
          let obj = {
            likes: [],
            comments: [],
            pId: uid,
            pUrl: url,
            uName: docSnap.data().fullname,
            uProfile: docSnap.data().profileUrl,
            userId: docSnap.data().userId,
            createdAt: serverTimestamp(),
          };
          console.log("Hi reached first step11");
          await setDoc(doc(collection(db, "posts")), {
            likes: [],
            comments: [],
            pId: uid,
            pUrl: url,
            uName: docSnap.data().fullname,
            uProfile: docSnap.data().profileUrl,
            userId: docSnap.data().userId,
            createdAt: serverTimestamp(),
          })
            .then(async (ref) => {
              console.log("Hi reached second step");
              //  const docRef = doc(db, "users", `${x.uid}`);
              await updateDoc(docRef, {
                postIds: [...docSnap.data().postIds, uid],
              });
            })
            .then(() => {
              console.log("Hi reached third step");
              setLoading(false);
            })
            .catch((err) => {
              console.log("errroror", err);
              setError(err.message);
              setTimeout(() => {
                setError("");
              });
              setLoading(false);
            });
        });
      }
    );
  };
  return (
    <div style={{ marginTop: "5rem", marginBottom: "1rem" }}>
      {error != "" ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <>
          <input
            type="file"
            accept="video/*"
            id="upload-input"
            style={{ display: "none" }}
            onChange={(e) => {
              handleChange(e.target.files[0]);
            }}
          ></input>
          <label htmlFor="upload-input">
            <Button
              component="span"
              color="secondary"
              variant="outlined"
              disabled={loading}
            >
              <MovieIcon />
              &nbsp;Upload File
            </Button>
          </label>
          {loading && <LinearProgress color="secondary" />}
        </>
      )}
    </div>
  );
}

export default UploadFile;
