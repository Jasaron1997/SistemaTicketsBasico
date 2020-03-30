import React, { Component } from 'react';
import Moment from 'react-moment';

import Personal from './personal';
class contenido extends Component {
	state = {};
	render() {
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
		const {Color}=this.props.Estado[0];
		return (
			<div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 ">
				<div className={`card text-white bg-${Color} mb-3`}>
					<div className="card-header">
						T-{Ticket} {Estado[0].Nombre}
					</div>
					<div className="card-body">
						<h5 className="card-title">{Actividad}</h5>
						<p className="card-text">{Observaciones}</p>
						<ul className="list-group list-group-flush">
							<li className={`list-group-item  bg-${Color}`}>
							{'Solicitud: '}<Moment format="DD/MM/YYYY HH:mm">
									{new Date(Number(FechaSolicitud)).toISOString()}
								</Moment>
							</li>
							<li className={`list-group-item  bg-${Color}`}>
								{`Inicio: `}<Moment format="DD/MM/YYYY HH:mm">
									{new Date(Number(FechaInicio)).toISOString()}
								</Moment>
							</li>
							<li className={`list-group-item  bg-${Color}`}>
								{`Finalizado: `}<Moment format="DD/MM/YYYY HH:mm">
									{new Date(Number(Finalizado)).toISOString()}
								</Moment>
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

						<p className="btn btn-primary">Cambiar Estado</p>
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

export default contenido;
