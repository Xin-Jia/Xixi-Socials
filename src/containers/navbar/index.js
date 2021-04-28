import React, { useState, useContext } from 'react';
import { SignInBtn } from '../../components';
import { UserContext } from '../../contexts/user';
import './style.css';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { auth } from "../../firebase";


export default function Navbar({ user }) {

    //const [user, setUser] = useContext(UserContext).user;
    const signOut = async (e) => {
        e.preventDefault();

        await auth.signOut().then(function () {
            console.log("Successfully signed out.")

        }).catch(function (error) {
            console.log(error)
            console.log("An error occurred")
        });
    }

    return (
        <div className="navbar">
            <p>Xixi Socials</p>
            {user ?
                <div className="navbar_profile">
                    <img className="navbar_img" src={user.photoURL} />
                    <span style={{ color: "black", marginLeft: "7px" }}>{user.displayName}</span>
                    <span className="navbar_logout" onClick={signOut}>
                        <ExitToAppIcon />
                    </span>

                </div>
                : <SignInBtn />}
        </div>
    );
}
