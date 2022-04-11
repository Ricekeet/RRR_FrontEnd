import React, { useEffect, useState } from 'react';
import {Navigate,useParams,useSearchParams} from 'react-router-dom';
import ReactDOM from 'react-dom';
import {MDBBtn as Button} from 'mdb-react-ui-kit';
import Recipe from '../../components/classes/Recipe';
import DBHandler from '../../components/classes/DBHandler.js';
import RecipePlaceholder from '../../img/pancake.jpg';

const Details = props => {
    let {id} = useParams();
    console.log("ID:",id);

    // states
    
    // Recipe object from the Database.
    let dbRecipe;

    useEffect(async () => {
        let result = DBHandler.GET_Recipe(id);
        let object;
        await result.then((recipe) => {
            dbRecipe = recipe[0];
        });
        setInputs();
    }, []);

    function setInputs(){
        document.getElementsByClassName('RName')[0].innerHTML = dbRecipe.Name;
        document.getElementsByClassName("RInstructions")[0].innerHTML = dbRecipe.Details;
        document.getElementsByClassName("RStory")[0].innerHTML = dbRecipe.Story;
        
    }

    return <div>
    <h1>Recipe</h1><br/>
            <div className='detailsButtons'>
                <button className='detailsButton'><a href={`/recipe/edit/${id}`}>Edit</a></button>
                <button className='detailsButton'><a href={`/recipe/delete/${id}`}>Delete</a></button>
                <button className='detailsButton'><a href={`/recipe/print/${id}`}>Print</a></button>
            </div>
            <br/><br/><br/>
            <div className='detailsHeader'>
                <div className='detailsWhite'>
                    <h1 className='RName'>Recipe Name</h1>
                    <h3 className='UName'>By User Name</h3>
                    <img height='320px' src={RecipePlaceholder} alt='Placeholder Image'/><br/><br/>
                    <button className='detailsButton'><a href='/recipe/reviews'>Reviews</a></button>
                </div>
            </div>
            <br/>
            <div className='detailsMain'>
                <div className='mainWhite'>
                    <h3>Description</h3><br/>
                    <p className='RDescription'></p><br/>
                    <h3>Story</h3><br/>
                    <p className='RStory'></p><br/>
                    <h3>Instructions</h3><br/>
                    <p className='RInstructions'></p><br/>
                    <h3>Tags</h3><br/>
                    <p className='RTags'></p><br/>
                </div>
            </div>
</div>
}

export default Details;