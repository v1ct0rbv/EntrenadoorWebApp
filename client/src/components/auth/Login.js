import React, {Fragment,useState} from 'react';
import {Link,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {login} from '../../actions/auth'

const Login = ({login,isAuthenticated}) => {
    const [formData, setFormData] = useState({
        email:'',
        password:''
    })

    const {email,password} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]:e.target.value})

    const onSubmit = async e => {
        e.preventDefault();
        login(email,password)
    }

     // Redireccionar si esta loggeado
    if (isAuthenticated) {
        return <Redirect to='/perfil' />;
    }
    return (
        <Fragment>
            <div className="text-center container p-5">
                <form className="form-signin" onSubmit={e => onSubmit(e)}>
                    <h1 className="h3 mb-3 font-weight-normal">Logearse para empezar a entrenar</h1>
                    <br/>
                    <label  className="sr-only">Correo electronico </label>
                    <input 
                    className="form-control" 
                    type="email" 
                    id="inputEmail" 
                    value={email}
                    onChange={e => onChange(e)}
                    placeholder="Correo electronico" 
                    required
                    name="email"
                    />
                    <br/>
                    <label  className="sr-only">Contraseña</label>
                    <input 
                    type="password" 
                    id="inputPassword" 
                    className="form-control" 
                    placeholder="Contraseña" 
                    required
                    value={password}
                    name="password"
                    onChange={e => onChange(e)}/>
                    <br/>
                    
                    
                    <button className="btn-train " type="submit">Iniciar Sesion</button>
                </form>
                <p className='my-1'>
                    ¿No tienes cuenta? <Link to='register'> Registrarse</Link>
                </p>
            </div>
        </Fragment>
    )
}

Login.propTypes = {
    login:PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
  });

export default connect(mapStateToProps,{login})(Login)
