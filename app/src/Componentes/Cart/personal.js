import React, { Component } from 'react';

class personal extends Component {
	state = {};
	render() {
	
		return (
                        	<li className={`list-group-item`} style={{ background:this.props.Color}}>{this.props.Personal.Nombre}</li>
					
		);
	}
}

export default personal;
