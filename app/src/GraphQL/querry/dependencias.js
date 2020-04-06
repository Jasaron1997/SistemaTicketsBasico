import gql from 'graphql-tag';

export const GETDEPENDENCIAS = gql`
	query getDependencias {
		getDependencias {
			Nombre
			Eliminado
		}
	}
`;
