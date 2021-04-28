import React from 'react'

export default function Comment({ username, caption }) {
    return (
        <div className="comment">
            <p>
                <span style={{
                    fontWeight: "bold", margin: "6px 6px"
                }}>
                    {username}
                </span>
                {caption}
            </p>
        </div>
    )
}
