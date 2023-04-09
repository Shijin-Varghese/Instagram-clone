import * as React from "react";
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import { Button, CardActionArea, CardActions } from "@mui/material";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "./Signup.css";
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
  setDoc,
  addDoc,
  serverTimestamp,
  getFirestore,
} from "firebase/firestore";
import { db } from "../firebase";
export default function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signup } = useContext(AuthContext);
  const handleClick = async () => {
    if (file == null) {
      setError("Please upload profile image");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }
    try {
      setError("");
      setLoading(true);
      let userObj = {};
      let uidd = await signup(email, password);
      const uid = uidd.uid;
      console.log(uid);
      console.log(uidd, uid, "signup");
      const metadata = {
        contentType: "image/jpeg",
      };

      const storage = getStorage();
      const storageRef = ref(storage, `/users/${uid}/ProfileImage`);
      let uploadTask = uploadBytesResumable(storageRef, file, metadata);

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
            await setDoc(doc(db, "users", `${uid}`), {
              email: email,
              userId: uid,
              fullname: name,
              profileUrl: url,
              postIds: [],
              createdAt: serverTimestamp(),
            })
              .then(() => {
                setLoading(false);
                navigate("/login");
              })
              .catch(() => {
                setLoading(false);
                navigate("/signup");
              });
          });
        }
      );
    } catch (e) {
      console.log(e);
      setError("something went wrong");
      setTimeout(() => {
        setError("");
      }, 2000);
      setLoading(false);
      return;
    }
  };
  return (
    <div className="signupWrapper">
      <div className="signupCard">
        <Card variant="outlined">
          <div className="insta-logo">
            <img src="data:image/jpeg;base64,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" />
          </div>
          <CardContent>
            <Typography
              sx={{
                color: " grey",
                textAlign: " center",
              }}
              variant="subtitle1"
            >
              Sign Up to see photos and Videos
            </Typography>
            {error != "" && <Alert severity="error">{error}</Alert>}
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              fullWidth={true}
              margin="dense"
              size="small"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              fullWidth={true}
              margin="dense"
              size="small"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <TextField
              id="outlined-basic"
              label="Full Name"
              variant="outlined"
              fullWidth={true}
              margin="dense"
              size="small"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <Button
              fullWidth={true}
              size="small"
              color="secondary"
              variant="outlined"
              margin="dense"
              startIcon={<CloudUploadIcon />}
              component="label"
            >
              Upload Profile Image
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              ></input>
            </Button>
          </CardContent>
          <CardActions>
            <Button
              color="primary"
              variant="contained"
              fullWidth={true}
              disabled={loading}
              onClick={handleClick}
            >
              Sign Up
            </Button>
          </CardActions>
          <CardContent>
            <Typography
              sx={{
                color: " grey",
                textAlign: " center",
              }}
              variant="subtitle1"
            >
              By signing up you agree to the Terms and Conditions
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <Card variant="outlined"></Card>
          <CardContent>
            <Typography
              sx={{
                height: "3vh",
                marginTop: "2%",
              }}
              variant="subtitle1"
            >
              Having an account ?
              <Link to="/login" style={{ textDecoration: "none" }}>
                Login
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
