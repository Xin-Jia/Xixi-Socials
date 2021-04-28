import React, { useContext, useState } from 'react';
import { UserContext } from '../../contexts/user';
import { db } from '../../firebase';
import './style.css';

export default function CommentInput({ user, comments, id }) {

    const [comment, setComment] = useState("");
    //const [user, setUser] = useContext(UserContext).user;
    const [commentArray, setCommentArray] = useState(comments ? comments : [])

    const addComment = () => {
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
        <div className="commentInput">
            <textarea
                className="commentInput_textarea"
                rows="1"
                placeholder="Enter a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}>

            </textarea>
            <button onClick={addComment} className="commentInput_button">Post</button>
        </div>
    )
}