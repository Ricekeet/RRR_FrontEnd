import React, {useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import DBHandler from '../components/classes/DBHandler';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

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

    async getTop5(){
        let results =  await DBHandler.GET_5_Recipe();
        this.setState((prevState) => ({recipes: results}));
    }   

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
                            <img width="50%" className='imageSlider' src='https://www.rmofmarquis.com/wp-content/themes/rmmarquis/images/no-image-available.png'/>
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