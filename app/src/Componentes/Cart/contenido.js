import React, { Component,Fragment } from 'react';
import {withRouter} from 'react-router-dom';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import Moment from 'react-moment';

import Portal from '../../portal';

import Personal from './personal';

import { Query, Mutation } from 'react-apollo';
import { UPDATETICKETS } from '../../GraphQL/mutation/tikects';

import { GETPERSONALES } from '../../GraphQL/querry/personales';
import { GETESTADOS } from '../../GraphQL/querry/estados';

class contenido extends Component {
	state = {
	};

	UpdateState = (e) => {
		const { name, value } = e.target;
		this.setState({
			[name]: value
		});
	};

	UpdateTickets=(e,UpdateTickets)=>{
        e.preventDefault();

        UpdateTickets().then(data=>{
            // console.log(data);
			window.location.reload();
		})
	}	
	
	ShowPortar = () => {
		
		const {id,
			Actividad,
			Ticket,
			FechaSolicitud,
		} = this.props;

		const input = {
			id,
			Actividad,
			Ticket,
			FechaSolicitud,
			FechaInicio:this.state.FechaInicio,
			Observaciones:this.state.Observaciones,
			Estado:{id:this.state.Estado},
			Finalizado:this.state.Finalizado,
			Reportado:{id:this.state.Reportado},
			Realizado:{id:this.state.Realizado},
		
		};
		return (
			
			<Portal>
				{
					
					<Mutation mutation={UPDATETICKETS}
            variables={{input
			}}
            key={id}
            onCompleted={()=> window.location.reload()}
            >
            {(UpdateTickets,{loading,error,data})=>{
                    return(

					<form  onSubmit={e=>this.UpdateTickets(e,UpdateTickets)}>
						<div
							class="modal fade"
							id={`exampleModal${this.props.id}`} 
							tabindex="-1"
							role="dialog"
							aria-labelledby="exampleModalLabel"
							aria-hidden="true"
						>
							<div class="modal-dialog" role="document">
								<div class="modal-content">
									<div class="modal-header">
										<h5 class="modal-title" id="exampleModalLabel">
											Cambio de Estado
										</h5>
										<button type="button" class="close" data-dismiss="modal" aria-label="Close">
											<span aria-hidden="true">&times;</span>
										</button>
									</div>
									<div class="modal-body">
										<div class="form-group">
											<label>Fecha Inicio</label>
											{/* <input
												name="FechaInicio"
												onChange={this.UpdateState}
												type="datetime-local"
												class="form-control"
												// defaultValue={	<Moment format="DD/MM/YYYY HH:mm">{new Date(Number(this.state.FechaInicio)).toISOString()}</Moment>}

											/> */}
											<DatePicker
												selected={new Date(Number(this.props.FechaInicio))}
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
										<div class="form-group">
											<label>Fecha de Finalización</label>
											<DatePicker
												selected={new Date(Number(this.props.Finalizado))}
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
										<div class="form-group">
											<label>Observaciones</label>
											<textarea
												name="Observaciones"
												onChange={this.UpdateState}
												class="form-control"
												rows="10"
												placeholder="Ingrese las observaciones "
												defaultValue={this.props.Observaciones}
											/>
										</div>
										<div class="form-row">
											<div class="form-group col-md-6">
												<label for="inputZip">Realizado</label>
												<select
													name="Realizado"
													onChange={this.UpdateState}
													class="form-control"
												>
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
																			key={item.id}
																		selected={
																							this.props.Realizado[0].Nombre ===
																							item.Nombre
																						}


																			value={item.id}
																		>{`${item.Nombre} (${item.Dependencia})`}</option>
																	))}
																</Fragment>
															);
														}}
													</Query>
												</select>
											</div>
											<div class="form-group col-md-6">
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
																		<option
																		key={item.id}
																		selected={
																							this.props.Estado[0].Nombre ===
																							item.Nombre
																						}

																			value={item.id}
																		>{`${item.Nombre}`}</option>
																	))}
																</Fragment>
															);
														}}
													</Query>
												</select>
											</div>
										</div>
									</div>{' '}
									<div class="modal-footer">
										<button type="button" class="btn btn-secondary" data-dismiss="modal">
											Cerrar
										</button>
										<button type="submit" class="btn btn-primary" >
											Guardar cambios
										</button>
									</div>
								</div>
							</div>
						</div>
					</form>
			  )

            }}

			
            </Mutation>	
			}
			</Portal>
	);
	};
	render() {
		console.log(new Date(Number(this.props.FechaInicio)))
		console.log(this.props.FechaInicio)

console.log(this.state.FechaInicio)
		const {
			Actividad,
			Ticket,
			FechaSolicitud,
			FechaInicio,
			Observaciones,
			Estado,
			Finalizado,
			Reportado,
			Realizado
		} = this.props;
	
	

		const { Color } = this.props.Estado[0];
		return (


			<div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 ">
				<div className={`card text-white mb-3`} style={{ background: Color }}>
					<div className="card-header">
						T-{Ticket} {Estado[0].Nombre}
					</div>
					<div className="card-body">
						<h5 className="card-title">{Actividad}</h5>
						<p className="card-text">{Observaciones}</p>
						<ul className="list-group list-group-flush">
							<li className={`list-group-item `} style={{ background: Color }}>
								{'Solicitud: '}
								<Moment format="DD/MM/YYYY HH:mm">
									{new Date(Number(FechaSolicitud)).toISOString()}
								</Moment>
							</li>
							<li className={`list-group-item`} style={{ background: Color }}>
								{`Inicio: `}
								<Moment format="DD/MM/YYYY HH:mm">{new Date(Number(FechaInicio)).toISOString()}</Moment>
							</li>
							<li className={`list-group-item`} style={{ background: Color }}>
								{`Finalizado: `}
								<Moment format="DD/MM/YYYY HH:mm">{new Date(Number(Finalizado)).toISOString()}</Moment>
							</li>
						</ul>
						<p className="card-text">Fechas</p>

						<ul className="list-group list-group-flush">
							{Reportado.map((data, index) => <Personal key={index} Personal={data} Color={Color} />)}
						</ul>
						<p className="card-text">Reportado</p>

						<ul class="list-group list-group-flush">
							{Realizado.map((data, index) => <Personal key={index} Personal={data} Color={Color} />)}
						</ul>
						<p className="card-text">Realizado</p>

						<button type="button" class="btn btn-primary" data-toggle="modal" data-target={`#exampleModal${this.props.id}`} >
							Cambiar Estado
						</button>

						{this.ShowPortar()}
					</div>
					<div className="card-footer">
						<small className="text-muted-white ">
							{`Tiempo Abierto: `}
							<Moment format="DD/MM/YYYY HH:mm">{new Date(Number(Finalizado)).toISOString()}</Moment>
						</small>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(contenido);
