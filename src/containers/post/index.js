import React, { useState, useContext } from 'react';
import { Comment } from '../../components';
import CommentInput from '../../components/comment-input';
import { UserContext } from '../../contexts/user';
import { db, storage } from '../../firebase';
import './style.css';

export default function Post({ profileUrl, username,
    id, photoUrl, caption, comments, timestamp, user }) {

    //const [user, setUser] = useContext(UserContext).user;

    const deletePost = () => {
        //delete img from firebase storage

        //get ref to the img file we want to delete
        if (photoUrl) {
            var imageRef = storage.refFromURL(photoUrl);

            //delete file
            imageRef.delete().then(function () {
                console.log("delete successfull");
            }).catch(function (error) {
                console.log(error)
            });

        }


        //delete the post info from firebase firestore
        db.collection("posts")
            .doc(id)
            .delete()
            .then(function () {
                console.log("delete post info successfull");
            }).catch(function (error) {
                console.log(error)
            });

    };

    return (
        <div className="post">
            <div className="post_header">
                <div className="post_headerLeft">
                    <img className="post_profilePic" src={profileUrl} alt="" />
                    <p style={{ marginLeft: "8px" }}>{username}</p>
                    <p className="post_date">{timestamp.toDate().toDateString()}</p>
                </div>

                {user && user.displayName === username ? <button onClick={deletePost} className="post_delete">Delete</button> : <></>}


            </div>

            <div className="post_center">
                {photoUrl ? <img src={photoUrl} className="post_photoUrl" alt="" /> : <></>}

            </div>

            <div>
                <p>
                    <div style={{ marginTop: "0.5em", marginBottom: "1em" }}>
                        {caption}
                    </div>
                </p>
            </div>


            {comments ? comments.map((comment) =>
                <Comment username={comment.username} caption={comment.comment} />) :
                <></>}

            {user ? <CommentInput user={user} comments={comments} id={id} /> : <></>}

        </div>
    )
}
