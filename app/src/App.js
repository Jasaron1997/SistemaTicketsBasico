import React from 'react';
// import logo from './logo.svg';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import Cart from './Componentes/Cart/cart';
import Navbar from './Componentes/Navbar/navbar';
import Ticket from './Componentes/Ticket/ticket'
function App() {
	return (
		<BrowserRouter>
			<header className="App-header">
      <Navbar />
      <Switch>
      <Route exact path="/" render={()=><Cart />} />

      <Route exact path="/ticket/crear" render={()=><Ticket />} />
			
			
			
			</Switch>
      
      </header>
		</BrowserRouter>
	);
}

export default App;
