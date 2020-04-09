import React, { Component, Fragment } from 'react';

import { Query } from 'react-apollo';

import { GETTICKETS } from '../../GraphQL/querry/tickets';

import Contenido from './contenido';

class cart extends Component {
	state = {};
	render() {
		return (
			<div className="row m-2">
				<Query
					query={GETTICKETS}
					//   pollInterval={500} // ESTO ES PARA EL CACHING, 500 ES IGUAL A MEDIO SEGUNDO
					variables={{
						// limite: this.limite,
						// offset: this.state.paginador.offset
						Estado:this.props.State
					}}
				>
					{({
						loading,
						error,
						data,
						refetch,
				//		startPolling,
				//		stopPolling //para recargar el resto de la vista
					}) => {
						refetch()
						if (loading) return 'Cargando...';
						if (error) return `Error: ${error.message}`;

						const patt =  new RegExp(`${this.props.Datas}`,'gi');
					    const datos=data.getTickets.filter(dat=>patt.exec(dat.Actividad)   );
						return (
							<Fragment>
							{datos.map((item)=>{ 
								const {id}=item;

								

return(
	<Contenido 
	key={id} 
	id={item.id}
	Actividad={item.Actividad}
    Ticket={item.Ticket}
    FechaSolicitud={item.FechaSolicitud}
    FechaInicio={item.FechaInicio}
    Observaciones={item.Observaciones}
	Estado={item.Estado}
	Finalizado={item.Finalizado}
	Reportado={item.Reportado}
	Realizado={item.Realizado}
	/>
								)
								
							})}
								

								{/* 			
				<div className="col-sm-2 col-3">
					<div className="card text-white bg-secondary mb-3">
						<div className="card-header">Header</div>
						<div className="card-body">
							<h5 className="card-title">Special title treatment</h5>
							<p className="card-text">
								With supporting text below as a natural lead-in to additional content.
							</p>
							<p className="btn btn-primary">
								Go somewhere
							</p>
						</div>
						<div className="card-footer">
							<small className="text-muted-white ">Last updated 3 mins ago</small>
						</div>
					</div>
				</div> */}
							</Fragment>
						);
					}}
				</Query>
			</div>
		);
	}
}

export default cart;
