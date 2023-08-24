import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from "../store/store"; // Make sure to import RootState from your store file
import { useNavigate } from 'react-router-dom';
import { setAddress } from '../store/authSlice';
const Navbar: React.FC = () => {
    const items = useSelector((state: RootState) => state.cart);
    const triggerCount = useSelector((state: RootState) => state.trigger.triggerCount); // Get the triggerCount from Redux store
    const { username,address } = useSelector((state: RootState) => state.auth);
    const addressDetails = useSelector((setAddress));

console.log("setAddress",addressDetails.payload.auth.address);

    const navigate = useNavigate();


    const logoutHandler = () => {
        localStorage.clear()
        navigate('/');
    }
    // setTimeout(() => {
    //     logoutHandler()
    // }, 1000 * 60 * 5)
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <span style={{ height:"25px",width:"25px",background:"red",borderRadius:"8px",textAlign:"center",color:"white",fontSize:"22px",}}>{username.charAt(0).toUpperCase()}</span>
            <span className="logo">Amazon Store </span>
            <div style={{ display: "flex" }}>
                <button onClick={logoutHandler}>Logout</button>
                <Link className="navLink" to="/home">
                    Home
                </Link>
                <Link className="navLink" to="/cart">
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <span className="cartCount" style={{ color: "red", marginTop: "-25px", fontSize: "22px" }}>
                            {triggerCount}
                        </span>
                        <img
                            style={{ height: "30px", width: "30px", marginLeft: "5px" }}
                            src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHwAAAB8CAMAAACcwCSMAAAAY1BMVEX///8AAACmpqb6+vqvr69ERETOzs6srKzExMTe3t7o6Ojb29s6Ojr09PTs7OxcXFx8fHycnJxvb28XFxeDg4PU1NSWlpYSEhK7u7tpaWkjIyNkZGRQUFB1dXULCwuJiYkwMDAdi0AUAAAESUlEQVRoge1b2ZaqMBAEQXBBERAFV/7/K6/KptBJVyCBhzv1MufMYVLTQCrd1Y1llciWdoNHcMg21nSI7C7y7WTkPe4XThNxrylyO3cmId+R5HY4DXtMs98nIXcONLs/Cbu1WTfwombfXXbTsH/DOdXs0fTkluXX7HOQW/VLkM5Bvn/MeN/r3XeYhbx658JZyBcleTAL+aokTxa64Hq4Wqe05o1CsQBFa2+A/JWoLCByxwi5bcfIzTdFjqUJgSn2I0AemiK3Vzz53Rg5oB0nfpWh4EPvp9PawKdnPr/IUJxZ8pU5cpvdbSb0tQZbjZnRV5DcmMS9wJ8vSss9lK5mua0EX2yx3SptDp4cF3dP8R1Z8uRXdK24vB6XxJgnf6JrVRUdLgzAuQZHokwOpDOuMfKMJ8+MkQMHumeMHCgAaadGA/kZcLr2Z0PkF8Dlcy6GyAskfzVFDtV/hXyNZRSFffLmt2LcEHK5vj7fl2Rd8lPzWzGuCPlRGnd5jftLXnmmAl+vAmQ4SPW19kv8b/Lar5WHDlkt0iUaf9BvyRuvWP7uuQi5dInWL/GrSLLWp5YfiIC6cvra/v+7nx8vbKV/iNlrW3liJjybuKQb6iNsGJUR3L6UkWVEXV/3kcviyNhTLpENIGPGWTLLULHzZ+ENc6Vu7EK9XQOcw5DAQflr584z7/kHOUYu6D+I2dnn/QbiyVhg/vr13FOoyAGNbCx/bWJH7rkNqiucHlTsaM7nYeRgKGUssJkANkrh/PXgeXBxxTsDJTZo/qqC8x4jZ/V1CArQ9t7xEqcOUF0VSnQFAMV5CRP+K9wsQ/RVFfBEhAHzF6oYPoD9ARxQ9viBfv9VoUkISxyKC6gwb2w0c5/BQ+UDwSTHJNzWDi3RIQRrFW7L0SnuWDPxC7r09RK76kM3lb7GqTcG282gqZPKH5h1fgDM8zWjsvDP00xJdVBLHJjuakZFXijIoj7UjlQ4w5RUm7ovlaRRE/JGKMLId3VAYboS9p5xKDxCAw1dsEJ/A2534FB4e/XHrjLTu2GdITXwzfvf4LXS4xlsHf3iHi61IB42XehowSDqP/zh/4PiXtG4tVbPOAzjE1j4OO4xD68HdO5SDr853AOg+79ru4K5WplG4Pd8YT86+D0MRw5NbzslK9Mr6U7tjKp6dr18Shp7PwkY821K3ltNttyeqOyHf5dDOtrijITqQOMuWBdkpf4UXU33A4d+JkC738IBBDrpFP6vDOimbiLavnTff+ik/oJcTdgvob1yrJHZh2AKVpQK0vmmigX4DcXIafKhkdPPXDhoRHvlQz8Do43QQLQabVcPVlhy8ka42ppsbCoXCzXInStWDUKMxfeJB/EOSW4jZZYPDpx66tIOWX8OdtR3f90XPpEXut3+zMgPkbyfMbGAK7J/dekwNpHct9s3OfGLpa3IFiOed0vv3ovHIzhmmFalUZjYye1JC+E/vMI7QMpKaPwAAAAASUVORK5CYII='
                        />
                    </div>
                </Link>


            </div>
        </div>
    );
};

export default Navbar;
