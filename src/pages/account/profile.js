import React from 'react';
import ReactDOM from 'react-dom';
import ProfilePlaceholder from '../../img/profile_placeholder.jpg';
import RecipePlaceholder from '../../img/pancake.jpg';

class Profile extends React.Component{
    render () {
        return <div>
            <h1>Profile</h1>           
            <div className='aboutBox'>
                <div className='main'>
                    <h3>User Name</h3>
                    <img height='320px' src={ProfilePlaceholder} alt='Placeholder Image'/>
                </div>
                <div className='side'>
                    <h4>All About Me</h4>
                    <br/>
                    <p>Text About me</p>
                </div>               
            </div>
            <br/>
            <div className='profileButtons'>
                <div className='buttonSide'>
                    <button className='profileButton'><a href='/recipe/add'>Create Recipe</a></button>
                    <button className='profileButton'><a href='/account/editprofile'>Edit Profile</a></button>
                    <button className='profileButton'><a href='#'>Favourites</a></button>
                </div>
                <div className='buttonSort'>
                    <form method='TODO: ' action='TODO: '>
                        <h4>Sort Recipes</h4>
                        <select size="1" name="sort">
                        <option value='rating'>Ratings</option>
                        <option value='new'>Newest</option>
                        <option value='old'>Oldest</option>
                        </select>
                    </form>
                </div>            
            </div>
            <br/><br/>
                <div className='recipeBoxP'>
                    <div className='recipePictureP'>
                        <img height='220px' src={RecipePlaceholder} alt='Placeholder Image'/>
                    </div>
                    <div className='recipeInfoP'>
                        <h3>Recipe Name</h3>
                        <p>Author Name</p>
                        <br/>
                        <p>Recipe details</p>
                    </div>  
                    <div className='recipeButtonsP'>
                        <button className='detailsButtonP'><a href='/recipe/edit'>Edit</a></button><br/>
                        <button className='detailsButtonP'><a href='/recipe/delete'>Delete</a></button><br/>
                        <button className='detailsButtonP'><a href='#'>Print</a></button>
                    </div>  
                </div>
        </div>
    }
}

export default Profile;