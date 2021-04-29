import React, { useState, useEffect } from 'react';
import { Comment } from '../../components';
import CommentInput from '../../components/comment-input';
import DeleteIcon from '@material-ui/icons/Delete';
import { db, storage } from '../../firebase';
import './style.css';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';

export default function Post({ profileUrl, username,
    id, photoUrl, caption, comments, timestamp, likes, user }) {

    const [likesArray, setLikesArray] = useState(likes ? likes : []);
    const [alreadyLiked, setAlreadyLiked] = useState(false);

    useEffect(() => {
        if (likesArray) {
            likesArray.map((like) => {
                if (like.user === user.displayName) {
                    setAlreadyLiked(true);
                }
            });
        }
    });

    const addLike = () => {

        console.log("not already liked, add");
        likesArray.push({
            user: user.displayName,
        });

        db.collection('posts')
            .doc(id)
            .update({
                likes: likesArray,
            });
        setAlreadyLiked(true);

    };

    const removeLike = () => {

        const newLikesArray = likesArray.filter((like) => like.user !== user.displayName);

        console.log(likesArray)
        console.log("already liked, removing");
        console.log(newLikesArray)
        db.collection('posts')
            .doc(id)
            .update({
                likes: newLikesArray
            });
        setLikesArray(newLikesArray);
        setAlreadyLiked(false);
    }

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

    //const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMouseOver = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const handleMouseLeave = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id2 = open ? 'simple-popper' : undefined;

    return (

        <div className="post">
            <div className="post_header">
                <div className="post_headerLeft">
                    <img className="post_profilePic" src={profileUrl} alt="" />
                    <p style={{ marginLeft: "8px" }}>{username}</p>
                    <p className="post_date">{timestamp ? timestamp.toDate().toDateString() : <></>}</p>
                </div>

                {user && user.displayName === username ? <DeleteIcon onClick={deletePost} className="post_delete" /> : <></>}

            </div>

            <div className="post_center">
                {photoUrl ? <img src={photoUrl} className="post_photoUrl" alt="" /> : <></>}

            </div>

            <div>
                <p>
                    <div style={{ marginTop: "0.5em", marginBottom: "1em", fontSize: "18px" }}>
                        {caption}
                    </div>
                </p>
            </div>

            <div className="post_likes">
                {alreadyLiked ? <FavoriteIcon className="post_likeIcon" style={{ color: "#E76464" }} onClick={removeLike} /> : <FavoriteIcon className="post_likeIcon" onClick={addLike} />}

                {likes && likes.length !== 0 ?
                    <Popper id={id2} open={open} anchorEl={anchorEl}>
                        <div className="post_likesUsers">{likesArray.map((like) => <><span className="post_likesUser">{like.user}</span><br></br></>)}</div>
                    </Popper> : <></>}

                {<span aria-describedby={id2} className="post_likesNum" onMouseEnter={handleMouseOver} onMouseLeave={handleMouseLeave}>{likes ?
                    <span>{likes.length}</span> :
                    0}</span>}
            </div>


            {
                comments ? comments.map((comment) =>
                    <Comment username={comment.username} caption={comment.comment} />) :
                    <></>
            }

            { user ? <CommentInput user={user} comments={comments} id={id} /> : <></>}

        </div >
    )
}
