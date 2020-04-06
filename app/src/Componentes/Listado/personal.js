import React, { Component } from 'react';

class personal extends Component {
	state = {};
	render() {
	
		return (
                        	<li className={`list-group-item`} style={{ background:this.props.Color}}>{`${this.props.Personal.Nombre} (${this.props.Personal.Dependencia})`}</li>
					
		);
	}
}

export default personal;
