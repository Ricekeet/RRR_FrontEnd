import React from 'react';
import ReactDOM from 'react-dom';
import {MDBBtn as Button} from 'mdb-react-ui-kit';
import Recipe from '../../components/classes/Recipe';
import Hashing from '../../components/classes/Hashing';

class Edit extends React.Component{
    constructor(props){
        super(props);
        this.recipe = null;
        this.generateID = this.generateID.bind(this);
        this.validateInputs = this.validateInputs.bind(this);
        this.createRecipeObj = this.createRecipeObj.bind(this);
        this.fillInputs();
    }

    fillInputs(){
        // TODO: Fill inputs on load
    }

    // TODO: fill with methods from add.js when finished

    
    render () {
        return <div>
            <h1>Edit recipe</h1>
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
                <Button type='button' color="dark" name="btnGenerate" onClick={this.generateStory}>Generate Story</Button>
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

export default Edit;