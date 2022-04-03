import React, {useState} from 'react';
import ReactDOM from 'react-dom';

class Home extends React.Component{
    constructor(props) {
        super(props);
    }
    
    render () {
        return (
            <div className='contents'>
            <h1>Our Favorite Recipes</h1>
            </div>
        );
    }
}

export default Home;