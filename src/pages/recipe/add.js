import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {MDBBtn as Button} from 'mdb-react-ui-kit';
import Recipe from '../../components/classes/Recipe';
import DBHandler from '../../components/classes/DBHandler.js';

class Add extends React.Component{
    constructor(props){
        super(props);
        // states
        this.state = {
            recipeObj: {
                '@odata.context': 'http://3.91.33.41/v1/$metadata#Recipe/$entity',
                PersonId: 1,
                CuisineId: 1,
                Name: "",
                CreationDate: Date.now,
                ServingCount: 1,
                Story: "",
                Difficulty: 1,
            },
            stepCount: 0,
            steps: [],
            ingredients: [],
            errorMessages: []
        }

        // bind methods
        this.validateInputs = this.validateInputs.bind(this);
        this.generateStory = this.generateStory.bind(this);
        this.updateRecipe = this.updateRecipe.bind(this);
        this.addStep = this.addStep.bind(this);
        this.delStep = this.delStep.bind(this);
        this.addIng = this.addIng.bind(this);
        this.delIng = this.delIng.bind(this);
        this.handleIngChange = this.handleIngChange.bind(this);
    }

    updateRecipe(){
        var newObj = this.state.recipeObj;
        newObj.Story = document.getElementsByName("r_Story")[0].value;
        newObj.Name = document.getElementsByName("r_title")[0].value;

        this.setState({recipeObj: newObj});
    }
    
    fileSelectedHandler = event => {
        console.log(event.target.files[0]);
    }

    validateInputs(){
        // reset errors
        this.state.errorMessages = [];
        this.setState({errorMessages: this.state.error});

        var isValid = true

        // ----------------------- Recipe Object -----------------------
        // Create Recipe Object
        var inputRecipe = this.state.recipeObj;
        inputRecipe.CreationDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

        // TODO: input validation

        if (this.state.recipeObj.Name == "")
            this.state.errorMessages.push("Recipe Name can't be empty");
        // There should be more fields, but could not make enough time

        // ----------------------- Ingredients -----------------------
        if (this.state.ingredients.length <= 0)
            this.state.errorMessages.push("You need at least one ingredient");

        var listErrors = 0;
        this.state.ingredients.forEach(element => {
            if (element == "")
                listErrors++;
        });
        if (listErrors > 0)
            this.state.errorMessages.push("You have an empty ingredient text field");


        // ----------------------- Instructions -----------------------
        listErrors = 0;
        if (this.state.steps.length <= 0)
            this.state.errorMessages.push("You need at least one step!");
        
        this.state.steps.forEach(element => {
            if (element == "")
                listErrors++;
        });
        if(listErrors > 0)
            this.state.errorMessages.push("You have an empty instructions text field");

        if (this.state.errorMessages != "")
            isValid = false;

        // Database add
        if (isValid){
            DBHandler.POST_Recipe(inputRecipe);
        }
        else{
            this.setState({errorMessages: this.state.errorMessages});
        }
    }

    generateStory(){
        // TODO: Ask API to generate Story and get a response
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
            <form className="formBox">
                {
                    this.state.errorMessages ? this.state.errorMessages.map((description,index) =>{
                        return(
                            <div key={index} className='error'>
                                -{' '}{description}
                            </div>
                        )
                    }) : ''
                }
                <div className="inputLabel">Recipe Image</div>
                <input type="file" accept="image/png,image/jpeg" onChange={this.fileSelectedHandler} name="imageFile"/>
                <div className="inputLabel">Name</div>
                <input type="text" name="r_title" onChange={this.updateRecipe}/>
                <div className="inputLabel">Story (optional)</div>
                <textarea cols="80" rows="5" name="r_Story" onChange={this.updateRecipe}/>
                <br/>
                {/* Button will need a backend ONCLICK function that asks the server to generate a Story */}
                <Button type='button' color="dark" name="btnGenerate">Generate Story</Button>
                <br/>
                <div className="inputLabel">Ingredients</div>
                {
                    this.state.ingredients.map((description, index) => {
                        return (
                            <div key={index}>
                                -{' '}
                                <input type='text' onChange={(e) =>this.handleIngChange(e,index)} value={description}/>
                                {' '}
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
                                {' '}
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