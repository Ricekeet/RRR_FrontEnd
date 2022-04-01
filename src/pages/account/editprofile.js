import React from 'react';
import ReactDOM from 'react-dom';

class EditProfile extends React.Component{
    render () {
        return <div>
            <h1>Edit Profile</h1>
            <form className="formBox">
                <div className="inputLabel">Profile Picture</div>
                <input type="file" accept="image/png,image/jpeg" onChange={this.fileSelectedHandler} name="imageFile"/>
                <div className="inputLabel">Username</div>
                <input type="text" name="p_username"/>
                <div className="inputLabel">About Me</div>
                <textarea cols="80" rows="5" name="p_aboutme"/>
                <br/>
            </form>
        </div>
    }
}

export default EditProfile;