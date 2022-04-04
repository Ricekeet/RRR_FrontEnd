import {MDBBtn as Button} from 'mdb-react-ui-kit';
import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import {Table} from 'react-bootstrap';
import DBHandler from '../../components/classes/DBHandler';

class RecipeList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            recipes: []
        }

        this.getRecipeList = this.getRecipeList.bind(this);
    }

    async getRecipeList(){
        let results = await DBHandler.GET_ALL_Recipe();
        console.log("geRecipeList results:", results);
        this.setState((prevState) => ({recipes: results}));
    }

    render(){
        return <div>
            <h1>Uploaded Recipes</h1>
            <Button type="button" onClick={this.getRecipeList}>Get recipe list</Button>
            <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>PersonId</th>
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
                                    <td>{item.PersonId}</td>
                                    <td>{item.CreationDate}</td>
                                    <td>
                                        <Button type='button' href={`/recipe/edit/${item.Id}`} color='info'>Edit</Button>
                                        <Button type='button' href={`/recipe/delete/${item.Id}`} color='danger'>Delete</Button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </thead>
                <tbody>
                    {/* TODO: Fill with data */}
                </tbody>
            </Table>
        </div>
    }
}

export default RecipeList;