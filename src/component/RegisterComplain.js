import React, { useState } from 'react';
import { db, storage } from '../firebase';
import firebase from "firebase";
import './RegisterComplain.css';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Input } from '@material-ui/core';


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

function RegiserComplain({ btnName, user }) {
    const [progress, setProgress] = useState(0);
    const [name, setName] = useState('');
    const [mobno, setMobno] = useState('');
    const [email, setemail] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [pincode, setPincode] = useState('');
    const [dlno, setdl] = useState('');
    const [vehicleNumber, setVehicle] = useState('');
    const [type, settype] = useState('');
    const [model, setmodel] = useState('');

    
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);


    const handleUpload = (event) => {
        event.preventDefault();
    
        // Assuming db is your Firestore database reference
        const vehiclesCollection = db.collection("vehicles");
    
        // Use the vehicleNumber as the key
        const vehicleDocRef = vehiclesCollection.doc(vehicleNumber);
    
        // Set the data for the document
        vehicleDocRef.set({
            name: name,
            username: user.displayName,
            mobno: mobno,
            email: email,
            address: address,
            city: city,
            pincode: pincode,
            dlno: dlno,
            vehicleNumber: vehicleNumber,
            type: type,
            model: model,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            console.log("Document successfully written!");
            
            // Reset the form fields
            setName('');
            setMobno('');
            setemail('');
            setAddress('');
            setCity('');
            setPincode('');
            setdl('');
            setVehicle('');
            settype('');
            setmodel('');
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
    }
    
    

    return (
        <div className="RegiserComplain">
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
                            placeholder="Enter your Name "
                            value={name}
                            onChange={event => setName(event.target.value)}
                        />

                         <Input
                            placeholder="Mobile No. "
                            type="text"
                            value={mobno}
                            onChange={(event) => setMobno(event.target.value)}
                        />

                        <Input
                            placeholder="Email "
                            type="text"
                            value={email}
                            onChange={(event) => setemail(event.target.value)}
                        />

                        <Input
                            placeholder="Address "
                            type="text"
                            value={address}
                            onChange={(event) => setAddress(event.target.value)}
                        />

                        <Input
                            placeholder="City "
                            type="text"
                            value={city}
                            onChange={(event) => setCity(event.target.value)}
                        />
                        <Input
                            placeholder="Pincode  "
                            type="text"
                            value={pincode}
                            onChange={(event) => setPincode(event.target.value)}
                        />
                        <Input
                            placeholder="Vehicle Number "
                            type="text"
                            value={vehicleNumber}
                            onChange={(event) => setVehicle(event.target.value)}
                        />
                       
                         <Input
                            placeholder="Driver's License No. "
                            type="text"
                            value={dlno}
                            onChange={(event) => setdl(event.target.value)}
                        />

                         <Input
                            placeholder="Type: "
                            type="text"
                            value={type}
                            onChange={(event) => settype(event.target.value)}
                        />

                         <Input
                            placeholder="Model. "
                            type="text"
                            value={model}
                            onChange={(event) => setmodel(event.target.value)}
                        />
                        <Button type="submit" onClick={handleUpload}>ADD</Button>
                    </form>
                </div>
            </Modal>
            <button
                className="nav-btn"
                onClick={() => setOpen(true)}
            >
                {btnName}
            </button>
        </div>
    )
}

export default RegiserComplain
