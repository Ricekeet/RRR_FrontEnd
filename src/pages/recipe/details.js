import React from 'react';
import ReactDOM from 'react-dom';
import RecipePlaceholder from '../../img/pancake.jpg';

class Details extends React.Component{
    render () {
        return <div>
            <h1>Recipe</h1><br/>
                    <div className='detailsButtons'>
                        <button className='detailsButton'><a href='/recipe/edit'>Edit</a></button>
                        <button className='detailsButton'><a href='/recipe/delete'>Delete</a></button>
                        <button className='detailsButton'><a href='#'>Print</a></button>
                    </div>
                    <br/><br/><br/>
                    <div className='detailsHeader'>
                        <div className='detailsWhite'>
                            <h1>Recipe Name</h1>
                            <h3>By User Name</h3>
                            <img height='320px' src={RecipePlaceholder} alt='Placeholder Image'/><br/><br/>
                            <button className='detailsButton'><a href='/recipe/reviews'>Reviews</a></button>
                        </div>
                    </div>
                    <br/>
                    <div className='detailsMain'>
                        <div className='mainWhite'>
                            <h3>Description</h3><br/>
                            <h3>Story</h3><br/>
                            <h3>Instructions</h3><br/>
                            <h3>Tags</h3><br/>
                        </div>
                    </div>
        </div>
    }
}

export default Details;