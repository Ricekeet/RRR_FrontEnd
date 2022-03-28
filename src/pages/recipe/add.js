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
        console.log("checkpoint 3");
        var hashKey = "";
        var title = document.getElementsByName("r_title")[0].value;
        console.log("checkpoint 4");
        var description = document.getElementsByName("r_description")[0].value;
        console.log("checkpoint 5");
        console.log(Hashing.returnASCII_LIST);
        hashKey = (title+description).toLowerCase();
        var result = Hashing.generateHash(hashKey);
        console.log("checkpoint 6");
        return result;
    }

    validateInputs(){
        console.log("checkpoint 1");
        var newID = 0;
        newID = this.generateID();
        console.log("checkpoint 2");
        var inputRecipe = new Recipe(newID);
        console.log("checkpoint 7");
        console.log("NewID:", newID);
        console.log("InputRecipe Object:", inputRecipe);
        return this;
    }

    // TODO: Make a handler for keeping the image
    createRecipeObj(){
        this.recipe = new Recipe(this.generateID());
        return this;
    }

    render () {
        return <div>
            <h1>Add a new recipe</h1>
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
                <div className="inputLabel">Keywords</div>
                <input type="text" name="r_keywords"/>
                <br/>
                <br/>
                <Button type='button' color='dark' name="btnCreateRecipe" onClick={this.validateInputs}>Create Recipe</Button>
            </form>
        </div>
    }
}

export default Add;