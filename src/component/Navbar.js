import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { Btn } from './Btn';
import { db, auth } from '../firebase';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Input } from '@material-ui/core';
import Avatar from "@material-ui/core/Avatar";
import RegisterComplain from './RegisterComplain';
import PlateReader from"../App/PlateReader";

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 500,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function Navbar({user, changeUser}) {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);


    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [openSignIn, setOpenSignIn] = useState(false);

    

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                // user has logged in..
                console.log(authUser);
                changeUser(authUser);
            } else {
                // user has logged out.. 
                changeUser(null);
            }
        })
        return () => {
            // perform some cleanup actions
            unsubscribe();
        }

    }, [user, username]);

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        }
        else {
            setButton(true);
        }
    };

    useEffect(() => {
        showButton();
    }, []);


    window.addEventListener('resize', showButton);

    const signUp = (event) => {
        event.preventDefault();
        setOpen(false);
        auth
            .createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                return authUser.user.updateProfile({
                    displayName: username
                })
            })
            .catch((error) => alert(error.message))
    }

    const signIn = (event) => {
        event.preventDefault();

        auth
            .signInWithEmailAndPassword(email, password)
            .catch((error) => alert(error.message))

        setOpenSignIn(false);
    }

    return (
        <>
            <nav className='navbar'>
                <Modal
                    open={open}
                    onClose={() => setOpen(false)}
                >
                    <div style={modalStyle} className={classes.paper}>
                        <form className="nav__signup">
                            <center>
                                <img
                                    className="nav__headerImage"
                                    src="images/modalLogo/onlinelogomaker-122820-1737-5771-2000-transparent.png"
                                    alt=""
                                />
                            </center>
                            <Input
                                type="text"
                                placeholder="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />

                            <Input
                                placeholder="email"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />


                            <Input
                                placeholder="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <Button type="submit" onClick={signUp}>Sign Up</Button>
                        </form>
                    </div>
                </Modal>
                <Modal
                    open={openSignIn}
                    onClose={() => setOpenSignIn(false)}
                >
                    <div style={modalStyle} className={classes.paper}>
                        <form className="nav__signup">
                            <center>
                                <img
                                    className="nav__headerImage"
                                    src="images/modalLogo/onlinelogomaker-122820-1737-5771-2000-transparent.png"
                                    alt=""
                                />
                            </center>

                            <Input
                                placeholder="email"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <Input
                                placeholder="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <Button type="submit" onClick={signIn}>Sign In </Button>
                        </form>
                    </div>

                </Modal>
                <div className='navbar-container'>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-items'>
                            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                                HOME
                            </Link>
                        </li>

                        {user ? (
    <div className="nav-credential-item">
        <Avatar
            className="profile__avatar"
            alt={username}
            src="images/profilePic.png"
        />
        <li className='nav-item'>
            <div className='nav-links'>
                <button
                    className="nav-btn"
                    onClick={() => auth.signOut()}
                >
                    LOGOUT
                </button>
            </div>
        </li>
        <li className='nav-item'>
            <div className='nav-links'>
                <RegisterComplain btnName="Register-Civilian" user={user} />
            </div>
        </li>
        <li className='nav-items'>
            <Link to='/platereader' className='nav-links'>
                Report Accident
            </Link>
        </li>
    </div>
) : (
    <div className="nav-credential-item">
        <li className='nav-item'>
            <div className='nav-links'>
                <button
                    className="nav-btn"
                    onClick={() => setOpen(true)}> SIGN UP
                </button>
            </div>
        </li>
        <li className='nav-item'>
            <div className='nav-links'>
                <button
                    className="nav-btn"
                    onClick={() => setOpenSignIn(true)}
                >
                    LOG IN
                </button>
            </div>
        </li>
    </div>
)}
                    </ul>
                </div>
            </nav>

        </>
    );
}

export default Navbar;
