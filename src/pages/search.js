import React from 'react';
import ReactDOM from 'react-dom';
import RecipePlaceholder from '../img/pancake.jpg';

class SearchRecipes extends React.Component{
    // vars for search
    currentIp = process.env.REACT_APP_LOCAL_HOST;
    myHttp = "https://";
    searchString = "v1/recipe?filter=contains(name, '" + this.state.toSearch + "')";k

    constructor(props) {
        super(props);
        this.state = {
            toSearch:"",
            recipesStar: [],
        };

        // bind handlers
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.onSearchClick= this.onSearchClick.bind(this);
    }
    // get the information from the search
    onChangeSearch(event) {
        console.log(event.target.value);
        this.setState({toSearch:event.target.value});
    }

    onSearchClick() {
        let searchString = "v1/recipe?filter=contains(name, '" + this.state.toSearch + "')";

        let fetchString = this.myHttp+this.currentIp+this.odataRecipe+searchString;

        let myRequest = new Request(fetchString);

        fetch(myRequest, {mode:"cors"})
        .then(res => res.json())
        .then(result => {
            console.log("Success: got items");
            this.setState({recipesStar: result.value});
        })
        .catch((error) => {
            console.log("Error: " + error);
        })
    }

    render () {
        return <div>
            <h1>Search Recipe</h1>
            <div className='keySearch'>
                <form method='TODO: ' action='TODO: '>
                    <label for="gsearch">Keyword Search</label>
                    <input type="search" id="ksearch" name="ksearch" onChange={this.onChangeSearch}
                        value={this.state.toSearch}></input>
                    <input type="submit" onCLick={this.onSearchClick}></input>
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
            <br/><br/>
            <div className='recipeBox'>
                <div className='recipePicture'>
                    <img height='220px' src={RecipePlaceholder} alt='Placeholder Image'/>
                </div>
                <div className='recipeInfo'>
                    <h3>Recipe Name</h3>
                    <p>Author Name</p>
                    <br/>
                    <p>Recipe details</p>
                </div>    
            </div>
        </div>
    }
}

export default SearchRecipes;