import React, { useState, useEffect } from 'react'
import './style.css';
import { CreatePost, Navbar } from '../../containers'
import Feed from '../../containers/feed';
import { auth } from "../../firebase";


export default function Home() {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                // user has logged in...
                console.log(authUser);
                setUser(authUser);
                console.log("user has logged in");
            } else {
                // user has logged out..
                setUser(null);
                console.log("user has logged out");
            }
        });
        return () => {
            // perform some cleanup actions
            unsubscribe();
        };
    }, []);

    return (
        <div className="home">

            <CreatePost user={user} />
            <Feed user={user} />
        </div>
    )
}
