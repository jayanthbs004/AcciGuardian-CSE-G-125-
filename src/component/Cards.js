import React from 'react';
import './Cards.css';

function Complain({ user, username, name, mobno ,email,address, city, pincode,dlno, vehicleNumber,type,model }) {
    console.log({ name });
    return (
        <div>
        {user && (user.displayName === username) && (
        <div id="viewComplain" className="complain">
            <div>
                <h4 className="complain__name">Name : {name}</h4>
                <h4 className="complain__mobno">Mobile No. : {mobno}</h4>
                <h4 className="complain__mobno">Email : {email}</h4>
                <h4 className="complain__address">Address : {address}</h4>
                <h4 className="complain__city">City : {city}</h4>
                <h4 className="complain__pincode">Pincode : {pincode}</h4>
                <h4 className="complain__mobno">Driving License Number : {dlno}</h4>
                <h4 className="complain__crime">Vehicle Number : {vehicleNumber}</h4>
                <h4 className="complain__mobno">Type: {type}</h4>
                <h4 className="complain__mobno">Model: {model}</h4>
            </div>
        </div>
        )}
        </div>
    )
}

export default Complain;