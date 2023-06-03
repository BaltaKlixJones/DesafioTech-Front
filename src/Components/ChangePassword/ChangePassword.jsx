import React, { useState } from 'react';
import './ChangePassword.css';
import { useDispatch } from 'react-redux';
import { changePassword } from '../../redux/Actions';
import Swal from 'sweetalert2';


const ChangePassword = () => {
    const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const currentuser = JSON.parse(sessionStorage.getItem('currentuser'));
  const email = currentuser.email;
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('LAS CONTRASEÑAS NO COINICDEN');
      return;
    }
    setError('');

    const userData = {
      email: email,
      password: password,
    };

    dispatch(changePassword(userData))
      .then(() => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Contraseña cambiada con éxito',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          window.location.href = '/perfil';
        });
      })
      .catch((error) => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Contraseña cambiada con éxito',
            showConfirmButton: false,
            timer: 1500,
            }).then(() => {
                window.location.href = '/Home';
            }
        );
        
      });
  };


  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <div className="container">
      <h1>Cambiar contraseña</h1>
      <form className="password-form" onSubmit={handleSubmit}>
        <div className="form-group">
            
          <label htmlFor="currentPassword"> Email : {currentuser.email}</label>
         
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">Nueva Contraseña: {" "}</label>
          <input
            type="password"
            id="newPassword"
            className='nva-contraseña'
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmar Contraseña: {" "}</label>
          <br />
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            className='nva-contraseña'
            onChange={handleConfirmPasswordChange}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Cambiar Contraseña</button>
      </form>
    </div>
  );
};

export default ChangePassword;
