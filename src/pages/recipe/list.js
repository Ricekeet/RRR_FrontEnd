import {MDBBtn as Button} from 'mdb-react-ui-kit';
import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import DBHandler from '../../components/classes/DBHandler';

class RecipeList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            recipes: []
        }

        this.getRecipeList = this.getRecipeList.bind(this);
    }

    getRecipeList(){
        this.state.recipes = DBHandler.GET_ALL_Recipe();
        this.setState({recipes: this.state.recipes});
    }

    render(){
        return <div>
            <h1>Uploaded Recipes</h1>
            <Button type="button" onClick={this.getRecipeList}>Get recipe list</Button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>AuthorId</th>
                        <th>CreationDate</th>
                        <th></th>
                    </tr>
                    {
                        this.state.recipes.map((recipe, index) => {
                            console.log(recipe);
                            return (
                                <tr key={index}>
                                    <td>{recipe.Id}</td>
                                    <td>{recipe.Name}</td>
                                    <td>{recipe.AuthorId}</td>
                                    <td>{recipe.CreationDate}</td>
                                    <td>
                                        <Link to='/edit' id={recipe.Id}>Edit</Link>
                                        <Link to='/delete' id={recipe.Id}>Delete</Link>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </thead>
                <tbody>
                    {/* TODO: Fill with data */}
                </tbody>
            </table>
        </div>
    }
}

export default RecipeList;