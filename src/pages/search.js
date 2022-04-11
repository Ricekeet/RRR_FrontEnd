import { isValidDateValue } from '@testing-library/user-event/dist/utils';
import React from 'react';
import ReactDOM from 'react-dom';
import Recipe from '../components/classes/Recipe';
import RecipePlaceholder from '../img/pancake.jpg';

class SearchRecipes extends React.Component{
    // vars for search
    //currentIp = process.env.REACT_APP_LOCAL_HOST;
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
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.onSearchClick = this.onSearchClick.bind(this);
        this.getRecipeImage = this.getRecipeImage.bind(this);
        this.determineFileType = this.determineFileType.bind(this);
        this.fillImage = this.fillImage.bind(this);
    }
    // get the information from the search input
    onChangeSearch(event) {
        this.setState({toSearch:event.target.value});
    }

    // TEXT SEARCH
    // act on clicking search
    // this is done without forms because react
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

    render () {
        return <div>
            <h1>Search Recipe</h1>
            <div className='keySearch'>
                <form method='TODO: ' action='TODO: '>
                    <label for="gsearch">Keyword Search</label>
                    <input type="search" id="ksearch" name="ksearch" onChange={this.onChangeSearch}
                        value={this.state.toSearch}></input>
                    <input type="button" onClick={this.onSearchClick} value="Search"></input>
                </form>
            </div>
            <br/><br/>
            <div className='buttonsSearch'>
                <button className='profileButton'><a href='#'>Advanced Search</a></button>
                <form method='TODO: ' action='TODO: '>
                        <h4>Sort Recipes</h4>
                        <select size="1" name="sort">
                        <option value='rating'>Ratings</option>
                        <option value='new'>Newest</option>
                        <option value='old'>Oldest</option>
                        </select>
                </form>
            </div>
            {this.state.recipesStar.value.map(value => 
                <>
                {value.Recipes.map(Recipes => {
                    return( // this zoo is a nested map to allow users with multiple recipes to be viewed
                        <>
                        <br/><br/>
                        <div className='recipeBox'>
                            <div className='recipePicture'>
                                <img height='220px' src={this.fillImage(Recipes.Id)} alt={Recipes.Name}/>                       
                            </div>
                            <div className='recipeInfo'>
                                <h3><a href={`/recipe/details/${Recipes.Id}`}>{Recipes.Name}</a></h3>
                                <p>{value.Username}</p>
                                <br/>
                                <p>{Recipes.Story}</p>
                            </div>    
                        </div>
                        </>
                    )}
                )}
                </>
            )}
    </div>
    }
}
// {this.imageStar.value[Recipes.Id].FileType + this.imageStar.value[Recipes.Id].Image} alt='Placeholder Image'/>
// <img height='220px' src={this.state.imageStar.value[Recipes.Id].FileType + this.state.imageStar.value[Recipes.Id].Image} alt='Placeholder Image'/>

export default SearchRecipes;