import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import UploadFile from "./UploadFile";
function Feed() {
  // const { logout, curruser } = useContext(AuthContext);
  // console.log(curruser);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div className="comp" style={{ width: "50%" }}>
        <h1>Welcome to feed</h1>
        {/* <button onClick={logout}>Log Out</button> */}
        <UploadFile></UploadFile>
      </div>
    </div>
  );
}

export default Feed;
