import React from 'react';
import ReactDOM from 'react-dom';
import {MDBBtn as Button} from 'mdb-react-ui-kit';
import {Recipe} from '../../components/classes/Recipe';

class Add extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            currentRecipe: new Recipe()
        }

    }
    fileSelectedHandler = event => {
        console.log(event.target.files[0]);
    }

    // TODO: Make a handler for keeping the image

    render () {
        return <div>
            <h1>Add a new recipe</h1>
            <form className="formBox" method="TODO: " action="TODO:">
                <div className="inputLabel">Recipe Image</div>
                <input type="file" accept="image/png,image/jpeg" onChange={this.fileSelectedHandler} />
                <div className="inputLabel">Title</div>
                <input type="text" name="title"/>
                <div className="inputLabel">Description</div>
                <textarea cols="80" rows="5" name="description"/>
                <div className="inputLabel">Story (optional)</div>
                <textarea cols="80" rows="5" name="story"/>
                <br/>
                {/* Button will need a backend ONCLICK function that asks the server to generate a story */}
                <Button color="dark" onclick="TODO: " name="btnGenerate">Generate Story</Button>
                <div className="inputLabel">Instructions</div>
                <textarea cols="80" rows="5" name="instructions"/>
                <div className="inputLabel">Keywords</div>
                <input type="text" name="keywords"/>
                <br/>
                <br/>
                <input type="submit" name="btnSubmit" value="Create Recipe"/>
            </form>
        </div>
    }
}

export default Add;