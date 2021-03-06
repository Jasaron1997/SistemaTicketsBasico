import gql from 'graphql-tag';

export const GETTICKETS = gql`
	query getTickets($Estado:String) {
		getTickets(Estado:$Estado) {
			id
			Actividad
			Ticket
			FechaSolicitud
			FechaInicio
			Observaciones
			Estado {
				id
				Nombre
				Descripcion
				Color
			}
			Finalizado
			Reportado {
				id
				Nombre
				Dependencia
				RealizarTareas
			}
			Realizado {
				id
				Nombre
				Dependencia
				RealizarTareas
			}
		}
	}
`;
