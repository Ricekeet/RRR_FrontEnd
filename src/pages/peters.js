import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import no_image from '../img/no_image.png';

class Peters extends React.Component{
    // for more info on fetch
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

    // info on odata
    // https://www.odata.org/getting-started/basic-tutorial/

    // OData
    // the tables can be viewed here http://3.91.33.41/v1/$metadata
    // available OData commands are get, select, filter, expand, count, they can be found in program.cs

    // OData examples
    // get everything from account mangager http://3.91.33.41/v1/accountmanager
    // select only season name form season http://3.91.33.41/v1/season?select=seasonname
    // select personid, name, story from recipe http://3.91.33.41/v1/recipe?select=personid,name,story
    // get all courses for recipeid 1 http://3.91.33.41/v1/courselist?filter=recipeid%20eq%201
    //      normally formatted as "http://3.91.33.41/v1/courselist?filter=recipeid eq 1"
    // expand instruction on recipe http://3.91.33.41/v1/instruction?expand=recipe
    // count every item in person http://3.91.33.41/v1/person?count=true
    //      this appears in the pair "@odata.count":5 at the start of the string

    // each table has a basic get 
    odataRecipe = "/v1/recipe";
    // we are using the filter command, its like select
    odataSingleRecipe = "/v1/recipe?$filter=id eq ";
    odataSingleIdRecipe = "/v1/recipe/";

    // person upload
    // the file tables are probably a little messed up
    // you are given a table that maps back to the main table
    // so that we do not give away location information on the disk
    // but they should work in the same way as they are OData tables
    odataPersonImage = "/v1/imagepersonimplementation";
    odataSinglePersonImage = "/v1/imagepersonimplementation?$filter=id eq ";

    // recipe upload
    odataRecipeImage = "/v1/imagerecipeimplementation";

    // img header
    jpgDecoder = "data:image/jpg;base64,";
    pngDecoder = "data:image/png;base64,";

    // ips
    // this will force you to talk to the db on AWS
    currentIp = process.env.REACT_APP_RRR_API;
    //currentIp = process.env.REACT_APP_LOCAL_HOST;
    //currentIp = process.env.REACT_APP_LOCAL_HOST2;
    
