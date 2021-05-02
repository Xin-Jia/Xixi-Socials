import React, { useContext, useState } from 'react';
import { db } from '../../firebase';
import './style.css';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';



export default function CommentInput({ user, comments, id }) {

    const [comment, setComment] = useState("");
    //const [user, setUser] = useContext(UserContext).user;
    const [commentArray, setCommentArray] = useState(comments ? comments : [])


    const addComment = (e) => {
        e.preventDefault();
        if (comment != "") {
            //add comment to post info
            commentArray.push({
                comment: comment,
                username: user.displayName,
            });

            db.collection('posts')
                .doc(id)
                .update({
                    comments: commentArray,
                }).then(function () {
                    setComment("");
                });
        }
    };



    return (
        <form>
            <div className="commentInput">
                <TextField
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                    id="write-comment"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <img style={{ width: "20px", height: "20px", borderRadius: "20px" }} src={user.photoURL} />
                            </InputAdornment>
                        ),
                    }}
                />
                <Button type="submit" id="submit-btn"
                    variant="contained"
                    onClick={addComment}>Default</Button>
            </div>
        </form>
    )
}
