import React, { useState, useContext } from 'react';
import { SignInBtn } from '../../components';
import { Link } from 'react-router-dom';
import './style.css';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { auth } from "../../firebase";


export default function Navbar({ user }) {

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
            <div className="navbar_left">
                <Link to='/'><p>Xixi Socials  🌸 </p></Link>
                <Link to='/about'>
                    <li>About</li>
                </Link>
            </div>
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
