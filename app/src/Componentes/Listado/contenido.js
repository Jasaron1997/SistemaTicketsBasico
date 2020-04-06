import React, { Component } from 'react';
import Moment from 'react-moment';

import Personal from './personal';
class contenido extends Component {
	state = {};
	render() {
		const {
			Ticket,
			Actividad,
			FechaSolicitud,
			FechaInicio,
			Estado,
			Finalizado,
			Reportado,
			Realizado,
			Observaciones
		} = this.props;
		const { Color } = this.props.Estado[0];
		return (
			<tr className="text-white" style={{ background:Color}}>
				<td >{Ticket}</td>
				<td>{Actividad}</td>
				<td>
					<Moment format="DD/MM/YYYY HH:mm">{new Date(Number(FechaSolicitud )).toISOString()}</Moment>
				</td>
				<td>
					<Moment format="DD/MM/YYYY HH:mm">{new Date(Number( FechaInicio )).toISOString()}</Moment>
				</td>
				<td>{Estado[0].Nombre}</td>
				<td>
					<Moment format="DD/MM/YYYY HH:mm">{new Date(Number( Finalizado )).toISOString()}</Moment>
				</td>
				<td> 	<ul class="list-group list-group-flush">{Reportado.map((data, index) => <Personal key={index} Personal={data} Color={Color} />)}</ul></td>
				<td> 	<ul class="list-group list-group-flush">{Realizado.map((data, index) => <Personal key={index} Personal={data} Color={Color} />)}</ul></td>
				<td>{Observaciones}</td>
			</tr>
		);
	}
}

export default contenido;
