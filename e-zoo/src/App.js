import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Main from './Pages/Main';
import Sale from './Pages/Sale';
import Product from './Pages/Product';
import './style.scss';
import MobileMenu from './Components/MobileMenu';
import { useSelector } from 'react-redux';
import SearchWin from './Components/SearchWin';
import CallWin from './Components/CallWin';
import Authorization from './Pages/Authorization';
import Cart from './Pages/Cart';
import Catalog from './Pages/Catalog';
import Me from './Pages/Me';
import Order from "./Pages/Order";

function App() {
  const activeMobMenu = useSelector(state => state.activeMobMenu);
  const activeSearch = useSelector(state => state.activeSearch);
  const activeCall = useSelector(state => state.activeCall);


  return (
    <Router>
      <div className="App">
        <header>
          <Header/>
        </header>
        <MobileMenu active={activeMobMenu} />
        <main>
          {activeSearch ?
            <SearchWin />
            : ''}
          {activeCall ?
            <CallWin />
            : ''}
          <Routes>
            <Route exact path='/' element={<Main />} />
            <Route exact path='/sales' element={<Sale />} />
            <Route exact path='/authorization' element={<Authorization />} />
            <Route exact path='/me/:id' element={<Me />} />
            <Route exact path='/me/order/:code' element={<Order/>} />
            <Route exact path='/prods/:animal/:type/:id' element={<Product />} />
            <Route exact path='/cart' element={<Cart />} />
            <Route exact path='/catalog/dog/diet-korm/' element={<Catalog name='Диетический корм для собак' animal='dog' type='diet-korm' />} />
            <Route exact path='/catalog/dog/diet-korm/diet-dry-korm/' element={<Catalog name='Диетический корм для собак' animal='dog' type='diet-korm' __type='diet-dry-korm'/>} />
            <Route exact path='/catalog/dog/diet-korm/konservy-diet/' element={<Catalog name='Диетический корм для собак' animal='dog' type='diet-korm' __type='konservy-diet'/>} />
            <Route exact path='/catalog/dog/diet-korm/preservy-diet/' element={<Catalog name='Диетический корм для собак' animal='dog' type='diet-korm' __type='preservy-diet'/>} />
                        
            <Route exact path='/catalog/dog/korm/' element={<Catalog name='Корм для собак' animal='dog' type='korm' />} />
            <Route exact path='/catalog/dog/korm/dry-korm' element={<Catalog name='Корм для собак' animal='dog' type='korm' __type='dry-korm' />} />
            <Route exact path='/catalog/dog/korm/konservy' element={<Catalog name='Корм для собак' animal='dog' type='korm' __type='konservy' />} />
            <Route exact path='/catalog/dog/korm/preservy' element={<Catalog name='Корм для собак' animal='dog' type='korm' __type='preservy' />} />
            <Route exact path='/catalog/dog/korm/lakomstva' element={<Catalog name='Корм для собак' animal='dog' type='korm' __type='lakomstva' />} />
            
            <Route exact path='/catalog/dog/soderzhanie-i-ukhod/' element={<Catalog name='Содержание и уход для собак' animal='dog' type='soderzhanie-i-ukhod' />} />
            <Route exact path='/catalog/dog/soderzhanie-i-ukhod/domiki-i-lezhaki' element={<Catalog name='Содержание и уход для собак' animal='dog' type='soderzhanie-i-ukhod' __type='domiki-i-lezhaki'  />} />
            <Route exact path='/catalog/dog/soderzhanie-i-ukhod/igrushki' element={<Catalog name='Содержание и уход для собак' animal='dog' type='soderzhanie-i-ukhod' __type='igrushki'  />} />
            <Route exact path='/catalog/dog/soderzhanie-i-ukhod/transportirovka-perenoski-budki' element={<Catalog name='Содержание и уход для собак' animal='dog' type='soderzhanie-i-ukhod' __type='transportirovka-perenoski-budki'  />} />
            <Route exact path='/catalog/dog/soderzhanie-i-ukhod/posuda' element={<Catalog name='Содержание и уход для собак' animal='dog' type='soderzhanie-i-ukhod' __type='posuda'  />} />


            <Route exact path='/catalog/cat/diet-korm/' element={<Catalog name='Диетический корм для кошек' animal='cat' type='diet-korm' />} />
            <Route exact path='/catalog/cat/diet-korm/diet-korm/' element={<Catalog name='Диетический корм для кошек' animal='cat' type='diet-korm' __type='diet-korm'/>} />
            <Route exact path='/catalog/cat/diet-korm/konservy-diet/' element={<Catalog name='Диетический корм для кошек' animal='cat' type='diet-korm' __type='konservy-diet'/>} />
            <Route exact path='/catalog/cat/diet-korm/preservy-diet/' element={<Catalog name='Диетический корм для кошек' animal='cat' type='diet-korm' __type='preservy-diet'/>} />
            
            <Route exact path='/catalog/cat/korm/' element={<Catalog name='Корм для кошек' animal='cat' type='korm' />} />
            <Route exact path='/catalog/cat/korm/dry-korm' element={<Catalog name='Корм для кошек' animal='cat' type='korm' __type='dry-korm' />} />
            <Route exact path='/catalog/cat/korm/konservy' element={<Catalog name='Корм для кошек' animal='cat' type='korm' __type='konservy' />} />
            <Route exact path='/catalog/cat/korm/preservy' element={<Catalog name='Корм для кошек' animal='cat' type='korm' __type='preservy' />} />
            <Route exact path='/catalog/cat/korm/lakomstva' element={<Catalog name='Корм для кошек' animal='cat' type='korm' __type='lakomstva' />} />
            
            <Route exact path='/catalog/cat/napolniteli/' element={<Catalog name='Наполнители для кошачьего туалета' animal='cat' type='napolniteli' />} />
            <Route exact path='/catalog/cat/napolniteli/drevesnyy' element={<Catalog name='Наполнители для кошачьего туалета' animal='cat' type='napolniteli' __type='drevesnyy'  />} />
            <Route exact path='/catalog/cat/napolniteli/komkuyushchiysya' element={<Catalog name='Наполнители для кошачьего туалета' animal='cat' type='napolniteli' __type='komkuyushchiysya' />} />
            <Route exact path='/catalog/cat/napolniteli/silikagelevyy' element={<Catalog name='Наполнители для кошачьего туалета' animal='cat' type='napolniteli' __type='silikagelevyy' />} />
            <Route exact path='/catalog/cat/napolniteli/soevye' element={<Catalog name='Наполнители для кошачьего туалета' animal='cat' type='napolniteli' __type='soevye' />} />
            
            <Route exact path='/catalog/cat/soderzhanie-i-ukhod/' element={<Catalog name='Содержание и уход для кошек' animal='cat' type='soderzhanie-i-ukhod' />} />
            <Route exact path='/catalog/cat/soderzhanie-i-ukhod/domiki-i-lezhaki' element={<Catalog name='Содержание и уход для кошек' animal='cat' type='soderzhanie-i-ukhod' __type='domiki-i-lezhaki' />} />
            <Route exact path='/catalog/cat/soderzhanie-i-ukhod/igrushki' element={<Catalog name='Содержание и уход для кошек' animal='cat' type='soderzhanie-i-ukhod' __type='igrushki' />} />
            <Route exact path='/catalog/cat/soderzhanie-i-ukhod/posuda-i-miski' element={<Catalog name='Содержание и уход для кошек' animal='cat' type='soderzhanie-i-ukhod' __type='posuda-i-miski' />} />
            <Route exact path='/catalog/cat/soderzhanie-i-ukhod/transportirovka-perenoski' element={<Catalog name='Содержание и уход для кошек' animal='cat' type='soderzhanie-i-ukhod' __type='transportirovka-perenoski' />} />


            <Route exact path='/catalog/bird/korm/' element={<Catalog name='Корм для птиц' animal='bird' type='korm' />} />
            <Route exact path='/catalog/bird/korm/dry-korm' element={<Catalog name='Корм для птиц' animal='bird' type='korm' __type='dry-korm' />} />
            <Route exact path='/catalog/bird/korm/lakomstva-i-vitaminy' element={<Catalog name='Корм для птиц' animal='bird' type='korm' __type='lakomstva-i-vitaminy' />} />
            
            <Route exact path='/catalog/bird/soderzhanie-i-ukhod/' element={<Catalog name='Содержание и уход для птиц' animal='bird' type='soderzhanie-i-ukhod' />} />
            <Route exact path='/catalog/bird/soderzhanie-i-ukhod/aksessuary' element={<Catalog name='Содержание и уход для птиц' animal='bird' type='soderzhanie-i-ukhod' __type='aksessuary' />} />
            <Route exact path='/catalog/bird/soderzhanie-i-ukhod/kletki' element={<Catalog name='Содержание и уход для птиц' animal='bird' type='soderzhanie-i-ukhod' __type='kletki' />} />
            <Route exact path='/catalog/bird/soderzhanie-i-ukhod/napolniteli' element={<Catalog name='Содержание и уход для птиц' animal='bird' type='soderzhanie-i-ukhod' __type='napolniteli' />} />
            <Route exact path='/catalog/bird/soderzhanie-i-ukhod/posuda' element={<Catalog name='Содержание и уход для птиц' animal='bird' type='soderzhanie-i-ukhod' __type='posuda' />} />


            <Route exact path='/catalog/rodent/korm/' element={<Catalog name='Корм для грызунов' animal='rodent' type='korm' />} />
            <Route exact path='/catalog/rodent/korm/dry-korm' element={<Catalog name='Корм для грызунов' animal='rodent' type='korm' __type='dry-korm' />} />
            <Route exact path='/catalog/rodent/korm/lakomstva-i-vitaminy' element={<Catalog name='Корм для грызунов' animal='rodent' type='korm' __type='lakomstva-i-vitaminy' />} />
            
            <Route exact path='/catalog/rodent/soderzhanie-i-ukhod/' element={<Catalog name='Содержание и уход для грызунов' animal='rodent' type='soderzhanie-i-ukhod' />} />
            <Route exact path='/catalog/rodent/soderzhanie-i-ukhod/aksessuary' element={<Catalog name='Содержание и уход для грызунов' animal='rodent' type='soderzhanie-i-ukhod' __type='aksessuary' />} />
            <Route exact path='/catalog/rodent/soderzhanie-i-ukhod/kletki' element={<Catalog name='Содержание и уход для грызунов' animal='rodent' type='soderzhanie-i-ukhod' __type='kletki' />} />
            <Route exact path='/catalog/rodent/soderzhanie-i-ukhod/napolniteli' element={<Catalog name='Содержание и уход для грызунов' animal='rodent' type='soderzhanie-i-ukhod' __type='napolniteli' />} />
            <Route exact path='/catalog/rodent/soderzhanie-i-ukhod/posuda' element={<Catalog name='Содержание и уход для грызунов' animal='rodent' type='soderzhanie-i-ukhod' __type='posuda' />} />

           
            <Route exact path='/catalog/fish/aquariums/' element={<Catalog name='Аквариумы' animal='fish' type='aquariums' />} />
            
            <Route exact path='/catalog/fish/korm/' element={<Catalog name='Корм для рыбок' animal='fish' type='korm' />} />
            <Route exact path='/catalog/fish/korm/korm-dlya-ryb' element={<Catalog name='Корм для рыбок' animal='fish' type='korm' __type="korm-dlya-ryb" />} />
            <Route exact path='/catalog/fish/korm/korm-dlya-cherepakh' element={<Catalog name='Корм для рыбок' animal='fish' type='korm' __type="korm-dlya-cherepakh" />} />
            
            <Route exact path='/catalog/fish/soderzhanie-i-ukhod/' element={<Catalog name='Содержание и уход для аквариума' animal='fish' type='soderzhanie-i-ukhod' />} />
            <Route exact path='/catalog/fish/soderzhanie-i-ukhod/dekoratsii' element={<Catalog name='Содержание и уход для аквариума' animal='fish' type='soderzhanie-i-ukhod' __type="dekoratsii" />} />
            <Route exact path='/catalog/fish/soderzhanie-i-ukhod/khimiya-i-lekarstva' element={<Catalog name='Содержание и уход для аквариума' animal='fish' type='soderzhanie-i-ukhod' __type="khimiya-i-lekarstva" />} />


            <Route exact path='/catalog/veterinary/' element={<Catalog name='Ветпрепараты' animal='veterinary' type='veterinary' />} />
          </Routes>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </Router>
  );
}

export default App;
