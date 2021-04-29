import React, { useContext, useState } from 'react';
import { UserContext } from '../../contexts/user';
import './style.css';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { db, storage } from '../../firebase';
import makeid from '../../helper/functions';
import firebase from 'firebase';

export default function CreatePost({ user }) {
    //const [user, setUser] = useContext(UserContext).user;
    const [caption, setCaption] = useState("");
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
            var selectedImageSrc = URL.createObjectURL(e.target.files[0]);
            var imagePreview = document.getElementById("image-preview");
            imagePreview.src = selectedImageSrc;
            imagePreview.style.display = "block";
        }
    };

    const handleUpload = () => {
        if (image && caption !== "") {
            var imageName = makeid(10);
            const uploadTask = storage.ref(`images/${imageName}.jpg`)
                .put(image);

            uploadTask.on("state_changed", (snapshot) => {
                //progress function 1%, 2%...
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                setProgress(progress);
            }, (error) => {
                console.log(error);
            }, () => {
                //get download url and upload post info
                storage
                    .ref("images")
                    .child(`${imageName}.jpg`)
                    .getDownloadURL()
                    .then((imageUrl) => {
                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            photoUrl: imageUrl,
                            username: user.displayName,
                            profileUrl: user.photoURL,
                            comments: [],
                            likes: [],
                        })
                    });

            });
        }
        else {
            if (caption !== "") {
                db.collection("posts").add({
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    caption: caption,
                    photoUrl: null,
                    username: user.displayName,
                    profileUrl: user.photoURL,
                    comments: [],
                    likes: [],
                })
            }
        }

        setCaption("");
        setProgress(0);
        setImage(null);
        document.getElementById("image-preview").style.display = "none";
    };

    return (
        <div className="createPost">
            {user ? (
                <div className="createPost_loggedIn">
                    <p>Create Post</p>
                    <div className="createPost_loggedInCenter">
                        <textarea
                            className="createPost_textarea"
                            rows="4"
                            placeholder="Enter caption here..."
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}>
                        </textarea>
                        <div className="createPost_imagePreview">
                            <img id="image-preview" alt="" />
                        </div>
                    </div>
                    <div className="createPost_loggedInBottom">
                        <div className="createpost_imageUpload">
                            <label htmlFor="fileInput">
                                <AddAPhotoIcon
                                    style={{ cursor: "pointer", fontSize: "20px" }} />
                            </label>
                            <input
                                id="fileInput"
                                type="file"
                                accept="image/*"
                                onChange={handleChange} />
                        </div>
                        <button className="createPost_uploadBtn"
                            onClick={handleUpload}
                            style={{ color: caption ? "white" : "lightgrey", backgroundColor: caption ? "#de5246" : "white" }}>
                            {`Upload ${progress != 0 ? `${progress}%` : ""}`}
                        </button>

                    </div>
                </div>
            ) :
                (<div className="heading">
                    <h2>Welcome to Xixi Socials !</h2>
                    <h3> Sign In to Post & Comment !</h3></div>)}

        </div>
    );
}
