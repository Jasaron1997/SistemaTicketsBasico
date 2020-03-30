import gql from 'graphql-tag';

export const CREATETICKETS = gql`
	mutation CreateTickets($input: TicketsInput) {
		CreateTickets(input: $input) {
			id
			Actividad
			Ticket
			FechaSolicitud
			FechaInicio
			Observaciones
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
			Estado{
      id
      Nombre
      Descripcion
      Color
    }
			Finalizado
		}
	}
`;
