import React, { useState,useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import Navbar from './Navbar';
import { setAddress } from '../store/authSlice'; // Update the import path
const Address: React.FC = () => {
  const dispatch = useDispatch();
  const storedAddress = useSelector(setAddress);
console.log("storedAddress",storedAddress.payload.auth.address);

  const [addressDetails, setAddressDetails] = useState({
    area: '',
    pinCode: '',
    locality: '',
    phoneNo: '',
    landmark: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAddressDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSaveAddressLater = () => {
    dispatch(setAddress(addressDetails)); // Dispatch the action with address details

    setAddressDetails({
      area: '',
      pinCode: '',
      locality: '',
      phoneNo: '',
      landmark: '',
    });
  };

  const handleSaveAddress = () => {
    dispatch(setAddress(addressDetails)); // Dispatch the action with address details

    setAddressDetails({
      area: '',
      pinCode: '',
      locality: '',
      phoneNo: '',
      landmark: '',
    });
  };

  return (
    <>
      <Navbar />
      <div>
        <p>Permanent Address</p>
        <input
          type='text'
          name='area'
          placeholder='Area name'
          value={storedAddress.payload.auth.address.area?storedAddress.payload.auth.address.area:addressDetails.area}
          onChange={handleInputChange}
        />
        <br />
        <p>Pin Code </p>
        <input
          type='text'
          name='pinCode'
          placeholder='PinCode'
          value={storedAddress.payload.auth.address?storedAddress.payload.auth.address.pinCode:addressDetails.pinCode}
          onChange={handleInputChange}
        />
        <br />
        <p>Locality</p>
        <input
          type='text'
          name='locality'
          placeholder='Locality'
          value={storedAddress.payload.auth.address?storedAddress.payload.auth.address.locality:addressDetails.locality}
          onChange={handleInputChange}
        />
        <br />
        <p>Phone No</p>
        <input
          type='number'
          name='phoneNo'
          placeholder='Phone No'
          value={storedAddress.payload.auth.address?storedAddress.payload.auth.address.phoneNo:addressDetails.phoneNo}
          onChange={handleInputChange}
        />
        <br />
        <p>Landmark</p>
        <input
          type='text'
          name='landmark'
          placeholder='Landmark'
          value={storedAddress.payload.auth.address?storedAddress.payload.auth.address.landmark:addressDetails.landmark}
          onChange={handleInputChange}
        />
        <br />
        
        <button onClick={handleSaveAddressLater}>Save this address for later </button> <br/>
        {/* <button onClick={handleSaveAddress}>Save this address to delevery</button> */}
      </div>
    </>
  );
};

export default Address;

