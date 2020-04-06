import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { Query } from 'react-apollo';
import { GETESTADOS } from '../../GraphQL/querry/estados';

class navbar extends Component {
	state = {};
	UpdateState =()=>{
		alert("datos")
	}
	BuscarDatos=(e)=>{
		e.preventDefault();
		
	}

	render() {
		return (
			<nav className=" navbar  navbar-expand-lg navbar-dark bg-dark">
				<Link to="/" className="navbar-brand">
					TMS
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon" />
				</button>

				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav mr-auto">
						{/* <li className="nav-item active">
							<h5 className="nav-link">
								Home <span className="sr-only">(current)</span>
							</h5>
						</li> */}
						<li className="nav-item ">
							<Link to='/' className="nav-link">Tarjeta</Link>
						</li>
						<li className="nav-item">
							<Link  to='/listado' className="nav-link">Listado</Link>
						</li>
					

						<li className="nav-item dropdown">
							<div class="dropdown">
								<button
									class="btn nav-link dropdown-toggle"
									type="button"
									id="dropdownMenuButton"
									data-toggle="dropdown"
									aria-haspopup="true"
									aria-expanded="false"
								>
									Crear
								</button>
								<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
									<Link to='/ticket/crear' className="dropdown-item">Ticket</Link>
									<div className="dropdown-divider" />
									<Link to='/estado/crear' className="dropdown-item">Estado</Link>
									<div className="dropdown-divider" />
									<Link to='/personal/crear' className="dropdown-item">Personal</Link>
									<div className="dropdown-divider" />
									<Link to='/dependencia/crear' className="dropdown-item">Dependencia</Link>
								</div>
							</div>
						</li>

						<li className="nav-item dropdown">
							<div class="dropdown">
								<button
									class="btn nav-link dropdown-toggle"
									type="button"
									id="dropdownMenuButton"
									data-toggle="dropdown"
									aria-haspopup="true"
									aria-expanded="false"
								>
									Estado
								</button>
								<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
								<h5 className="dropdown-item" onClick={this.props.UpdateState(null)}>Todos</h5>
									<Query query={GETESTADOS}>
									{({ loading, error, data, refetch }) => {
										refetch();
										if (loading) return 'Cargando...';
										if (error) return `Error: ${error.message}`;
										return (
											<Fragment>
												{data.getEstados.map((item) => <h5 className="dropdown-item text-white" onClick={this.props.UpdateState(item.id)} style={{ background:item.Color}} >{item.Nombre}</h5>)}
											</Fragment>
										);
									}}
								</Query>
								</div>
							</div>
						</li>
						{/* <li className="nav-item">
                  <h5 className="nav-link disabled" tabindex="-1" aria-disabled="true">Disabled</h5>
                </li> */}
					</ul>
					<form className="form-inline my-2 my-lg-0"  onSubmit={this.BuscarDatos}>
						<input
							className="form-control mr-sm-2"
							type="search"
							placeholder="Search"
							aria-label="Search"
						/>
						<button className="btn btn-outline-success my-2 my-sm-0" type="submit">
							Search
						</button>
					</form>
				</div>
			</nav>
		);
	}
}

export default navbar;
