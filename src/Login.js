import React from 'react';
import $ from "jquery";
import ReactDOM from 'react-dom';
import { Route, Redirect } from 'react-router';

//import './index.css';

class Login extends React.Component {
	//const user = 'admin';
	//const password = 'soft';
	
	constructor(props) {
		super(props);
		this.state = {
			user: '', 
			password: ''
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	
	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmit(e) {
		e.preventDefault();
		const {user, password} = this.state;
		if((user !== "admin") && (password !== "soft")){
			alert('Credenciais inválidas.');
		}else{
			this.props.history.push('./Home');
			this.serverRequest = $.get("http://localhost:3000/react-lorena/public/teste.html");
	
			
			
		}
    
		
	}

  render() {
	const {user, password} = this.state;
    return (
		<div className="Login">
			<form onSubmit={this.onSubmit}>
				<h2>Desafio SOFTBOX</h2>	
				<hr />
				<input className="form-control" placeholder="Digite seu usuário" name="user" value={user} onChange={this.onChange} />
        
				<br />
				<input type="password" className="form-control" placeholder="Digite sua senha" name="password" value={password} onChange={this.onChange} />
       
				<br />		
			
				<button type="submit" className="btn btn-info">Acessar</button>
			</form>
		</div>
	
    );
  }
}

export default Login;





