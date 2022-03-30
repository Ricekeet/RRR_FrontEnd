import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import no_image from '../img/no_image.png';

class Home extends React.Component{
    // for more info on fetch 
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    
    // info on odata
    // https://www.odata.org/getting-started/basic-tutorial/

    // odata 
    odataRecipe = "/v1/recipe";
    odataSingleRecipe = "/v1/recipe?$filter=id eq ";
    odataSingleIdRecipe = "/v1/recipe/";

    // file upload
    postImageURL = "";

    currentIp = process.env.REACT_APP_RRR_API;
    // the init function
    constructor(props) {
        super(props);
        this.state = {
            error:null,
            isLoaded:false,
            recipesStar: [],
            recipesSingle: [],
            mystatus:"",
            json:"",
            toDelete: "",
            singleImage: no_image,
        };

        // bind this for the on click
        this.selectStarFromRecipe = this.selectStarFromRecipe.bind(this);
        this.postRecipe = this.postRecipe.bind(this);
        this.onChangeDelete = this.onChangeDelete.bind(this);
        this.deleteRecipe = this.deleteRecipe.bind(this);
        this.putRecipe = this.putRecipe.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
        this.postUserImage = this.postUserImage.bind(this);
    }

    // this is where we call the api just one time
    // more times would be using a method like did update
    componentDidMount() {
        this.selectStarFromRecipe();
        this.selectSingleFromRecipe();
    }
    
    // SELECT * gets all items
    selectStarFromRecipe() {
        // this is our fetch string, it depends on the servers current ip
        // the current ip is set in RRR_FRONTEND/.env, same folder as readme
        // it also depends on the desired odata search, view above
        let fetchString = "http://"+this.currentIp+this.odataRecipe;

        // encapsulate into fetch object because why not
        let myRequest = new Request(fetchString);

        // run the fetch, set 'cors' to on
        // if cors means nothing to you just ignore it
        fetch(myRequest, {mode:"cors"})
        // we want json so parse immediately to it
        .then(res => res.json())
        .then(result => {
            // looking at the console our list is in result.value
            this.setState({recipesStar: result.value, isLoaded: true});
        },
        // on error set the state to reflect
        (error) => {
            this.setState({isLoaded:true,error});
        })
    }

    // selects a single item
    selectSingleFromRecipe() {
        let id = 1;
        let fetchString = "http://"+this.currentIp+this.odataSingleRecipe+id;

        let myRequest = new Request(fetchString);

        fetch(myRequest, {mode:"cors"})
        .then(res => res.json())
        .then(result => {
            this.setState({recipesSingle: result.value, isLoaded: true});
        },
        (error) => {
            this.setState({isLoaded:true,error});
        })

    }

    // POST is the equivalent to CREATE
    postRecipe() {
        // I don't feel like defining all the fields
        // so we are grabbing recipe one and updating it's id
        // then calling it a new recipe
        let id = 1;
        let fetchString = "http://"+this.currentIp+this.odataSingleRecipe+id;

        let myRequest = new Request(fetchString);

        fetch(myRequest, {mode:"cors"})
        .then(res => res.json())
        .then(result => {
            this.setState({recipesSingle: result.value, isLoaded: true});
        },
        (error) => {
            this.setState({isLoaded:true,error});
        })

        // given that we have id 1 lets update it
        let myRecipe = this.state.recipesSingle[0];
        let postString = "http://"+this.currentIp+this.odataRecipe;

        // we're getting a random number between 5 and 105
        myRecipe.Id = parseInt(myRecipe.Id) + Math.floor(Math.random()*100) + 5;
       
        // so lets run another fetch
        fetch(postString, 
            {method: "POST", mode: "cors",
            headers:{
                "Content-Type":"application/json",
            },
            // send the the entire object, recipe may have come in fine
            // but stringify it anyways, idk why
            body: JSON.stringify(myRecipe),
        })
        .then(response => response.json())
        .then(myRecipe => {
            console.log("Success:", myRecipe);
        })
        .catch((error) => {
            console.error("Error:", error)
        })
    }

    // DELETE PART 1
    // to handle the input for delete we need this on change
    onChangeDelete(event) {
        this.setState({toDelete:event.target.value});
    }

