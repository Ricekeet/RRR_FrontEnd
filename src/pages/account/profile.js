import React from 'react';
import ReactDOM from 'react-dom';
import ProfilePlaceholder from '../../img/profile_placeholder.jpg';
import RecipePlaceholder from '../../img/pancake.jpg';
import {MDBBtn as Button} from 'mdb-react-ui-kit';

class Profile extends React.Component{

    currentIp = process.env.REACT_APP_RRR_API;
    myHttp = "http://";

    // img header
    jpgDecoder = "data:image/jpg;base64,";
    pngDecoder = "data:image/png;base64,";

    constructor(props) {
        super(props);
        this.state = {
            toSearch:"",
            recipesStar: {value:[]},
            imageStar:{value:[{}]},
        };

        // bind handlers
        this.onSearchClick = this.onSearchClick.bind(this);
        this.getRecipeImage = this.getRecipeImage.bind(this);
        this.determineFileType = this.determineFileType.bind(this);
        this.fillImage = this.fillImage.bind(this);
    }

    // TEXT SEARCH
    onSearchClick() {
        // so far we can search on Recipes Name and Story fields
        let searchStringBase = "/v1/person?$expand=recipes(filter=";
        // want to search another area? add a new contains
        let searchInName = "contains(Name, '" + this.state.toSearch + "') eq true or ";
        let searchInStory = "contains(Story, '" + this.state.toSearch + "') eq true)";

        let searchString = searchStringBase + searchInName + searchInStory;
        let fetchString = this.myHttp+this.currentIp+searchString;
        let myRequest = new Request(fetchString);

        let recipeIds = [];

        fetch(myRequest, {mode:"cors"})
        .then(res => res.json())
        .then(result => {
            let myarray = []
            console.log("Success: got " + result.value.length + " items");

            // we don't want any values with no recipes
            result.value.map(value => {
                if (value.Recipes.length > 0) {
                    value.Recipes.map(singleRecipe => {
                        recipeIds.push(singleRecipe.Id);
                    })
                    myarray.push(value);
                }
            })
            result.value = myarray;
            this.setState({recipesStar: result});
        })
        .catch((error) => {
            console.log("Error: " + error);
        })
        // we can chain promises, so we do
        .then(() => {
            console.log("Fetching images..");
            this.getRecipeImage(recipeIds);
        })
        .catch(error => console.log("Error: " + error));
    }
    
    // IMAGE SEARCH START
    getRecipeImage(idArray) {
        // we need to use in, we want every item in the list
        // review here https://docs.microsoft.com/en-us/odata/webapi/in-operator
        let searchStringBase = "/v1/imagerecipeimplementation?filter=recipeId in (";
        let searchFind = "";
        idArray.map(item => {
           searchFind += item + ",";
        });
        // -1 is a null character to end the query
        searchFind += "-1)";

        let searchString = searchStringBase + searchFind;
        let fetchString = this.myHttp+this.currentIp+searchString;
        
        this.setState({isLoaded: false});

        fetch(fetchString, {mode:"cors", method:"GET"})
        .then(res => res.json())
        .then(result => {
            console.log("Success: got " + result.value.length + " items");
            result.value.map(item => {
                item = this.determineFileType(item);
            });
            this.setState({
                imageStar: result,
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

    fillImage(id) {
        let myItem;
        this.state.imageStar.value.map(item => {
            if (item.RecipeId == id) {
                myItem = JSON.parse(JSON.stringify(item));
            }
        });
        // some of are items have no images..
        if (myItem !== undefined) {
            return myItem.FileType + myItem.Image
        }
        else {
            return RecipePlaceholder;
        }
    }
    // IMAGE SEARCH END

    componentDidMount() {
        this.onSearchClick()
    }

    render () {
        return <div>
            <h1>Profile</h1>           
            <div className='aboutBox'>
                <div className='main'>
                    <h3>User Name</h3>
                    <img height='320px' src={ProfilePlaceholder} alt='Placeholder Image'/>
                </div>
                <div className='side'>
                    <h4>All About Me</h4>
                    <br/>
                    <p>Text About me</p>
                </div>               
            </div>
            <br/>
            <div className='profileButtons'>
                <div className='buttonSide'>
                    <button className='profileButton'><a href='/recipe/add'>Create Recipe</a></button>
                    <button className='profileButton'><a href='/account/editprofile'>Edit Profile</a></button>
                    <button className='profileButton'><a href='/account/#'>Favourites</a></button>
                </div>
                <div className='buttonSort'>
                    <form method='TODO: ' action='TODO: '>
                        <h4>Sort Recipes</h4>
                        <select size="1" name="sort">
                        <option value='rating'>Ratings</option>
                        <option value='new'>Newest</option>
                        <option value='old'>Oldest</option>
                        </select>
                    </form>
                </div>            
            </div>
            {this.state.recipesStar.value.map(value => 
                <>
                {value.Recipes.map(Recipes => {
                    return(
                        <>
                        <br/><br/>
                        <div className='recipeBoxP'>
                            <div className='recipePictureP'>
                                <img height='220px' src={this.fillImage(Recipes.Id)} alt={Recipes.Name}/>                       
                            </div>
                            <div className='recipeInfoP'>
                                <h3>{Recipes.Name}</h3>
                                <p>{value.Username}</p>
                                <br/>
                                <p>{Recipes.Story}</p>
                            </div> 
                            <div className='recipeButtonsP'>
                                <button className='profileButton'><a href={`/recipe/edit/${Recipes.Id}`}>Edit</a></button>
                                <button className='profileButton'><a href={`/recipe/delete/${Recipes.Id}`}>Delete</a></button>
                                <button className='profileButton'><a href={`/recipe/print/${Recipes.Id}`}>Print</a></button>
                            </div>   
                        </div>
                        </>
                    )}
                )}
                </>
            )}
            {/* <br/><br/>
                <div className='recipeBoxP'>
                    <div className='recipePictureP'>
                        <img height='220px' src={RecipePlaceholder} alt='Placeholder Image'/>
                    </div>
                    <div className='recipeInfoP'>
                        <h3>Recipe Name</h3>
                        <p>Author Name</p>
                        <br/>
                        <p>Recipe details</p>
                    </div>  
                    <div className='recipeButtonsP'>
                        <button className='detailsButtonP'><a href='/recipe/edit'>Edit</a></button><br/>
                        <button className='detailsButtonP'><a href='/recipe/delete'>Delete</a></button><br/>
                        <button className='detailsButtonP'><a href='#'>Print</a></button>
                    </div>  
                </div> */}
        </div>
    }
}

export default Profile;