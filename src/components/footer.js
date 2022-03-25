import React from 'react';
import ReactDOM from 'react-dom';
import { MDBBtn as Button } from 'mdb-react-ui-kit';
import { BrowserRouter, Route, Routes, Link, Outlet } from "react-router-dom";

class Footer extends React.Component{
    render () {
        let centerText = {
            textAlign: 'center'
        }
        return(
        <div>
            <div className='footerContainer'>
                <div className='footerSection'>
                    <h4>Services</h4>
                    <p>
                        Users are able to upload and view recipes. users can search for recipes by excluding and including ingredients and recipe categories. This product will use an AI to generate stories in the creation of a recipe to work to protect the copyright of the recipe in Canada and America.
                    </p>
                </div>
                <div className='footerSection'>
                    <div className='footerSubSection'>
                        Radical Random Recipes © Copyright 2022
                        <br/>
                        All Rights Reserved.
                    </div>
                    <div className='footerSubSection'>
                        <h4>Partners</h4>
                        Emily Ronson
                        <br/>
                        Peter Saunders
                        <br/>
                        Keith Sialana
                        <br/>
                        Anzhelika Kostyuk
                    </div>
                </div>
                <div className='footerSection' style={centerText}>
                    <Button href='/tos' outline color='info'>Terms of Service</Button>
                </div>
            </div>
        </div>
        );
    }
}

export default Footer;