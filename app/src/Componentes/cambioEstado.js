import React, { Component,Fragment } from 'react';
import {withRouter} from 'react-router-dom';

import Portal from '../portal';
import { Query, Mutation } from 'react-apollo';
import { UPDATETICKETS } from '../GraphQL/mutation/tikects';

import { GETPERSONALES } from '../GraphQL/querry/personales';
import { GETESTADOS } from '../GraphQL/querry/estados';


class cambioEstado extends Component {
	state = {};

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
							class="p fade"
							id={`examplep`} 
							tabindex="-1"
							role="dialog"
							aria-labelledby="examplepLabel"
							aria-hidden="true"
						>
							<div class="p-dialog" role="document">
								<div class="p-content">
									<div class="p-header">
										<h5 class="p-title" id="examplepLabel">
											Cambio de Estado
										</h5>
										<button type="button" class="close" data-dismiss="p" aria-label="Close">
											<span aria-hidden="true">&times;</span>
										</button>
									</div>
									<div class="p-body">
										<div class="form-group">
											<label>Fecha Inicio</label>
											<input
												name="FechaInicio"
												onChange={this.UpdateState}
												type="datetime-local"
												class="form-control"
												// defaultValue={	<Moment format="DD/MM/YYYY HH:mm">{new Date(Number(this.state.FechaInicio)).toISOString()}</Moment>}

											/>
										</div>
										<div class="form-group">
											<label>Fecha de Finalización</label>
											<input
												name="Finalizado"
												onChange={this.UpdateState}
												type="datetime-local"
												class="form-control"
												// defaultValue={	<Moment format="DD/MM/YYYY HH:mm">{new Date(Number(this.state.Finalizado)).toISOString()}</Moment>}
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
									<div class="p-footer">
										<button type="button" class="btn btn-secondary" data-dismiss="p">
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
		
		return (
<Fragment>
			
						{this.ShowPortar()}
						</Fragment>
		);
	}
}

export default withRouter(cambioEstado);
