import { isValidDateValue } from '@testing-library/user-event/dist/utils';
import React from 'react';
import ReactDOM from 'react-dom';
import RecipePlaceholder from '../img/pancake.jpg';

class SearchRecipes extends React.Component{
    // vars for search
    currentIp = process.env.REACT_APP_LOCAL_HOST;
    myHttp = "https://";

    constructor(props) {
        super(props);
        this.state = {
            toSearch:"",
            recipesStar: {value:[]},
        };

        // bind handlers
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.onSearchClick= this.onSearchClick.bind(this);
    }
    // get the information from the search input
    onChangeSearch(event) {
        this.setState({toSearch:event.target.value});
    }

    // act on clicking search
    // this is done without forms because react
    onSearchClick() {
        let searchString = "/v1/person?$expand=recipes(filter=contains(Name, '" + this.state.toSearch + "'))";
        let fetchString = this.myHttp+this.currentIp+searchString;
        let myRequest = new Request(fetchString);

        fetch(myRequest, {mode:"cors"})
        .then(res => res.json())
        .then(result => {
            let myarray = []
            console.log("Success: got " + result.value.length + " items");

            // we don't want any values with no recipes
            result.value.map(value => {
                if (value.Recipes.length > 0)
                    myarray.push(value);
            })
            
            result.value = myarray;
            this.setState({recipesStar: result});
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
                                <img height='220px' src={RecipePlaceholder} alt='Placeholder Image'/>
                            </div>
                            <div className='recipeInfo'>
                                <h3>{Recipes.Name}</h3>
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

/*{this.state.recipesStar.value.map(value => (
            <>
            <br/><br/>
            <div className='recipeBox'>
                <div className='recipePicture'>
                    <img height='220px' src={RecipePlaceholder} alt='Placeholder Image'/>
                </div>
                <div className='recipeInfo'>
                    <h3>{value.Recipes.Name}</h3>
                    <p>{value.Username}</p>
                    <br/>
                    <p>{value.Recipes.story}</p>
                </div>    
            </div>
            </>
            ))}

            */
export default SearchRecipes;