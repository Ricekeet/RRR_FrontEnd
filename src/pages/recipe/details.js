import React, { useEffect, useState, useRef } from 'react';
import {useNavigate,useParams} from 'react-router-dom';
import ReactDOM from 'react-dom';
import DBHandler from '../../components/classes/DBHandler.js';
import RecipePlaceholder from '../../img/pancake.jpg';
import { useReactToPrint } from "react-to-print";

const Details = props => {
        // get recipe ID
        let {id} = useParams();
        console.log("ID:",id);
    
        const nav = useNavigate();
    
        const [recipeObj, setRecipe] = useState();
        let dbRecipe;

        const componentRef = useRef();
        const handlePrint = useReactToPrint({
            content: () => componentRef.current,
        });

    
        useEffect(async () => {
            let result = DBHandler.GET_Recipe(id);
            let object;
            await result.then((recipe) => {
                dbRecipe = recipe[0];
            });
            setRecipe(result[0]);
            setInputs();
        }, []);
    

    function setInputs(){
        document.getElementsByClassName('r_title')[0].innerHTML = dbRecipe.Name;
        document.getElementsByClassName("r_instructions")[0].innerHTML = dbRecipe.Details;
        document.getElementsByClassName("r_story")[0].innerHTML = dbRecipe.Story;
        setRecipe(dbRecipe);
    }

    return <div>
    <h1>Recipe</h1><br/>
            <div className='detailsButtons'>
                <button className='detailsButton'><a href={`/recipe/edit/${id}`}>Edit</a></button>
                <button className='detailsButton'><a href={`/recipe/delete/${id}`}>Delete</a></button>
                <button className='detailsButton' onClick={handlePrint}>Print</button>
            </div>
            <br/><br/><br/>
            <div ref={componentRef}>
            <div className='detailsHeader'>
                <div className='detailsWhite'>
                    <h1 className='r_title'>Recipe Name</h1>
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
                    <p className='r_story'></p><br/>
                    <h3>Instructions</h3><br/>
                    <p className='r_instructions'></p><br/>
                    <h3>Tags</h3><br/>
                    <p className='RTags'></p><br/>
                </div>
            </div>
            </div>
</div>
}

export default Details;