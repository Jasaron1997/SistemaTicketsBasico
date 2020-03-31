import React, { Component, Fragment } from 'react';
import {withRouter} from 'react-router-dom';


import { Mutation } from 'react-apollo';
import {CREATEESTADO} from '../../GraphQL/mutation/estados'

class estado extends Component {
	state = {};

	UpdateState = (e) => {
		const { name, value } = e.target;
		this.setState({
			[name]: value
		});
	};

	CreateEstado = (e, CreateEstado) => {
		e.preventDefault ();
		//insertamos en la base de datos
		CreateEstado().then (() => {
			  this.props.history.push ('/');
			});
		
	  };
	render() {
		return (
		<Fragment>
			<div className="container">
		<h2 className="text-centar mb-5">Crear Nuevo estado</h2>
<Mutation
mutation={CREATEESTADO} 
variables={{ input:{
	...this.state
} }}
>
{(CreateEstado,{loading,error,data})=>{
return(
	<form onSubmit={(e)=>this.CreateEstado(e,CreateEstado)}>
					
					<div class="form-row">
						<div class="form-group col-md-4">
							<label>Nombre</label>
							<input name="Nombre" onChange={this.UpdateState} type="text" class="form-control" />
						</div>
						<div class="form-group col-md-4">
							<label>Color</label>
							<input name="Color" onChange={this.UpdateState} type="color" class="form-control" />
						</div>
						
					</div>
					<div class="form-group">
						<label for="inputAddress">Descripcion</label>
						<input name="Descripcion" onChange={this.UpdateState} type="text" class="form-control" placeholder="Describir el estado" />
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

export default withRouter(estado);
