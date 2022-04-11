import React, { useEffect, useState } from 'react';
import {Navigate,useParams,useSearchParams} from 'react-router-dom';
import ReactDOM from 'react-dom';
import {MDBBtn as Button} from 'mdb-react-ui-kit';
import Recipe from '../../components/classes/Recipe';
import DBHandler from '../../components/classes/DBHandler.js';
import { isCompositeComponent } from 'react-dom/test-utils';

const Edit = props => {
    let {id} = useParams();
    console.log("ID:",id);

    // states
    const [recipeObj, setRecipe] = useState();
    const [stepCount, setStepCount] = useState(0);
    const [steps, setSteps] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [formErrors, setErrors] = useState([]);
    let errorMessages = [];
    let completed = false;
    // Recipe object from the Database.
    let dbRecipe;

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
        setRecipe(dbRecipe);
    }

    async function updateRecipe(){
        var newObj = recipeObj;
        console.log(newObj);
        newObj.Story = document.getElementsByName("r_story")[0].value;
        newObj.Name = document.getElementsByName("r_title")[0].value;

        console.log(recipeObj);
    }
    
    const fileSelectedHandler = event => {
        console.log(event.target.files[0]);
    }

    const clearErrors = () => {
        errorMessages = [];
        completed = false;
    }

    const addError = (message) =>{
        errorMessages.push(message);
    }

    function validateInputs(){
        // reset errors
        clearErrors();

        var isValid = true

        // ----------------------- Recipe Object -----------------------
        // Create Recipe Object
        var inputRecipe = recipeObj;
        //inputRecipe.CreationDate = new Date().toISOString().slice(0, 19).replace('T', ' ');


        if (recipeObj.Name == "")
            addError("You can not have an empty recipe name");
        // There should be more fields, but could not make enough time

        // ----------------------- Ingredients -----------------------
        if (ingredients.length <= 0)
            addError("You need at least one ingredient");

        var listErrors = 0;
        ingredients.forEach(element => {
            if (element == "")
                listErrors++;
        });
        if (listErrors > 0)
            addError("You have an empty ingredient text field");

        // ----------------------- Instructions -----------------------
        listErrors = 0;
        if (steps.length <= 0)
            addError("You need at least one step");
        
        steps.forEach(element => {
            if (element == "")
                listErrors++;
        });
        if(listErrors > 0)
            addError("You have an empty instructions text field");


        if (errorMessages.length > 0)
            isValid = false;

        console.log("errorMessages:", errorMessages);

        // Database add
        if (isValid){
            try{
                DBHandler.PUT_Recipe(id, inputRecipe);
                completed = true;
                addError("Your recipe was saved!");
            }catch(e){
                completed = false;
                addError("There was a problem with updating the recipe");
                console.log("Error:", e);
            }
        }

        setErrors(errorMessages);
    }

    function generateStory(){
        // TODO: Ask API to generate Story and get a response
    }

    function addStep(){
        // count
        setStepCount(prevState => prevState + 1)

        //step
        setSteps(steps => [...steps, ""]);
    }

    function handleChange(e, index){
        let stepArray = [...steps];
        stepArray[index] = e.target.value;
        setSteps(stepArray);
    }

    function delStep(index){
        let stepArray = [...steps];
        stepArray.splice(index,1);
        setSteps(stepArray);

        // count
        var count = stepCount - 1;
        setStepCount(count);
    }

    function addIng(){
        //ingredients
        setIngredients([...ingredients, ""]);
    }

    function handleIngChange(e, index){
        try {
            // setIngredients(items => items[index] = e.target.value);
            const updated = [...ingredients];
            updated[index] = e.target.value;
            setIngredients(updated);
        } catch (error) {
            console.log(error);
        }
    }

    function delIng(index){
        let updated = [...ingredients];
        updated.splice(index,1);
        setIngredients(updated);
        console.log("Ingredients after setIngredients:", ingredients);
    }

    return <div>
        <h1>Edit recipe</h1>
        <form className="formBox">
            {
                formErrors ? formErrors.map((description,index) =>{
                    return(
                        <div key={index} className={completed ? 'done':'error'}>
                            -{' '}{description}
                        </div>
                    )
                }) : ''
            }
            <div className="inputLabel">Recipe Image</div>
            <input type="file" accept="image/png,image/jpeg" onChange={fileSelectedHandler} name="imageFile"/>
            <div className="inputLabel">Name</div>
            <input type="text" name="r_title" onChange={updateRecipe}/>
            <div className="inputLabel">Story (optional)</div>
            <textarea cols="80" rows="5" name="r_story" onChange={updateRecipe}/>
            <br/>
            {/* Button will need a backend ONCLICK function that asks the server to generate a Story */}
            <Button type='button' color="dark" name="btnGenerate">Generate Story</Button>
            <br/>
            <div className="inputLabel">Ingredients</div>
            {
                ingredients.map((description, index) => {
                    return (
                        <div key={index}>
                            -{' '}
                            <input type='text' onChange={(e) =>handleIngChange(e,index)} value={description}/>
                            {' '}
                            <Button type='button' onClick={() =>delIng(index)} color='danger'>X</Button>
                        </div>
                    )
                })
            }
            <br/>
            <Button type='button' color='dark' name='btnAddIng' onClick={addIng}>Add new ingredients</Button>
            <div className="inputLabel">Instructions</div>
            <br/>
            {
                steps.map((description, index) => {
                    return (
                        <div key={index}>
                            Step {index + 1}:
                            <br/>
                            <textarea cols={70} rows={1} onChange={(e) =>handleChange(e,index)} type="text" value={description}/>
                            {' '}
                            <Button type='button' onClick={() =>delStep(index)} color='danger'>X</Button>
                        </div>
                    )
                })
            }
            <Button type='button' color='dark' name='btnAddStep' onClick={addStep}>Add new step</Button>
            <br/>
            <br/>
            <Button type='button' color='dark' name="btnCreateRecipe" onClick={validateInputs}>Create Recipe</Button>
        </form>
    </div>
}

export default Edit;