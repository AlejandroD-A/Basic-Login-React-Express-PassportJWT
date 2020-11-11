import React from 'react'

function RegisterForm( { handleChange,handleRegister,lastName, name,email, password }) {
    return (

        
        <form className="sign-form" onSubmit = {(e)=> e.preventDefault() }>
            <div className="form-control">
                <input type="text" data-input='name' value = {name} onChange ={(e)=> handleChange(e)} placeholder="First Name"/>
            </div>
            <div className="form-control">
                <input type="text" data-input='lastName' value={lastName} onChange={(e) =>handleChange(e) } placeholder="Last Name"/>
            </div>
            <div className="form-control">
                <input type="text" data-input='email' placeholder="Email Address" value = {email} onChange ={(e)=> handleChange(e)}/>
            </div>
            <div className="form-control">
                <input type="password" data-input='password' placeholder="password" value = {password} onChange ={(e)=> handleChange(e)}/>
            </div>

            <button onClick = {  handleRegister } >Register NOW </button>
            <div className="bottom">By clicking this button, you are agreeding to our <span className="terms">Terms and Services</span></div>
        </form>
    )
}

export default RegisterForm
