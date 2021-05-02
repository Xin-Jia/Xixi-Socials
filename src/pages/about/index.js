import React from 'react';
import './style.css';
import EmailIcon from '@material-ui/icons/Email';
import FacebookIcon from '@material-ui/icons/Facebook';

export default function About() {
    return (
        <div className="about">
            <div className="about_text">
                <h2>About</h2>
                <img className="about_profile" src="https://lh6.googleusercontent.com/-YrhjNnrjpoA/AAAAAAAAAAI/AAAAAAAABcI/AMZuucmliZOt6ve0UY9PgudniFsHB5gBPA/s96-c/photo.jpg" alt="" />
                <div className="about_sections">
                    <h3>Who Am I?</h3>
                        I'm Xin Jia, 20 years old computer science student living in Montreal. I will soon graduate from Dawson with a DEC in computer science.
                <br></br><br></br>
                This website is a simple social media project I made in April 2021 with React and Firebase. Feel free to post, comment and react!
                <br></br><br></br>
                    <h3>Contact Me</h3>
                    <div className="about_email"><EmailIcon /> <span style={{ marginLeft: "0.5em" }}>xinjia.caoxin@gmail.com</span></div>
                    <a target="_blank" href="https://www.facebook.com/xinjia.cao/"><div className="about_email"><FacebookIcon /> <span style={{ marginLeft: "0.5em" }}>Xin Jia Cao</span></div></a>

                </div>
            </div>
            <div className="about_text">
                <h2>Other</h2>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
            </div>

        </div>
    )
}
