import React, {Fragment,useState} from 'react';
import {Link,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {setAlert} from '../../actions/alert'
import {register} from '../../actions/auth'

import PropTypes from 'prop-types'


const Register = ({setAlert,register,isAuthenticated}) => {

    const [formData, setFormData] = useState({
        email:'',
        password:'',
        password2:'',
    })

    const {email,password,password2} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]:e.target.value})

    const onSubmit = async e => {
        e.preventDefault();
        if(password !== password2){
            setAlert('Las contraseñas no concuerdan','danger')
        } else {
           register({email,password})
        }
    }

      // Redireccionar si esta loggeado
        if (isAuthenticated) {
            return <Redirect to='/perfil' />;
        }

    return (
        <Fragment>
            <div className="text-center container p-5">
                <form className="form-signin" onSubmit={e => onSubmit(e)}>
                    <h1 className="h3 mb-3 font-weight-normal">Registrarse para empezar a entrenar</h1>
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
                    <label  className="sr-only">Re ingrese contraseña</label>
                    <input 
                    type="password" 
                    id="inputPassword" 
                    className="form-control" 
                    placeholder="Repetir Contraseña" 
                    required
                    value={password2}
                    name="password2"
                    onChange={e => onChange(e)}/>
                    <br/>
                    
                    <button className="btn-train " type="submit">Registrarse</button>
                </form>
                <p className='my-1'>
                    ¿Ya tienes cuenta? <Link to='login'> Iniciar sesion</Link>
                </p>
            </div>
        </Fragment>
    )
}

Register.propTypes = {
    setAlert:PropTypes.func.isRequired,
    register:PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
  });
  

export default connect(mapStateToProps,{register,setAlert})(Register)
