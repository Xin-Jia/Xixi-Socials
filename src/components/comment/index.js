import React from 'react';
import './style.css';

export default function Comment({ username, caption }) {
    return (
        <div className="comment">
            <div>
                <span style={{
                    fontWeight: "bold", margin: "6px 6px"
                }}>
                    {username}
                </span>
                <div style={caption.length > 50 ? { wordWrap: "break-word", overflowWrap: "break-word", marginLeft: "7px" } : { display: "inline-block" }}>{caption}</div>
            </div>
        </div >
    )
}