    // https
    // note are currently only using http
    myHttp = "http://";
    //myHttps = "https://";
    
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
            singleImage: {Image:no_image, FileType:""},
            recipeImageStar: [],
            recipeObj : {
            '@odata.context': 'http://3.91.33.41/v1/$metadata#Recipe/$entity',
            PersonId: 1,
            CuisineId: 1,
            Name: "",
            CreationDate: Date.now,
            ServingCount: 1,
            Story: "",
            Difficulty: 1,
        }
        };

        // bind this for the on click
        this.selectStarFromRecipe = this.selectStarFromRecipe.bind(this);
        this.postRecipe = this.postRecipe.bind(this);
        this.onChangeDelete = this.onChangeDelete.bind(this);
        this.deleteRecipe = this.deleteRecipe.bind(this);
        this.putRecipe = this.putRecipe.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
        //this.postUserImage = this.postUserImage.bind(this);
        this.putUserImage = this.putUserImage.bind(this);
        this.getUserImage = this.getUserImage.bind(this);
        this.selectStarFromRecipeImage = this.selectStarFromRecipeImage.bind(this);
    }

    // this is where we call the api just one time
    // more times would be using a method like did update
    componentDidMount() {
        this.selectStarFromRecipe();
        this.selectSingleFromRecipe();
        this.selectStarFromRecipeImage();
    }
    
    // SELECT * gets all items
    selectStarFromRecipe() {
        // this is our fetch string, it depends on the servers current ip
        // the current ip is set in RRR_FRONTEND/.env, same folder as readme
        // it also depends on the desired odata search, view above
        let fetchString = this.myHttp+this.currentIp+this.odataRecipe;

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
        let fetchString = this.myHttp+this.currentIp+this.odataSingleRecipe+id;

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
        let fetchString = this.myHttp+this.currentIp+this.odataSingleRecipe+id;

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
        delete myRecipe.Id;
        let postString = this.myHttp+this.currentIp+this.odataRecipe;
        /*
        let myObj = {
            @odata.context: "https://localhost:7024/v1/$metadata#Recipe/$entity",
            PersonId: 1,
            CusineId: null,
            Name: "",
            CreationDate: Date.now,
            ServingCount: 0,
            Story: "",
            Difficulty: 0
        }
        */

        let myObj = {
            "@odata.context":"https://localhost:7024/v1/$metadata#Recipe/$entity",
            "Id":0,
            "PersonId":1,
            "CuisineId":1,
            "Name":"banana pancakes",
            "CreationDate":"2022-02-22T00:00:00-05:00",
            "ServingCount":4,
            "Story":"with great power comes great responsibility",
            "Difficulty":2
        }
        /*
        /*
        myRecipe.PersonId = 1;
        myRecipe.CusineId = null;
        myRecipe.
        */

        // we're getting a random number between 5 and 105
        //myRecipe.Id = parseInt(myRecipe.Id) + Math.floor(Math.random()*100) + 5;
        let recipeObj = {
            '@odata.context': 'http://3.91.33.41/v1/$metadata#Recipe/$entity',
            PersonId: 1,
            CuisineId: 1,
            Name: "",
            CreationDate: Date.now,
            ServingCount: 1,
            Story: "",
            Difficulty: 1,
        }
        // so lets run another fetch
        fetch(postString, 
            {method: "POST", mode: "cors",
            headers:{
                "Content-Type":"application/json",
            },
            // send the the entire object, recipe may have come in fine
            // but stringify it anyways, idk why
            body: JSON.stringify(this.state.recipeObj),
        })
        .then(response => response.json())
        .then(myRecipe => {
            console.log("Success:", JSON.stringify(myRecipe));
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
        let deleteString = this.myHttp+this.currentIp+this.odataSingleIdRecipe+id;

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
        let fetchString = this.myHttp+this.currentIp+this.odataSingleRecipe+id;

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

        let putString = this.myHttp+this.currentIp+this.odataSingleIdRecipe+id;
       
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

    // IMAGES
    onChangeImage(event) {
         if (event.target.files && event.target.files[0]) {
                this.convertImage(event.target.files[0]);
        }
    }

    // this converts an image from blob type to base64 using a promise
    convertImage(image) {
        // if promises are confusing, they are basically async/await
        // the syntax can be reviewed here https://www.w3schools.com/js/js_promise.asp
        // and here https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
        let convertPromise = new Promise((resolve, reject) => {
                // so we can use promises with filereader we are wrapping
                // it's event listener callbacks as resolve and reject
                let reader = new FileReader();

                reader.readAsDataURL(image);
                reader.addEventListener("loadend", () => resolve(reader.result));
                reader.addEventListener("error", () => reject());
        });

        // here we are calling the promise
        convertPromise
        .then((data) => {
            let myImage = this.state.singleImage;
            let myOut = this.splitImage(data);

            myImage.Image = myOut[1];
            myImage.FileType = myOut[0];

            this.setState({singleImage: myImage});
            console.log("Success: image converted")
        })
        .catch((error) => console.error("Error: " + error))
    }
   
    // this updates an image for a selected user
    // one is the intended user in this case
    putUserImage() {
        // assume we are uploading for person of id 1
        let id = 1;
        let myImage = this.state.singleImage; 

        let bodyToPost = {};
        bodyToPost.Id = id;
        bodyToPost.PersonId = id;
        bodyToPost.Location = "";
        bodyToPost.Image = myImage.Image;
        bodyToPost.FileType = myImage.FileType;
        
        let postString = this.myHttp+this.currentIp+this.odataPersonImage+"/"+id;

        fetch(postString, {
            method: "PUT",
            mode: "cors",
            body: JSON.stringify(bodyToPost),
            headers :{
                "Content-Type": "application/json"
            }
        })
        .then(result => {
            console.log("Success: uploaded image");
        })
        .catch(error => {
            console.error("Error: failed upload");
        });
    }

    // we want our image split into header and image for transport
    splitImage(image) {
        // images as base 64 have a header and a body
        // we do not want the body in our image so get red of that
        let headerString = image.substring(0, image.indexOf(",") + 1)
        let imageString = image.substring(image.indexOf(",") + 1);

        return [headerString, imageString];
    }
    
    getUserImage() {
        // assume we are uploading for person of id 1
        let id = 1;
 
        let getString = this.myHttp+this.currentIp+this.odataSinglePersonImage+id;

        this.setState({isLoaded: false});

        fetch(getString, {mode:"cors", method:"GET"})
        .then(res => res.json())
        .then(result => {
            result.value[0] = this.determineFileType(result.value[0]); 
            this.setState({
                singleImage: result.value[0],
                isLoaded: true
            });
        })
        .catch((error) => {
            this.setState({isLoaded:true, error});
        });

    }

    determineFileType(file) {
        if (file.FileType == "jpg") {
            file.FileType = this.jpgDecoder;
        } else if (file.FileType == "png") {
            file.FileType = this.pngDecoder;
        }
        return file;
    }

    selectStarFromRecipeImage() {
        // assume we are uploading for person of id 1
 
        let getString = this.myHttp+this.currentIp+this.odataRecipeImage;

        this.setState({isLoaded: false});

        fetch(getString, {mode:"cors", method:"GET"})
        .then(res => res.json())
        .then(result => {
            let myResultArray = [];
            result.value.map(value => {
                value = this.determineFileType(value);
                myResultArray.push(value);
            });
            this.setState({
                recipeImageStar: myResultArray,
                isLoaded: true
            });
        })
        .catch((error) => {
            this.setState({isLoaded:true, error});
        });

    }
    // render method for putting things to page
    render () {
        // some shorthands from the this.state
        const {error, isLoaded, recipesStar: recipesStar, mystatus, 
            recipesSingle: recipesSingle,
            recipesUpdate: recipesUpdate,
            recipeImageStar: recipeImageStar,
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
                <h2>Put User Image</h2>
                <img src={this.state.singleImage.FileType + this.state.singleImage.Image}></img>
                <br/>
                <input type="file" onChange={this.onChangeImage}></input>
                <input type="button" onClick={this.putUserImage} value="Update Image"></input>
                <h2>Get User Image</h2>
                <input type="button" onClick={this.getUserImage} value="Get User Image"></input>
                <h2>Get Recipe Images</h2>
                <input type="button" onClick={this.selectStarFromRecipeImage} value="Get Recipe Images"></input>
                <ul>
                    {recipeImageStar.map(value => (
                        <li key={value.Id}>
                            {value.Id} {value.Name} <img src={value.FileType + value.Image}></img>
                        </li>
                    ))}
                </ul>
                </div>
            );
        }
    }
}

export default Peters;