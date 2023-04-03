import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./Video.css";
import Like from "./Like";
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
  getDoc,
  getDocs,
  setDoc,
  serverTimestamp,
  getFirestore,
} from "firebase/firestore";
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from "@mui/material/Avatar";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
function Video() {
  const [posts, setPosts] = useState([]);
  const usersss = JSON.parse(localStorage.getItem("usersss"));
  const [user, setUser] = useState();
  const [open, setOpen] = useState(null);

  const handleClickOpen = (id) => {
    setOpen(id);
  };

  const handleClose = () => {
    setOpen(null);
  };
  useEffect(() => {
    let parr = [];
    let datafetch = async () => {
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
    };
    datafetch();

    // let parr = [];
    // const docRef = doc(db, "posts");
    // const q = query(docRef, orderBy("createdAt", "desc")).onSnapshot(
    //   (querysnapshot) => {
    //     parr = [];
    //     querysnapshot.forEach((doc) => {
    //       let data = { ...doc.data(), postId: doc.id };
    //       parr.push(data);
    //     });
    //     setPosts(parr);
    //   }
    // );
    // return q();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    e.target.muted = !e.target.muted;
  };
  const handleScroll = (e) => {
    let next = ReactDOM.findDOMNode(e.target).parentNode.nextSibling;
    if (next) {
      next.scrollIntoView();
      e.target.muted = true;
    }
  };
  // console.log(posts[0].pUrl, "sssasssas");
  return (
    <>
      <div className="video-container">
        {posts.map((post, index) => {
          return (
            <div key={index} className="videos1">
              <div className="videos">
                <video className="videos-styling" muted="muted">
                  <source
                    onClick={handleClick}
                    onEnded={handleScroll}
                    src={
                      posts[index].pUrl
                        ? posts[index].pUrl
                        : "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
                    }
                    // type="video/mp4"
                  />
                </video>
                <div className="fa" style={{ display: "flex" }}>
                  <Avatar alt="avatar" src={user.profileUrl} />
                  <h4>{user.fullname}</h4>
                </div>
                <Like s={index}></Like>
                <ChatBubbleIcon
                  className="chat-styling"
                  onClick={() => {
                    handleClickOpen(posts[index].pId);
                  }}
                />
                <Dialog
                  open={open == posts[index].pId}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                  fullWidth={true}
                  maxWidth="lg"
                ></Dialog>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Video;
