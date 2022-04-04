import React, {useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import DBHandler from '../components/classes/DBHandler';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';

class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            recipes:[]
        }

        this.getTop5 = this.getTop5.bind(this);
    }

    componentDidMount(){
        this.getTop5();
    }

    getTop5(){
        let results =  DBHandler.GET_5_Recipe();
        this.state.recipes = results;
        this.setState({recipes: this.state.recipes});
        console.log("recipes:", this.state.recipes);
    }
    
    render () {
        return (
            <div className='contents'>
            <h1>Our Favorite Recipes</h1>
            <Carousel dynamicHeight>
            {
                this.state.recipes.map(recipe => {
                    console.log("recipe.Id:",recipe.Id);
                    console.log("recipe.Name:", recipe.Name);
                    return (
                        <div key={recipe.Id}>
                            <img src='https://www.rmofmarquis.com/wp-content/themes/rmmarquis/images/no-image-available.png'/>
                            <p className='legend'>{recipe.Name}</p>
                        </div>
                    )
                })
            }
            </Carousel>
            </div>
        );
    }
}

export default Home;