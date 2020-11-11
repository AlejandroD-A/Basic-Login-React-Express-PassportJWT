/* eslint-disable react/prop-types */
import React from 'react';

function LoginForm({
  handleChange, handleSubmit, email, password,
}) {
  return (

    // eslint-disable-next-line react/jsx-filename-extension
    <form className="sign-form" onSubmit={(e) => e.preventDefault()}>
      <div className="form-control">
        <input type="text" data-input="email" placeholder="Email Address" value={email} onChange={(e) => handleChange(e)} />
      </div>
      <div className="form-control">
        <input type="password" data-input="password" placeholder="password" value={password} onChange={(e) => handleChange(e)} />
      </div>

      <button type="submit" onClick={handleSubmit}>Login </button>
      <div className="bottom">
        By clicking this button, you are agreeding to our
        <span className="terms">Terms and Services</span>
      </div>
    </form>
  );
}

export default LoginForm;
