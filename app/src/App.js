import React,{useState} from 'react';
// import logo from './logo.svg';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import Cart from './Componentes/Cart/cart';
import Navbar from './Componentes/Navbar/navbar';
import Ticket from './Componentes/Ticket/ticket'
import Estado from './Componentes/Estado/estado'
import Dependencia from './Componentes/Dependencia/dependencia'
import Personal from './Componentes/Personal/personal'


import Listado from './Componentes/Listado/listado';

function App() {
  const [State, setState] = useState("");
  const UpdateState  = (data) => (e) => {
    setState(data)
  };

	return (
		<BrowserRouter>
			<header className="App-header">
      <Navbar UpdateState={UpdateState}/>
      <Switch>
      <Route exact path="/" render={()=><Cart State={State}/>} />

      
      <Route exact path="/listado" render={()=><Listado State={State}/>} />

      <Route exact path="/ticket/crear" render={()=><Ticket />} />
      <Route exact path="/estado/crear" render={()=><Estado />} />
      <Route exact path="/personal/crear" render={()=><Personal />} />
      <Route exact path="/dependencia/crear" render={()=><Dependencia />} />
	  
			
			</Switch>
      
      </header>
		</BrowserRouter>
	);
}

export default App;
