import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { Query, Mutation } from 'react-apollo';
import { CREATETICKETS } from '../../GraphQL/mutation/tikects';

import { GETPERSONALES } from '../../GraphQL/querry/personales';
import { GETESTADOS } from '../../GraphQL/querry/estados';

class ticket extends Component {
	state = {
		FechaSolicitud: new Date(),
		FechaInicio: new Date(),
		Finalizado: new Date()
	};

	UpdateState = (e) => {
		const { name, value } = e.target;
		this.setState({
			[name]: value
		});
	};

	CreatePersonal = (e, CreatePersonal) => {
		e.preventDefault();
	console.log(this.state)
		//insertamos en la base de datos
		CreatePersonal().then(() => {
			this.props.history.push('/');
		});
	};
	render() {
		return (
			<Fragment>
				<div className="container">
					<h2 className="text-centar mb-5">Crear Nuevo Ticket</h2>
					<Mutation
						mutation={CREATETICKETS}
						variables={{
							input: {
								...this.state,
								Reportado: { id: this.state.Reportado },
								Realizado: { id: this.state.Realizado },
								Estado: { id: this.state.Estado }
							}
						}}
					>
						{(CreatePersonal, { loading, error, data }) => {
							return (
								<form onSubmit={(e) => this.CreatePersonal(e, CreatePersonal)}>
									<div class="form-group">
										<label for="inputAddress">Actividad</label>
										<input
											name="Actividad"
											onChange={this.UpdateState}
											type="text"
											class="form-control"
											placeholder="Describir la Actvidad"
										/>
									</div>
									<div class="form-row">
										<div class="form-group col-md-4">
											<label className="d-block">Fecha Solicitud</label>
											<DatePicker
												selected={this.state.FechaSolicitud}
												onChange={(date) =>
													this.setState({
														FechaSolicitud: date
													})}
												showTimeSelect
												timeFormat="HH:mm"
												timeIntervals={1}
												timeCaption="time"
												dateFormat="MMMM d, yyyy HH:mm"
												className="form-control"
											/>
										</div>
										<div class="form-group col-md-4">
											<label className="d-block">Fecha Inicio</label>
											<DatePicker
												selected={this.state.FechaInicio}
												onChange={(date) =>
													this.setState({
														FechaInicio: date
													})}
												showTimeSelect
												timeFormat="HH:mm"
												timeIntervals={1}
												timeCaption="time"
												dateFormat="MMMM d, yyyy HH:mm"
												className="form-control"
											/>
										</div>
										<div class="form-group col-md-4">
											<label className="d-block">Fecha de Finalización</label>
											<DatePicker
												selected={this.state.Finalizado}
												onChange={(date) =>
													this.setState({
														Finalizado: date
													})}
												showTimeSelect
												timeFormat="HH:mm"
												timeIntervals={1}
												timeCaption="time"
												dateFormat="MMMM d, yyyy HH:mm"
												className="form-control"
											/>
										</div>
									</div>
									<div class="form-group">
										<label>Observaciones</label>
										<textarea
											name="Observaciones"
											onChange={this.UpdateState}
											class="form-control"
											rows="10"
											placeholder="Ingrese las observaciones "
										/>
									</div>
									<div class="form-row">
										<div class="form-group col-md-5">
											<label for="inputState">Reportado</label>
											<select name="Reportado" onChange={this.UpdateState} class="form-control">
												<option selected>Seleccionar...</option>
												<Query query={GETPERSONALES}>
													{({ loading, error, data, refetch }) => {
														refetch();
														if (loading) return 'Cargando...';
														if (error) return `Error: ${error.message}`;
														return (
															<Fragment>
																{data.getPersonales.map((item) => (
																	<option
																		value={item.id}
																	>{`${item.Nombre} (${item.Dependencia})`}</option>
																))}
															</Fragment>
														);
													}}
												</Query>
											</select>
										</div>
										<div class="form-group col-md-5">
											<label for="inputZip">Realizado</label>
											<select name="Realizado" onChange={this.UpdateState} class="form-control">
												<option selected>Seleccionar...</option>
												<Query query={GETPERSONALES} variables={{ tareas: 1 }}>
													{({ loading, error, data, refetch }) => {
														refetch();
														if (loading) return 'Cargando...';
														if (error) return `Error: ${error.message}`;
														return (
															<Fragment>
																{data.getPersonales.map((item) => (
																	<option
																		value={item.id}
																	>{`${item.Nombre} (${item.Dependencia})`}</option>
																))}
															</Fragment>
														);
													}}
												</Query>
											</select>
										</div>
										<div class="form-group col-md-2">
											<label for="inputZip">Estado</label>
											<select name="Estado" onChange={this.UpdateState} class="form-control">
												<option selected>Seleccionar...</option>
												<Query query={GETESTADOS}>
													{({ loading, error, data, refetch }) => {
														refetch();
														if (loading) return 'Cargando...';
														if (error) return `Error: ${error.message}`;
														return (
															<Fragment>
																{data.getEstados.map((item) => (
																	<option value={item.id}>{`${item.Nombre}`}</option>
																))}
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
			</Fragment>
		);
	}
}

export default withRouter(ticket);
