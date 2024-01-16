import React, { useState } from 'react';
import { db } from '../firebase';
import './ComplaintHistory.css';

const ComplaintHistory = () => {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [complaintData, setComplaintData] = useState(null);

  const handleSearch = async () => {
    try {
      const complaintsCollection = db.collection('complaints');
      const complaintDoc = await complaintsCollection.doc(vehicleNumber).get();
  
      if (complaintDoc.exists) {
        const complaintData = complaintDoc.data();
        setComplaintData(complaintData);
      } else {
        window.alert('No complaint history found for the vehicle number: ' + vehicleNumber);
        setComplaintData(null);
      }
    } catch (error) {
      console.error('Error fetching complaint data:', error);
    }
  };

  return (
    <div className="center-div">
  <label>Enter Vehicle Number:</label>
  <input
    type="text"
    value={vehicleNumber}
    onChange={(e) => setVehicleNumber(e.target.value)}
  />
  <button onClick={handleSearch}>Submit</button>

      {complaintData && (
        <div>
          <h2>Complaint Details</h2>
          <p>Name: {complaintData.name}</p>
          <p>MobNo: {complaintData.mobno}</p>
          <p>Address: {complaintData.address}</p>
          <p>City: {complaintData.city}</p>
          <p>PinCode: {complaintData.pincode}</p>
          <p>Driver's License No: {complaintData.dlno}</p>
          <p>Vehicle Number: {complaintData.vehicleNumber}</p>
          <p>Location: {complaintData.location}</p>
          <p>Severity: {complaintData.severity}</p>
          <p>Accident Details: {complaintData.crimeDetails}</p>
          <p>Time: {complaintData.timestamp && complaintData.timestamp.toDate().toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default ComplaintHistory;
