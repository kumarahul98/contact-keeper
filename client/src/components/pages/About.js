import React from 'react';
import { Parallax } from 'react-parallax';
const About = () => {
    return (
        <div>
            {/* <img src="cover.JPG" class="img-fluid" alt="Responsive image" style={{width: "100vw",height: "90vh"}} /> */}
            <Parallax blur={10} bgImage="cover.JPG" bgImageAlt="the cat" strength={200}>
            {/* <div class="shadow-lg card rounded" style={{width: "18rem",position: "absolute",left: "70rem",top:"18rem",background:"transparent",color: "white",Transform:"translate(-50%,-50%)"}}>
            <h2 style={{fontFamily: "Papyrus", fontWeight: "1000"}}> Rahul Kumar </h2>
            <h3 style={{fontFamily: "Papyrus", color: "FloralWhite", fontWeight: "bold"}}>Developer</h3>
            <p>A software developer in process. Exploring and expermenting with what ever tech, I can get my hands on. Looking forward to building more stuff with React...</p>    
            </div> */}
            Blur transition from min to max
        <div style={{ height: '200px' }} />
                </Parallax>
        </div>
    )
}

export default About
