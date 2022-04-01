import React from 'react';
import ReactDOM from 'react-dom';
import ProfilePlaceholder from '../../img/profile_placeholder.jpg';
import RecipePlaceholder from '../../img/pancake.jpg';

class Print extends React.Component{
    render () {
        return <div>
            <h1>Print</h1>    
            <div className='detailsButtons'>
                <button className='detailsButton'><a href='#'>Print</a></button>
            </div>
            <br/><br/><br/>
            <div className='printHeader'>
                <div className='detailsWhite'>
                    <h1>Recipe Name</h1>
                    <h3>By User Name</h3>
                    <img height='320px' src={RecipePlaceholder} alt='Placeholder Image'/><br/><br/>
                </div>
            </div><br/>
                    <div className='printMain'>
                            <h3>Description</h3><br/>
                            <h3>Story</h3><br/>
                            <h3>Instructions</h3><br/>
                            <h3>Tags</h3><br/>
                    </div>     
            
                   
            
        </div>
    }
}

export default Print;