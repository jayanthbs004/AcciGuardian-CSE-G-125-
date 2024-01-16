import React from 'react';
import '../App.css';
import { Btn } from './Btn';
import './HeroSelection.css';
import RegisterComplain from "./RegisterComplain";


function HeroSection({ user }) {
    return (
        <div className='hero-container'>

            <video src="videos/video-2.mp4" autoPlay loop muted />
            <h1>AcciGuardian</h1>
            <p> Drive Safe , Save Lives</p>
            <div className="hero-btns">
                {user?.displayName ? (
                    <div className="hero-btns">
                        <Btn className='btns' buttonStyle='btn--outline' buttonSize='btn--large'><RegisterComplain btnName="Register Civilian" user={user} /></Btn>
                        <Btn className='btns' buttonStyle='btn--primary' buttonSize='btn--large'><a href="/complaint"> View Complain</a></Btn>
                    </div>
                ) :
                    (
                        <Btn className='btns' buttonStyle='btn--primary' buttonSize='btn--large'><a href="/complaint"> View Complaints</a></Btn>
                    )}


            </div>
        </div>
    )
}

export default HeroSection;
