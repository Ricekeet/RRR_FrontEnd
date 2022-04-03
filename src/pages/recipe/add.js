import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {MDBBtn as Button} from 'mdb-react-ui-kit';
import Recipe from '../../components/classes/Recipe';

class Add extends React.Component{
    constructor(props){
        super(props);
        // states
        this.state = {
            recipeObj: {
                authorId: 1,
                cuisineId: null,
                name: "",
                creationDate: Date.now,
                servingCount: 0,
                story: "",
                difficulty: 0,
                imageFile: ""
            },
            stepCount: 0,
            steps: [],
            ingredients: []
        }

        // this.units = [
        //     {unit:"tsp",desc:"Teaspoon"},
        //     {unit:"tbsp",desc:"Tablespoon"},
        //     {unit:"fl oz",desc:"Fluid Ounce"},
        //     {unit:"cup",desc:"Cup"},
        //     {unit:"pt",desc:"Pint"},
        //     {unit:"qt",desc:"Quart"},
        //     {unit:"gal",desc:"Gallon"},
        //     {unit:"ml",desc:"Mililitres"},
        //     {unit:"l",desc:"Litres"},
        //     {unit:"dl",desc:"Decilitres"},
        // ];

        // bind methods
        this.validateInputs = this.validateInputs.bind(this);
        this.generateStory = this.generateStory.bind(this);
        this.updateStory = this.updateStory.bind(this);
        this.addStep = this.addStep.bind(this);
        this.delStep = this.delStep.bind(this);
        this.addIng = this.addIng.bind(this);
        this.delIng = this.delIng.bind(this);
        this.handleIngChange = this.handleIngChange(this);
        //this.handleMeasChange = this.handleMeasChange(this);
    }

    updateStory(){
        var newObj = this.state.recipeObj;
        newObj.story = document.getElementsByName("r_story")[0].value;

        this.setState({recipeObj: newObj});
    }
    
    fileSelectedHandler = event => {
        console.log(event.target.files[0]);
    }

    validateInputs(){
        var isValid = false;

        // Create Recipe Object
        var inputRecipe = new Recipe();
        inputRecipe.creationDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

        

        // TODO: input validation
        var errorMessages = "";

        // Database add
        if (isValid){

        }
        else{
            document.getElementsByName("message").value = errorMessages;
        }
    }

    generateStory(){
        // TODO: Ask API to generate story and get a response
    }

    addStep(){
        // count
        var count = this.state.stepCount + 1;
        this.setState((prevState) => ({stepCount: count}));
        console.log(this.state.stepCount);

        //step
        this.setState({steps: [...this.state.steps, ""]});
    }

    handleChange(e, index){
        this.state.steps[index] = e.target.value;
        this.setState({steps: this.state.steps});
    }

    delStep(index){
        this.state.steps.splice(index, 1);
        this.setState({steps: this.state.steps});

        // count
        var count = this.state.stepCount - 1;
        this.setState((prevState) => ({stepCount: count}));
        console.log(this.state.stepCount);
    }

    addIng(){
        //step
        this.setState({ingredients: [...this.state.ingredients, ""]});
    }

    handleIngChange(e, index){
        try {
        this.state.ingredients[index] = e.target.value;
        this.setState({ingredients: this.state.ingredients});
        } catch (error) {
            console.log(error);
        }
    }

    delIng(index){
        this.state.ingredients.splice(index, 1);
        this.setState({ingredients: this.state.ingredients});
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
                <div className="inputLabel">Story (optional)</div>
                <textarea cols="80" rows="5" name="r_story" onChange={this.updateStory} value={this.state.recipeObj.story}/>
                <br/>
                {/* Button will need a backend ONCLICK function that asks the server to generate a story */}
                <Button type='button' color="dark" name="btnGenerate">Generate Story</Button>
                <br/>
                <div className="inputLabel">Ingredients</div>
                {
                    this.state.ingredients.map((value, index) => {
                        return (
                            <div key={index}>
                                -
                                <input type='text' onChange={this.handleIngChange(index)} value={value}/>
                                {'  '}
                                <Button type='button' onClick={() =>this.delIng(index)} color='danger'>X</Button>
                            </div>
                        )
                    })
                }
                <br/>
                <Button type='button' color='dark' name='btnAddIng' onClick={this.addIng}>Add new ingredients</Button>
                <div className="inputLabel">Instructions</div>
                <br/>
                {
                    this.state.steps.map((description, index) => {
                        return (
                            <div key={index}>
                                Step {index + 1}:
                                <br/>
                                <textarea cols={70} rows={1} onChange={(e) =>this.handleChange(e,index)} type="text" value={description}/>
                                {'  '}
                                <Button type='button' onClick={() =>this.delStep(index)} color='danger'>X</Button>
                            </div>
                        )
                    })
                }
                <Button type='button' color='dark' name='btnAddStep' onClick={this.addStep}>Add new step</Button>
                <br/>
                <br/>
                <Button type='button' color='dark' name="btnCreateRecipe" onClick={this.validateInputs}>Create Recipe</Button>
            </form>
        </div>
    }
}

export default Add;