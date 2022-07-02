// import logo from './logo.svg';
import React from 'react'
import './App.css';
import Header from './Header';
import { Routes, Route} from "react-router-dom"
import Category from './Category/Category';
import PageNotFound from './PageNotFound';
import Supplier from './Supplier/Supplier';
import ListFlower from './ListFlower'
import Flower from './Flower/Flower';
import FlowerDetail from './FlowerDetail';
import Register from './Register';
import Login from './Login';
import ReceiptDetail from './Receipt';
import GetCart from './GetCart';

// import { Redirect } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <Header />
      <div className='container'>
        <Routes>
          {/* <Switch> */}
            <Route index element={<ListFlower />} />
            <Route path="/home" element={<ListFlower />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Header />} />
            <Route path="/category" element={<Category />} />
            <Route path='*' element={<PageNotFound />} />
            <Route path='/supplier' element={<Supplier />} />
            {/* <Route path='/flower' render={() =>{
              return localStorage.getItem('accessToken') ? <Flower /> : <Navigate to="/login" />
            }} /> */}
            <Route path='/flower' element={<Flower />} />
            <Route path='/ListFlower' element={<ListFlower />} />
            <Route path='/FlowerDetail/:FlowerID' element={<FlowerDetail />} />
            <Route path='/ReceiptDetail/:ReceiptID' element={<ReceiptDetail/>}/>
          <Route path='/Cart' element={<GetCart/>}/>
          {/* </Switch> */}
        </Routes>
      </div>
    </React.Fragment>
  );
}

export default App;
