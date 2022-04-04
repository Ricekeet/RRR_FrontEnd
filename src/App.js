import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Header from './components/header';
import About from './pages/about';
import Home from './pages/home';
import Login from './pages/account/login';
import Profile from './pages/account/profile';
import Search from './pages/search';
import Footer from './components/footer';
import ToS from './pages/tos';
import Register from './pages/account/register';
import AddRecipe from './pages/recipe/add';
import EditProfile from './pages/account/editprofile';
import DeleteRecipe from './pages/recipe/delete';
import Details from './pages/recipe/details';
import Edit from './pages/recipe/edit';
import Reviews from './pages/recipe/reviews';
import Print from './pages/recipe/print';
import List from './pages/recipe/list';

import Peters from './pages/peters';

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
                        <Route exact path='/account/editprofile' element={<EditProfile/>}/>
                        <Route exact path='/search' element={<Search/>}/>
                        <Route exact path='/tos' element={<ToS/>}/>
                        <Route exact path='/recipe/add' element={<AddRecipe/>}/>
                        <Route path='/list' element={<List/>}/>
                        <Route path='/recipe/delete/:id' element={<DeleteRecipe/>}/>
                        <Route path='/recipe/details/:id' element={<Details/>}/>
                        <Route path='/recipe/edit/:id' element={<Edit/>}/>
                        <Route path='/recipe/reviews/:id' element={<Reviews/>}/>
                        <Route path='/recipe/print/' element={<Print/>}/>
                        <Route path='/peters' element={<Peters/>}/>
                    </Routes>
                </div>
                <Footer/>
            </div>
        </BrowserRouter>
    );
}

export default App;