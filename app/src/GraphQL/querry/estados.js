import gql from 'graphql-tag';

export const GETESTADOS = gql`
	query getEstados {
		getEstados {
			id
			Nombre
			Descripcion
			Color
			Eliminado
		}
	}
`;
