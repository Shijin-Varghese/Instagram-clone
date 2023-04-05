import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./Video.css";
import Like from "./Like";
import Like2 from "./Like2";
import Comments from "./Comments";
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
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import AddComment from "./AddComment";

function Video() {
  const [posts, setPost] = useState([]);
  const usersss = JSON.parse(localStorage.getItem("usersss"));
  const [user, setUserData] = useState();
  const [open, setOpen] = useState(null);

  const us = JSON.parse(localStorage.getItem("user"));
  const handleClickOpen = (id) => {
    setOpen(id);
  };

  const handleClose = () => {
    setOpen(null);
  };
  useEffect(() => {
    let datafetch = async (x) => {
      console.log(us, "user");
      // localStorage.setItem("user", docSnap.data());
      // console.log(
      //   JSON.parse(localStorage.getItem("user")),
      //   "jasdgjfgsdaj"
      // );
      setUserData(us);
      // if (userData != null) {
      let parr = [];
      console.log(us.postIds.length, "user");
      for (let i = 0; i < us.postIds.length; i++) {
        const querySnapshot = await getDocs(collection(db, "posts"));
        querySnapshot.forEach((doc) => {
          console.log(us.postIds[i], "usesssr", doc.data().userId);
          if (doc.data().pId === us.postIds[i]) {
            parr.push(doc.data());
          }
        });
      }
      console.log(parr, "parr");
      setPost(parr);
      // }
    };
    datafetch();
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
      <div className="profile-video">
        {posts.map((post, index) => {
          return (
            <div key={index} className="videos1">
              <div className="videos">
                <video
                  className="modal-video"
                  muted="muted"
                  autoPlay={true}
                  controls
                >
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
                  maxWidth="md"
                >
                  <div className="modal-container">
                    <div className="modalvideo-container">
                      <video
                        className="modal-video"
                        muted="muted"
                        autoPlay={true}
                        controls
                      >
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
                    </div>
                    <div className="comment-container">
                      <Card className="card1" style={{ padding: "1rem" }}>
                        <Comments ind={index}></Comments>
                      </Card>
                      <Card
                        variant="outlined"
                        style={{ textAlign: "center" }}
                        className="card2"
                      >
                        <Typography style={{ padding: "0.4rem" }}>
                          {posts[index].likes.length == 0
                            ? "0 likes"
                            : `Liked by ${posts[index].likes.length} users`}
                        </Typography>
                        <div style={{ display: "flex" }}>
                          <Like2 s={index}></Like2>
                          <AddComment s={index}></AddComment>
                        </div>
                      </Card>
                    </div>
                  </div>
                </Dialog>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Video;
