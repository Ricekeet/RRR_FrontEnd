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
        let results = DBHandler.GET_ALL_Recipe();
        console.log("geRecipeList results:", results);
        this.setState((prevState) => ({recipes: results}));
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
                        this.state.recipes.map((item, index) => {
                            console.log(item);
                            return (
                                <tr key={index}>
                                    <td>{item.Id}</td>
                                    <td>{item.Name}</td>
                                    <td>{item.AuthorId}</td>
                                    <td>{item.CreationDate}</td>
                                    <td>
                                        <Link to='/edit' id={item.Id}>Edit</Link>
                                        <Link to='/delete' id={item.Id}>Delete</Link>
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