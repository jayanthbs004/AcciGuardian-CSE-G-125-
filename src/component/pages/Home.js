import React from 'react';
import '../../App.css';
import HeroSection from '../HeroSection';
import Cards from '../Cards';
import './Home.css';

function Home({ user }) {

    return (
        <>
            <HeroSection user={user} />
            <Cards user={user} />
            <a class="whats-app" href="#" target="_blank">
                <i class="fa fa-weixin my-float"></i>
            </a>
        </>
    );
}

export default Home;