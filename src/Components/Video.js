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
  const [posts, setPosts] = useState([]);
  const usersss = JSON.parse(localStorage.getItem("usersss"));
  const [user, setUser] = useState();
  const [open, setOpen] = useState(null);
  const [load, setLoad] = useState(null);
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

    console.log(parr, "GCHSHSH");
  }, []);
  // useEffect(() => {
  //   console.log("GCHSHSH");
  // }, [load]);
  const callback = (entrie) => {
    entrie.forEach((entry) => {
      let ele = entry.target.childNodes[0];
      console.log(ele);
      ele.play().then(() => {
        if (!ele.paused && !entry.isIntersecting) {
          ele.pause();
        }
      });
    });
  };
  let observer = new IntersectionObserver(callback, { threshold: 0.6 });
  useEffect(() => {
    const elements = document.querySelectorAll(".videos");
    elements.forEach((element) => {
      observer.observe(element);
    });
    return () => {
      observer.disconnect();
    };
  }, [posts]);
  const handleClick = (e) => {
    setLoad(true);
    e.preventDefault();
    e.target.muted = !e.target.muted;
  };
  const handleScroll = (e) => {
    setLoad(true);
    let next = ReactDOM.findDOMNode(e.target).parentNode.nextSibling;
    if (next) {
      next.scrollIntoView();
      e.target.muted = true;
    }
  };
  // console.log(posts[0].pUrl, "sssasssas");
  return (
    <>
      {posts.length == 0 ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100vw",
            height: "12vh",
          }}
        >
          <div>
            <div>
              <h1>Loading...</h1>
            </div>
            <CircularProgress />
          </div>
        </div>
      ) : (
        <>
          <div className="video-container">
            {posts.map((post, index) => {
              return (
                <div key={index} className="videos1">
                  <div className="videos">
                    <video className="videos-styling" muted="muted" controls>
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
      )}
    </>
  );
}

export default Video;
