import React from 'react';
import ReactDOM from 'react-dom';

class Register extends React.Component{
    render () {
        return <div className='loginBox'>
            <h1>Create an Account</h1>
            <form method='TODO: ' action='TODO: '>
                <div className='inputLabel'>USERNAME</div>
                <input type='text' name='username'/>
                <div className='inputLabel'>PASSWORD</div>
                <input type='password' name='password'/>
                <div className='inputLabel'>CONFIRM PASSWORD</div>
                <input type='password' name='confirmPass'/>
                <div className='inputLabel'>EMAIL</div>
                <input type='email' name='emailAddress'/>
                <div className='inputLabel'>FIRST NAME</div>
                <input type='text' name='firstName'/>
                <div className='inputLabel'>LAST NAME</div>
                <input type='text' name='lastName'/>
                <br/>
                <input type='submit' value='Create Account'/>
            </form>
        </div>
    }
}

export default Register;