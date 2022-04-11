import React, {useEffect, useState} from 'react';
import {useParams,useNavigate} from 'react-router-dom';
import ReactDOM from 'react-dom';
import { MDBBtn as Button } from 'mdb-react-ui-kit';
import DBHandler from '../../components/classes/DBHandler.js';
import Home from '../home.js';

const DeleteRecipe = props =>{
    // get recipe ID
    let {id} = useParams();
    console.log("ID:",id);

    const nav = useNavigate();

    const [recipeObj, setRecipe] = useState();
    let dbRecipe;

    const deleteRecipe = () => {
        // TODO: Delete recipe request to API
        try{
            DBHandler.DELETE_Recipe(id);
            nav("/");
        }catch(e){
            console.log("Something went wrong with trying to delete the recipe:", e);
        }
    }

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
        document.getElementsByName("r_title")[0].value = dbRecipe.Name;
        document.getElementsByName("r_story")[0].value = dbRecipe.Story;
        document.getElementsByName("r_cuisineID")[0].value = dbRecipe.CuisineId;
        document.getElementsByName("r_difficulty")[0].value = dbRecipe.Difficulty;
        document.getElementsByName("r_personID")[0].value = dbRecipe.PersonId;
        document.getElementsByName("r_serving")[0].value = dbRecipe.ServingCount;

        setRecipe(dbRecipe);
    }

    return <div>
        <h1>Delete this Recipe?</h1>
        <form className="formBox">
            {/* <div className="inputLabel">Recipe Image</div>
            <input readOnly type="file" accept="image/png,image/jpeg" name="imageFile"/> */}
            <div className="inputLabel">Recipe ID</div>
            <input readOnly type="text" name="r_id" value={id}/>
            <div className="inputLabel">Name</div>
            <input readOnly type="text" name="r_title"/>
            <div className="inputLabel">Cuisine ID</div>
            <input readOnly type="text" name="r_cuisineID"/>
            <div className="inputLabel">Difficulty</div>
            <input readOnly type="text" name="r_difficulty"/>
            <div className="inputLabel">Person ID</div>
            <input readOnly type="text" name="r_personID"/>
            <div className="inputLabel">Serving Count</div>
            <input readOnly type="text" name="r_serving"/>
            <div className="inputLabel">Story (optional)</div>
            <textarea readOnly cols="80" rows="5" name="r_story"/>
            <br/>
            <br/>
            <div className="inputLabel">Ingredients</div>
            {
                // this.state.ingredients.map((description, index) => {
                //     return (
                //         <div key={index}>
                //             -{' '}
                //             <input readOnly type='text' value={description}/>
                //             {' '}
                //         </div>
                //     )
                // })
            }
            <br/>
            <div className="inputLabel">Instructions</div>
            <br/>
            {/* {
                this.state.steps.map((description, index) => {
                    return (
                        <div key={index}>
                            Step {index + 1}:
                            <br/>
                            <textarea readOnly cols={70} rows={1} type="text" value={description}/>
                            {' '}
                        </div>
                    )
                })
            } */}
            <br/>
            <br/>
            <Button type='button' color='danger' name="btnDeleteRecipe" onClick={deleteRecipe}>Delete Recipe</Button>
        </form>
    </div>
}

export default DeleteRecipe;