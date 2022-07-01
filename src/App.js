// import logo from './logo.svg';
import React from 'react'
import './App.css';
import Header from './Header';
import { Routes, Route } from "react-router-dom"
import Category from './Category/Category';
import PageNotFound from './PageNotFound';
import Supplier from './Supplier/Supplier';
import ListFlower from './ListFlower'
import Flower from './Flower/Flower';
import FlowerDetail from './FlowerDetail';
function App() {
  return (
    <React.Fragment>
      <Header />
      <div className='container'>
        <Routes>
          <Route index element={<ListFlower />} />
          <Route path="/home" element={<ListFlower />} />
          <Route path="/" element={<Header />} />
          <Route path="/category" element={<Category />} />
          <Route path='*' element={<PageNotFound />} />
          <Route path='/supplier' element={<Supplier />} />
          <Route path='/flower' element={<Flower />} />
          <Route path='/ListFlower' element={<ListFlower />}/>
          <Route path='/FlowerDetail/:FlowerID' element={<FlowerDetail/>}/>
        </Routes>
      </div>
    </React.Fragment>
  );
}

export default App;
