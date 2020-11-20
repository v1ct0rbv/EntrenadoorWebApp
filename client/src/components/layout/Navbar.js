import React, { Fragment } from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';


const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {

    const authLinks = (
      <Fragment>
                <li className="nav-item">
                  <Link className='nav-link e-4' style={{marginRight:'30px'}} to='/perfil'>
                  <span className='hide-sm'>Perfil</span>
                </Link>
                </li> 
                <li class="nav-item">
                  <Link onClick={logout} to='' class="btn-train nav-link "> Desconectarse </Link>
                
                </li>
      </Fragment>
    );
    const guestLinks = (
      <Fragment>
         <li className="nav-item">
                  <Link className="nav-link" style={{fontSize: '15px'}} to="/register">REGISTRARSE</Link>
                </li>
                <li className="nav-item">
                  <Link className="btn-train nav-link " to="/login"> ENTRENAR </Link>
                </li> 
      </Fragment>
    );

    return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light pt-3 pb-3" style={{borderBottom: '10px solid #DFDFDF',top:'-1px'}}>
        <Link className="navbar-brand ml-4 " to="/" >ENTRENADOOR</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse container " id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
                  <Link className="nav-link e-4" style={{fontSize: '15px'}} to="">ARTÍCULOS</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link e-4" style={{fontSize: '15px'}} to="#">PROGRAMAS</Link>
                </li>
          </ul>
          <ul className="navbar-nav mr-5">
                {!loading && (
                  <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
                )}
               
          </ul>
        </div>
    </nav>
    )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
