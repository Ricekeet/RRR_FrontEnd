import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Header from './components/header';
import About from './pages/about';
import Home from './pages/home';
import Login from './pages/account/login';
import Profile from './pages/account/profile';
import Search from './pages/search';
import MyRecipes from './pages/account/myrecipes';
import Footer from './components/footer';
import ToS from './pages/tos';
import Register from './pages/account/register';


function App () {
    return (
        <BrowserRouter>
            <div className='App'>
                <Header />
                <div className='content'>
                    <Routes>
                        <Route index exact path='/' element={<Home color='orange'/>}/>
                        <Route exact path='/about' element={<About/>}/>
                        <Route exact path='/account/login' element={<Login/>}/>
                        <Route exact path='/account/profile' element={<Profile/>}/>
                        <Route exact path='/account/register' element={<Register/>}/>
                        <Route exact path='/search' element={<Search/>}/>
                        <Route exact path='/account/recipes' element={<MyRecipes/>}/>
                        <Route exact path='/tos' element={ToS}/>
                    </Routes>
                </div>
                <Footer/>
            </div>
        </BrowserRouter>
    );
}

export default App;