import React, {useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import DBHandler from '../components/classes/DBHandler';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import RecipePlaceholder from '../img/pancake.jpg';

class Home extends React.Component{
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
            recipes:[],
            toSearch:"",
            recipesStar: {value:[]},
            imageStar:{value:[{}]},
        }

        this.getTop5 = this.getTop5.bind(this);
        this.onSearchClick = this.onSearchClick.bind(this);
        this.getRecipeImage = this.getRecipeImage.bind(this);
        this.determineFileType = this.determineFileType.bind(this);
        this.fillImage = this.fillImage.bind(this);
    }
    

    componentDidMount(){
        this.getTop5();
        this.onSearchClick()
    }

    async getTop5(){
        let results =  await DBHandler.GET_5_Recipe();
        this.setState((prevState) => ({recipes: results}));
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
        // Settings for Slider
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            className: "slides"
          };

        return (
            <div className='contents'>
            <h1>Our Favorite Recipes</h1>
            <Slider {...settings}>
              {this.state.recipes.map(recipe => {
                    console.log("recipe.Id:",recipe.Id);
                    console.log("recipe.Name:", recipe.Name);
                    return (
                        <div key={recipe.Id}>
                            <img width="20%" className='imageSlider' src={this.fillImage(recipe.Id)}/>
                            <h2>{recipe.Name}</h2>
                            <button className='detailsButtonH'><a href='/recipe/details'>View Recipe</a></button>
                            <button className='detailsButtonH'><a href='/account/profile'>View Author</a></button><br/>
                        </div>
                    )
                })}
            </Slider>
            </div>
        );
    }
}

export default Home;