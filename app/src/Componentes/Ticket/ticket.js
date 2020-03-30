import React, { Component, Fragment } from 'react';
import {withRouter} from 'react-router-dom';


import { Query, Mutation } from 'react-apollo';
import {CREATETICKETS} from '../../GraphQL/mutation/tikects'

import { GETPERSONALES } from '../../GraphQL/querry/personales';
import { GETESTADOS } from '../../GraphQL/querry/estados';

class ticket extends Component {
	state = {};

	UpdateState = (e) => {
		const { name, value } = e.target;
		this.setState({
			[name]: value
		});
	};

	CreatePersonal = (e, CreatePersonal) => {
		e.preventDefault ();
		//insertamos en la base de datos
		CreatePersonal().then (() => {
			  this.props.history.push ('/');
			});
		
	  };
	render() {
		return (
		<Fragment>
			<div className="container">
		<h2 className="text-centar mb-5">Crear Nuevo Ticket</h2>
<Mutation
mutation={CREATETICKETS} 
variables={{ input:{
	...this.state,
	Reportado:{id:this.state.Reportado},
	Realizado:{id:this.state.Realizado},
	Estado:{id:this.state.Estado}
} }}
>
{(CreatePersonal,{loading,error,data})=>{
return(
	<form onSubmit={(e)=>this.CreatePersonal(e,CreatePersonal)}>
					<div class="form-group">
						<label for="inputAddress">Actividad</label>
						<input name="Actividad" onChange={this.UpdateState} type="text" class="form-control" placeholder="Describir la Actvidad" />
					</div>
					<div class="form-row">
						<div class="form-group col-md-4">
							<label>Fecha Solicitud</label>
							<input name="FechaSolicitud" onChange={this.UpdateState} type="datetime-local" class="form-control" />
						</div>
						<div class="form-group col-md-4">
							<label>Fecha Inicio</label>
							<input name="FechaInicio" onChange={this.UpdateState} type="datetime-local" class="form-control" />
						</div>
						<div class="form-group col-md-4">
							<label>Fecha de Finalización</label>
							<input name="Finalizado" onChange={this.UpdateState} type="datetime-local" class="form-control" />
						</div>
					</div>
					<div class="form-group">
						<label>Observaciones</label>
						<textarea name="Observaciones"  onChange={this.UpdateState} class="form-control" rows="10" placeholder="Ingrese las observaciones " />
					</div>
					<div class="form-row">
						<div class="form-group col-md-5">
							<label for="inputState">Reportado</label>
							<select name="Reportado"  onChange={this.UpdateState} class="form-control">
								<option selected>Seleccionar...</option>
								<Query
									query={GETPERSONALES}
									variables={{
										tareas: 1
									}}
								>
									{({ loading, error, data, refetch }) => {
										refetch();
										if (loading) return 'Cargando...';
										if (error) return `Error: ${error.message}`;
										return (
											<Fragment>
												{data.getPersonales.map((item) => <option value={item.id}>{item.Nombre}</option>)}
											</Fragment>
										);
									}}
								</Query>
							</select>
						</div>
						<div class="form-group col-md-5">
							<label for="inputZip">Realizado</label>
							<select  name="Realizado" onChange={this.UpdateState} class="form-control">
								<option selected>Seleccionar...</option>
								<Query query={GETPERSONALES}>
									{({ loading, error, data, refetch }) => {
										refetch();
										if (loading) return 'Cargando...';
										if (error) return `Error: ${error.message}`;
										return (
											<Fragment>
												{data.getPersonales.map((item) => <option value={item.id}>{item.Nombre}</option>)}
											</Fragment>
										);
									}}
								</Query>
							</select>
						</div>
						<div class="form-group col-md-2">
							<label for="inputZip">Estado</label>
							<select  name="Estado" onChange={this.UpdateState} class="form-control">
								<option selected>Seleccionar...</option>
								<Query query={GETESTADOS}>
									{({ loading, error, data, refetch }) => {
										refetch();
										if (loading) return 'Cargando...';
										if (error) return `Error: ${error.message}`;
										return (
											<Fragment>
												{data.getEstados.map((item) => <option value={item.id}>{item.Nombre}</option>)}
											</Fragment>
										);
									}}
								</Query>
							</select>
						</div>
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

export default withRouter(ticket);
