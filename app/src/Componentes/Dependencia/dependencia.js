import React, { Component, Fragment } from 'react';
import {withRouter} from 'react-router-dom';


import { Mutation } from 'react-apollo';
import {CREATEDEPENDENCIAS} from '../../GraphQL/mutation/dependencias'

class dependencia extends Component {
	state = {};

	UpdateState = (e) => {
		const { name, value } = e.target;
		this.setState({
			[name]: value
		});
	};

	Createdependencia = (e, Createdependencia) => {
		e.preventDefault ();
		//insertamos en la base de datos
		Createdependencia().then (() => {
			  this.props.history.push ('/');
			});
		
	  };
	render() {
		return (
		<Fragment>
			<div className="container">
		<h2 className="text-centar mb-5">Crear Nuevo dependencia</h2>
<Mutation
mutation={CREATEDEPENDENCIAS} 
variables={{ input:{
	...this.state
} }}
>
{(Createdependencia,{loading,error,data})=>{
return(
	<form onSubmit={(e)=>this.Createdependencia(e,Createdependencia)}>
						<div class="form-group">
						<label for="inputAddress">Dependencia</label>
						<input name="Nombre" onChange={this.UpdateState} type="text" class="form-control" placeholder="Escribe el nombre de la dependencia" />
					</div>
					<button type="submit" class="btn btn-primary">
						Guardar
					</button>
				</form>
);
}}
</Mutation>
				
			</div>
			</Fragment>);
	}
}

export default withRouter(dependencia);
