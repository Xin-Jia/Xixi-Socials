import React from 'react';
import './style.css';
import EmailIcon from '@material-ui/icons/Email';
import FacebookIcon from '@material-ui/icons/Facebook';

export default function About() {
    return (
        <div classname="about_wrapper">
            <div className="about_header">
            </div>
            <div className="about">

                <div className="about_text">
                    <div className="about_profileWrapper">
                        <img className="about_profile" src="https://lh6.googleusercontent.com/-YrhjNnrjpoA/AAAAAAAAAAI/AAAAAAAABcI/AMZuucmliZOt6ve0UY9PgudniFsHB5gBPA/s96-c/photo.jpg" alt="" />
                    </div>
                    <h2>A B O U T</h2>
                    <br></br><br></br>
                    <div className="about_sections">
                        <h3>Who Am I ?</h3>
                        I'm Xin Jia, 20 years old computer science student living in Montreal. I will soon graduate from Dawson with a DEC in computer science.
                <br></br><br></br>
                This website is a simple social media project I made in April 2021 with React and Firebase. Feel free to post, comment and react!
                <br></br><br></br>
                        <h3>Contact Me</h3>
                        <div className="about_email"><EmailIcon /> <span style={{ marginLeft: "0.5em" }}>xinjia.caoxin@gmail.com</span></div>
                        <a target="_blank" href="https://www.facebook.com/xinjia.cao/"><div className="about_email"><FacebookIcon /> <span style={{ marginLeft: "0.5em" }}>Xin Jia Cao</span></div></a>

                    </div>
                </div>
            </div >
            <div className="about_footer">
            </div>
        </div>

    )
}
