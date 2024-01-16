import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
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

function FileComplaint({ btnName, extractedText, open, setOpen}) {
    const [modalStyle] = useState(getModalStyle);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [pincode, setPincode] = useState('');
    const [vehicleNumber, setVehicle] = useState(extractedText);
    const [mobno, setMobno] = useState('');
    const [crimeDetails, setCrimeDetails] = useState('');
    const [location, setloc] = useState('');
    const [severity, setsev] = useState('');

   const cleanUpText = (text) => {
    // Remove spaces and special characters
    return text.replace(/[\s\W_]+/g, '');
  };

    const classes = useStyles();
    useEffect(() => {
        const fetchData = async () => {
          try {
            const vehicleDoc = await db.collection('vehicles').doc(cleanUpText(extractedText)).get();
            console.log("fetching data",cleanUpText(extractedText));
            if (vehicleDoc.exists) {
              const vehicleData = vehicleDoc.data();
             
              // Populate the form fields with data from the "vehicles" collection
              setName(vehicleData.name || ''); // Replace 'name' with the actual field in your data
              setAddress(vehicleData.address || ''); // Replace 'address' with the actual field in your data
              setCity(vehicleData.city || ''); // Replace 'city' with the actual field in your data
              setPincode(vehicleData.pincode || ''); // Replace 'pincode' with the actual field in your data
              setVehicle(vehicleData.vehicleNumber || ''); // Replace 'vehicleNumber' with the actual field in your data
              setMobno(vehicleData.mobno || ''); // Replace 'mobno' with the actual field in your data
            } else {
              console.error("Vehicle not found!");
              // Handle the case where the vehicle is not found
            }
          } catch (error) {
            console.error("Error fetching vehicle data:", error);
          }
        };
    
        // Fetch data only if the vehicleNumber is not empty
        if (extractedText!=null) {
          fetchData();
          
        }
      }, [extractedText]);
    const handleUpload = async (event) => {
        event.preventDefault();

        const complaintsCollection = db.collection("complaints");

        // Set the data for the document in the "complaints" collection
        await complaintsCollection.doc(vehicleNumber).set({
            name: name,
            mobno: mobno,
            address: address,
            city: city,
            pincode: pincode,
            vehicleNumber: vehicleNumber,
            crimeDetails: crimeDetails,
            location: location,
            severity: severity,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        

            setCrimeDetails('');      
            setOpen(false); // Close the modal
        };

    return (
        <div className="RegisterComplain">
            <Modal
                open={open}
                onClose={() => setOpen(false)}
            >
                <div style={modalStyle} className={classes.paper}>
                    <form className="nav__signup">
                    <Input
                            type="text"
                            placeholder="Enter your Name "
                            value={name}
                            onChange={event => setName(event.target.value)}
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
                            placeholder="Mobile No. "
                            type="text"
                            value={mobno}
                            onChange={(event) => setMobno(event.target.value)}
                        />
                        <Input
                            placeholder="Accident Details "
                            type="text"
                            value={crimeDetails}
                            onChange={(event) => setCrimeDetails(event.target.value)}
                        />
                        
                        <Input
                            placeholder="Loaction"
                            type="text"
                            value={location}
                            onChange={(event) => setloc(event.target.value)}
                        />

                        <Input
                            placeholder="Severity"
                            type="text"
                            value={severity}
                            onChange={(event) => setsev(event.target.value)}
                        />
                        <Button type="submit" onClick={handleUpload}>Complain</Button>
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

export default FileComplaint;
