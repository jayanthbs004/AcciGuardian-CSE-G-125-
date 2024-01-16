import React from 'react';
import './Footer.css';
import { Btn } from './Btn';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <div className='footer-container'>
            <section className='footer-subscription'>
                <p className='footer-subscription-heading'>
                        PROJECT MEMBERS 
                </p>
            </section>
            <div class='footer-links'>
                <div className='footer-link-wrapper'>
                    <div class='footer-link-items'>
                        <h2>Deepak V
                            <span></span>
                            <p>20201CSE0673</p></h2>   
                    </div>
                    <div class='footer-link-items'>
                         <h2>Jayanth B S
                            <span></span>
                            <p>20201CSE680</p></h2>
                    </div>

                </div>
                <div className='footer-link-wrapper'>
                    <div class='footer-link-items'>
                         <h2>Aishwarya Oji
                            <span></span>
                            <p>20201CSE701</p></h2>
                    </div>

                    <div class='footer-link-items'>
                         <h2>Mohammed Shaiz
                            <span></span>
                            <p>20201CSE0684</p></h2>
                    </div>
                </div>
            </div>
            <section class='social-media'>
                <small class='website-rights'>Kingsmen: Secret Service © 2024</small>
            </section>    
        </div>
    );
}

export default Footer;