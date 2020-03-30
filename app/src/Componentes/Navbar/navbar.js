import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class navbar extends Component {
	state = {};
	render() {
		return (
			<nav className=" navbar  navbar-expand-lg navbar-dark bg-dark">
				<h4 to="/" className="navbar-brand">
					TMS
				</h4>
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
						<li className="nav-item active">
							<h5 className="nav-link">
								Home <span className="sr-only">(current)</span>
							</h5>
						</li>
						<li className="nav-item">
							<h5 className="nav-link">Listado</h5>
						</li>
						<li className="nav-item">
							<h5 className="nav-link">Tarjeta</h5>
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
									<h5 className="dropdown-item">Personal</h5>
									<div className="dropdown-divider" />
									<h5 className="dropdown-item">Dependencia</h5>
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
									<h5 className="dropdown-item">Realizado</h5>
									<h5 className="dropdown-item">En Proceso</h5>
									<div className="dropdown-divider" />
									<h5 className="dropdown-item">Anulado</h5>
								</div>
							</div>
						</li>
						{/* <li className="nav-item">
                  <h5 className="nav-link disabled" tabindex="-1" aria-disabled="true">Disabled</h5>
                </li> */}
					</ul>
					<form className="form-inline my-2 my-lg-0">
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
