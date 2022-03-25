import React from 'react';
import ReactDOM from 'react-dom';
import RRR_FullLogo from '../../img/Logo_Icon.png';
import Register from './register';
import {Link} from 'react-router-dom';

class Login extends React.Component{
    render () {
        return <div>
            <div className='loginBox'>
                <img height='120px' src={RRR_FullLogo} alt='Radical Random Recipes Logo'/>
                <br/>
                <h2>LOGIN</h2>
                <form method='TODO: ' action='TODO: '>
                    <input type='text' name='username'placeholder='Username'/>
                    <br/>
                    <input type='password' name='password' placeholder='Password'/>
                    <br/>
                    <br/>
                    <input type='submit' value='Login'/>
                </form>
                <div>
                    <div>
                        <Link to='TODO: '>Forgot Username?</Link>
                    </div>
                    <div>
                        <Link to='TODO: '>Forgot Password?</Link>
                    </div>
                </div>
                <br/>
                <Link to='/account/register'>Not a member yet?</Link>
            </div>
        </div>
    }
}

export default Login;