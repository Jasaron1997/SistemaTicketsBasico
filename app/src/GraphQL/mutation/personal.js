import gql from 'graphql-tag';

export const CREATEPERSONAL = gql`
	mutation CreatePersonal($input: PersonalesInput) {
		CreatePersonal(input: $input) {
			id
			Nombre
			Dependencia
			RealizarTareas
			RealizarTareas
			Eliminado
		}
	}
`;
