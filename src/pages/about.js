import React from 'react';
import ReactDOM from 'react-dom';

class About extends React.Component{
    render () {
        return <div>
            <h1>About us</h1>
            <div className='aboutStory'>
                <div className='aboutWhite'>
                    <h3>The Radical Random Recipe Story</h3>
                    <p>Radical Random Recipes is a capstone project idea that was brought into reality by 4 students in Conestoga College. 
                    As an addition into the idea, we implimented a feature that lets users create an AI generayed story for their recipes to claim copyright on them. </p>
                </div>
            </div>
            <br/><br/>
            <div className='aboutTeam'>
                <div className='aboutWhite'>
                    <h2>Our Team</h2>
                    <p>- Harry Scanlan (Project Advisor)
                    <br/> - Anzhelika Kostyuk
                    <br/> - Emily Ronson
                    <br/> - Peter Saunders
                    <br/> - Keith Sialana
                    </p>
                </div>
            </div>
        </div>
    }
}

export default About;