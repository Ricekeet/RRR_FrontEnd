import React from 'react';
import ReactDOM from 'react-dom';
import {MDBBtn as Button} from 'mdb-react-ui-kit';
import Recipe from '../../components/classes/Recipe';
import Hashing from '../../components/classes/Hashing';

class Add extends React.Component{
    constructor(props){
        super(props);
        this.recipe = null;
        this.generateID = this.generateID.bind(this);
        this.validateInputs = this.validateInputs.bind(this);
        this.createRecipeObj = this.createRecipeObj.bind(this);
    }
    fileSelectedHandler = event => {
        console.log(event.target.files[0]);
    }

    // Generates ID number
    generateID(){
        var hashKey = "";
        var title = document.getElementsByName("r_title")[0].value;
        var description = document.getElementsByName("r_description")[0].value;
        var instructions = document.getElementsByName("r_instructions")[0].value;
        hashKey = title + description + instructions;
        hashKey = hashKey.toLowerCase();

        //Doesn't work below this??
        var result = Hashing.generateHash(hashKey);
        return result;
    }

    getTagList(tagString){
        var tags = [];
        tags = tagString.split(" ").join("").split(",");
        return tags;
    }

    addToDatabase(recipe){
        // TODO: do API call
    }

    validateInputs(){
        var isValid = false;
        var newID = 0;
        newID = this.generateID();
        var inputRecipe = new Recipe(newID);
        inputRecipe.title = document.getElementsByName("r_title")[0].value;
        inputRecipe.description = document.getElementsByName("r_description")[0].value;
        inputRecipe.instructions = document.getElementsByName("r_instructions")[0].value;
        inputRecipe.authorId = null;
        inputRecipe.story = document.getElementsByName("r_story")[0].value;
        inputRecipe.tags = this.getTagList(document.getElementsByName("r_keywords")[0].value);

        // TODO: input validation
        var errorMessages = "";

        if (isValid){
            this.addToDatabase(inputRecipe);
        }
        else{
            document.getElementsByName("message").value = errorMessages;
        }
    }

    // TODO: Make a handler for keeping the image
    createRecipeObj(){
        this.recipe = new Recipe(this.generateID());
        return this;
    }

    generateStory(){
        // TODO: Ask API to generate story and get a response
    }

    render () {
        return <div>
            <h1>Add a new recipe</h1>
            <div name="message" className='error'></div>
            <form className="formBox">
                <div className="inputLabel">Recipe Image</div>
                <input type="file" accept="image/png,image/jpeg" onChange={this.fileSelectedHandler} name="imageFile"/>
                <div className="inputLabel">Title</div>
                <input type="text" name="r_title"/>
                <div className="inputLabel">Description</div>
                <textarea cols="80" rows="5" name="r_description"/>
                <div className="inputLabel">Story (optional)</div>
                <textarea cols="80" rows="5" name="r_story"/>
                <br/>
                {/* Button will need a backend ONCLICK function that asks the server to generate a story */}
                <Button type='button' color="dark" name="btnGenerate">Generate Story</Button>
                <div className="inputLabel">Instructions</div>
                <textarea cols="80" rows="5" name="r_instructions"/>
                <div className="inputLabel">Keywords (separated by ',' [comma])</div>
                <input type="text" name="r_keywords"/>
                <br/>
                <br/>
                <Button type='button' color='dark' name="btnCreateRecipe" onClick={this.validateInputs}>Create Recipe</Button>
            </form>
        </div>
    }
}

export default Add;