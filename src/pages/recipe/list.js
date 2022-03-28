import React from 'react';
import ReactDOM from 'react-dom';

class RecipeList extends React.Component{

    render(){
        return <div>
            <h1>Uploaded Recipes</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {/* TODO: Fill with data */}
                </tbody>
            </table>
        </div>
    }
}

export default RecipeList;