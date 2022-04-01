import React from 'react';
import ReactDOM from 'react-dom';
import ProfilePlaceholder from '../../img/profile_placeholder.jpg';
import RecipePlaceholder from '../../img/pancake.jpg';

class Reviews extends React.Component{
    render () {
        return <div>
            <h1>Reviews</h1>    
            <div className='detailsButtons'>
                <button className='detailsButton'><a href='#'>Print</a></button>
            </div>
            <br/><br/><br/>
            <div className='detailsHeader'>
                <div className='detailsWhite'>
                    <h1>Recipe Name</h1>
                    <h3>By User Name</h3>
                    <img height='320px' src={RecipePlaceholder} alt='Placeholder Image'/><br/><br/>
                </div>
            </div><br/>
                    <div className='detailsMain'>
                        <div className='mainWhite'>
                            <div className='review'>
                                <h5>User Name</h5>
                                <p>review text</p>
                                <hr></hr>
                            </div>
                        </div>
                    </div>     
            
                   
            
        </div>
    }
}

export default Reviews;