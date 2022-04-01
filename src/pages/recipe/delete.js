import React from 'react';
import ReactDOM from 'react-dom';
import { MDBBtn as Button } from 'mdb-react-ui-kit';

class DeleteRecipe extends React.Component{

    deleteRecipe(){
        // TODO: Delete recipe request to API
    }

    render () {
        return <div>
            <h1>Delete this Recipe?</h1>
            <form className="formBox">
                <div className="inputLabel">Recipe Image</div>
                <input type="file" accept="image/png,image/jpeg" onChange={this.fileSelectedHandler} name="imageFile"/>
                <div className="inputLabel">Title</div>
                <input type="text" name="r_title" readOnly/>
                <div className="inputLabel">Description</div>
                <textarea cols="80" rows="5" name="r_description"readOnly/>
                <div className="inputLabel">Story (optional)</div>
                <textarea cols="80" rows="5" name="r_story" readOnly/>
                <br/>
                <div className="inputLabel">Instructions</div>
                <textarea cols="80" rows="5" name="r_instructions" readOnly/>
                <div className="inputLabel">Keywords</div>
                <input type="text" name="r_keywords" readOnly/>
                <br/>
                <br/>
                <Button type='button' color='dark' name="btnCreateRecipe" onClick={this.deleteRecipe}>Delete Recipe</Button><br/><br/>
                <Button type='button' color='dark' name="btnCreateRecipe" onClick="window.history.go(-1); return false;">Cancel</Button>
            </form>
        </div>
    }
}

export default DeleteRecipe;