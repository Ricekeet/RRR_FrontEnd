import React from 'react';
import ReactDOM from 'react-dom';

class SearchRecipes extends React.Component{
    render () {
        return <div>
            <h1>Search Recipe</h1>
            <div className='keySearch'>
                <form method='TODO: ' action='TODO: '>
                    <label for="gsearch">Keyword Search</label>
                    <input type="search" id="ksearch" name="ksearch"></input>
                    <input type="submit"></input>
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
        </div>
    }
}

export default SearchRecipes;