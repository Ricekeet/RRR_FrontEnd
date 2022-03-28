import React, {useState} from 'react';
import ReactDOM from 'react-dom';

class Home extends React.Component{
    // selects 
    odataSelectStarFromRecipe = "/v1/recipe";
    odataSelectSingleFromRecipe = "/v1/recipe?$filter=id eq ";

    // update
    odataUpdateRecipe = "/v1/recipe?$filter=id eq ";
    currentIp = process.env.REACT_APP_RRR_API;
    // the init function
    constructor(props) {
        super(props);
        this.state = {
            error:null,
            isLoaded:false,
            recipesStar: [],
            recipesSingle: [],
            recipesUpdate: [],
            mystatus:"",
            json:""
        };
    }

    // this is where we call the api just one time
    // more times would be using a method like did update
    componentDidMount() {
        this.selectStarFromRecipe();
        this.selectSingleFromRecipe();
    }
    
    selectStarFromRecipe() {
        // this is our fetch string, it depends on the servers current ip
        // the current ip is set in RRR_FRONTEND/.env, same folder as readme
        // it also depends on the desired odata search, view above
        let fetchString = "http://"+this.currentIp+this.odataSelectStarFromRecipe;

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
            console.log(result);
        },
        // on error set the state to reflect
        (error) => {
            this.setState({isLoaded:true,error});
        })

    }

    selectSingleFromRecipe() {
        // this is our fetch string, it depends on the servers current ip
        // the current ip is set in RRR_FRONTEND/.env, same folder as readme
        // it also depends on the desired odata search, view above
        // we are going to fetch id = 1
        let id = 1;
        let fetchString = "http://"+this.currentIp+this.odataSelectSingleFromRecipe+id;

        // encapsulate into fetch object because why not
        let myRequest = new Request(fetchString);

        // run the fetch, set 'cors' to on
        // if cors means nothing to you just ignore it
        fetch(myRequest, {mode:"cors"})
        // we want json so parse immediately to it
        .then(res => res.json())
        .then(result => {
            // looking at the console our list is in result.value
            this.setState({recipesSingle: result.value, isLoaded: true});
            console.log(result);
        },
        // on error set the state to reflect
        (error) => {
            this.setState({isLoaded:true,error});
        })

    }

    updateRecipe() {
        // this is our fetch string, it depends on the servers current ip
        // the current ip is set in RRR_FRONTEND/.env, same folder as readme
        // it also depends on the desired odata search, view above
        // we are going to fetch id = 1 and update the name to 'french omelette'
        let id = 1;
        let fetchString = "http://"+this.currentIp+this.odataSelectSingleFromRecipe+id;

        // encapsulate into fetch object because why not
        let myRequest = new Request(fetchString);

        // run the fetch, set 'cors' to on
        // if cors means nothing to you just ignore it
        fetch(myRequest, {mode:"cors"})
        // we want json so parse immediately to it
        .then(res => res.json())
        .then(result => {
            // looking at the console our list is in result.value
            this.setState({recipesSingle: result.value, isLoaded: true});
            console.log(result);
        },
        // on error set the state to reflect
        (error) => {
            this.setState({isLoaded:true,error});
        })

        // given that we have id 1 lets update it
        let myName = "french omeletee";
        let myRecipe = this.recipesSingle;
        let postString = "http://"+this.currentIp+this.odataUpdateRecipe;
        myRecipe.Name = myName;

        // so lets run another fetch
        let myPost = new Request(postString);
        fetch()
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
                <h2>Update Single Recipe</h2>
                <p>This will destructively update the recipe.</p>
                <input type="button" formAction='${updateRecipe()}' value="Update"></input>
                <ul>
                    {recipesUpdate.map(value => (
                        <li key={value.Id}>
                            {value.Id} {value.Name}
                        </li>
                    ))}
                </ul>

                </div>
            );
        }
    }
}

export default Home;