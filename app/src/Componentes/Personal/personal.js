import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import { Query, Mutation } from 'react-apollo';
import { CREATEPERSONAL } from '../../GraphQL/mutation/personal';

import { GETDEPENDENCIAS } from '../../GraphQL/querry/dependencias';

class personal extends Component {
	state = {
	
	};

	UpdateState = (e) => {
		const { name, value } = e.target;
		this.setState({
			[name]: value
		});
		console.log(this.state)

	};

	handleCheckboxChange = (event) => {
		this.setState({ RealizarTareas: event.target.checked===true? 1:0 });
		console.log(this.state)
	};

	CreatePersonal = (e, CreatePersonal) => {
		e.preventDefault();
		//insertamos en la base de datos
		CreatePersonal().then(() => {
			this.props.history.push('/');
		});
	};
	render() {
		return (
			<Fragment>
				<div className="container">
					<h2 className="text-centar mb-5">Crear Nuevo personal</h2>
					<Mutation
						mutation={CREATEPERSONAL}
						variables={{
							input: {
								...this.state
							}
						}}
					>
						{(CreatePersonal, { loading, error, data }) => {
							return (
								<form onSubmit={(e) => this.CreatePersonal(e, CreatePersonal)}>
									<div className="form-group">
										<label for="inputAddress">Actividad</label>
										<input
											name="Nombre"
											onChange={this.UpdateState}
											type="text"
											className="form-control"
											placeholder="Escriba el nombre del personal"
										/>
									</div>
									<div className="form-gropu">
										<div className="form-group">
											<label for="inputState">Reportado</label>
											<select name="Dependencia" onChange={this.UpdateState} className="form-control">
												<option selected>Seleccionar...</option>
												<Query query={GETDEPENDENCIAS}>
													{({ loading, error, data, refetch }) => {
														refetch();
														if (loading) return 'Cargando...';
														if (error) return `Error: ${error.message}`;
														return (
															<Fragment>
																{data.getDependencias.map((item) => (
																	<option value={item.id}>{item.Nombre}</option>
																))}
															</Fragment>
														);
													}}
												</Query>
											</select>
										</div>
									</div>
									<div className="form-group">
										 <label for="inputAddress">Realiza tareas</label>
										 <br/>
										 <input className="RealizarTareas" type="checkbox"   onChange = {this.handleCheckboxChange} />

										<div className="form-row">
										{/*	<div className="form-group col-md-6">
												<label>SI</label>
												<input
													name="SI"
													onChange={this.UpdateState}
													type="checkbox"
													className="form-control"
													defaultChecked={this.UpdateState.SI}
												/>
											</div>
											<div className="form-group col-md-6">
												<label>NO</label>
												<input
													name="NO"
													onChange={this.UpdateState}
													type="checkbox"
													className="form-control"
													defaultChecked={this.UpdateState.NO}
												/>
											</div> */}

											<div className="form-group col-md-6">	

										</div>
										</div>
									</div>

									<button type="submit" className="btn btn-primary">
										Guardar
									</button>
								</form>
							);
						}}
					</Mutation>
				</div>
			</Fragment>
		);
	}
}

export default withRouter(personal);