    // DELETE PART 2 
    // this deletes by id!
    deleteRecipe() {
        // get the id to delete from the state
        let id = this.state.toDelete;
        let deleteString = "http://"+this.currentIp+this.odataSingleIdRecipe+id;

        fetch(deleteString, 
            {method: "DELETE", mode: "cors"})
        .then(data => {
            console.log("Success: deleted " + id);
        })
        .catch((error) => {
            console.error("Error: no delete " + id);
        })
    }

    // PUT updates the entire item
    // we could use PATCH and it is implemented but CORS isn't set up for it
    // PATCH would allow you to send a single value instead of the entire object back
    putRecipe() {
        // i'm lazy, we update 1
        let id = 1;
        let fetchString = "http://"+this.currentIp+this.odataSingleRecipe+id;

        let myRequest = new Request(fetchString);

        // first get recipe 1
        fetch(myRequest, {mode:"cors"})
        .then(res => res.json())
        .then(result => {
            this.setState({recipesSingle: result.value, isLoaded: true});
        },
        (error) => {
            this.setState({isLoaded:true,error});
        })

        // given that we have id 1 lets update it
        // we ternary on it so we can keep clicking
        let myRecipe = this.state.recipesSingle[0];
        myRecipe.Name = myRecipe.Name === "chili dogs" ? "french omelette" : "chili dogs";

        let putString = "http://"+this.currentIp+this.odataSingleIdRecipe+id;
       
        fetch(putString, 
            {method: "PUT", mode: "cors",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify(myRecipe),
        })
        .then(data => {
            console.log("Success: updated " + id);
        })
        .catch((error) => {
            console.error("Error: no update " + id)
        })
    }

    onChangeImage(event) {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            this.setState({singleImage: URL.createObjectURL(img)});
        }
    }

    postUserImage() {
        // assume we are uploading for person of id 1
        let id = 1;
        const formData = new FormData();
         
        formData.append('personId', id);
        formData.append('personImage', this.state.singleImage);

        let postString = "http://"+this.currentIp+this.postImageURL+id;

        fetch(postString, {
            method: "PUT",
            mode: "cors",
            body: formData
        })
        .then(response => response.json())
        .then(result => {
            console.log("Success: uploaded image");
        })
        .catch(error => {
            console.error("Error: failed upload");
        });
    }

    // render method for putting things to page
    render () {
        // some shorthands from the this.state
        const {error, isLoaded, recipesStar: recipesStar, mystatus, 
            recipesSingle: recipesSingle,
            recipesUpdate: recipesUpdate,
        } = this.state;

        // if error, display
        if (error) {
            return <div>Error: {error.message} {mystatus}</div>;
        } 
        // if loading, display
        else if (!isLoaded) {
            return <div>Loading...</div>;
        } 
        // if fine return a list of recipes
        else {
            // for this use json map and key in the values set
            // jsons object.map is like a foreach
            return (
                <div className='contents'>
                <h1>Our Favorite Recipes</h1>
                <p>IP: {this.currentIp}</p>
                <h2>Select * from Recipe</h2>
                <input type="button" onClick={this.selectStarFromRecipe} value="Update"></input>
                <ul>
                    {recipesStar.map(value => (
                        <li key={value.Id}>
                            {value.Id} {value.Name}
                        </li>
                    ))}
                </ul>
                <h2>Select Single Recipe</h2>
                <ul>
                    {recipesSingle.map(value => (
                        <li key={value.Id}>
                            {value.Id} {value.Name}
                        </li>
                    ))}
                </ul>
                <h2>Post Single Recipe</h2>
                <input type="button" onClick={this.postRecipe} value="Insert"></input>
                <h2>Delete Single Recipe</h2>
                <input type="button" onClick={this.deleteRecipe} value="Delete"></input>
                <input type="text" onChange={this.onChangeDelete} value={this.state.toDelete}></input>
                <h2>Put/Update Single</h2>
                <input type="button" onClick={this.putRecipe} value="Update"></input>
                <h2>Post Single Image</h2>
                <img src={this.state.singleImage}></img>
                <input type="file" onChange={this.onChangeImage}></input>
                <input type="button" onClick={this.postUserImage} value="Save Image"></input>
                </div>
            );
        }
    }
}

export default Home;