import React from 'react';
import ReactDOM from 'react-dom';
import ProfilePlaceholder from '../../img/profile_placeholder.jpg';

class Details extends React.Component{
    render () {
        return <div>
            <h1>Recipe</h1>
                <br/>
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
                            <img height='320px' src={ProfilePlaceholder} alt='Placeholder Image'/>
                        </div>
                    </div>
                    <br/>
                    <div className='detailsMain'>
                        <div className='mainWhite'>
                            <h3>Description</h3>
                        </div>
                    </div>
        </div>
    }
}

export default Details;