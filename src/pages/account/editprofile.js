import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import {MDBBtn as Button} from 'mdb-react-ui-kit';
import DBHandler from '../../components/classes/DBHandler.js';

const EditProfile = props => {

    // get user ID
    let {id} = useParams();
    console.log("ID:",id);

    function validateInputs(){
    }

    const fileSelectedHandler = event => {
        console.log(event.target.files[0]);
    }

        return <div>
            <h1>Edit Profile</h1>
            <form className="formBox">
                <div className="inputLabel">Profile Image</div>
                <input type="file" accept="image/png,image/jpeg" onChange={fileSelectedHandler} name="imageFile"/>
                <div className="inputLabel">Username</div>
                <input type="text" name="p_username"/>
                <div className='inputLabel'>First Name</div>
                <input type='text' name='firstName'/>
                <div className='inputLabel'>Last Name</div>
                <input type='text' name='lastName'/>
                <div className="inputLabel">About Me</div>
                <textarea cols="80" rows="5" name="p_aboutme"/>
                <br/>
                <Button type='button' color='dark' name="btnUpdateProfile" onClick={validateInputs}>Update Profile</Button>
                <br/><br/><br/>
                <Button type='button' color='danger' name="btnDeleteProfile" onClick={validateInputs}>Delete Profile</Button>
            </form>
        </div>
    
}

export default EditProfile;