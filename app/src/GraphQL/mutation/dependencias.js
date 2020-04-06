import gql from 'graphql-tag';

export const CREATEDEPENDENCIAS = gql`
	mutation CreateDependencias($input: DependenciasInput) {
		CreateDependencias(input: $input) {
			Nombre
		}
	}
`;
