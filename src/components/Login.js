import React from 'react'

function Login() {
  return (
    <section className='sign sign-in'>

      <div className='sign__container'>
        <h2 className='sign__title'>Вход</h2>

        <form className='sign__form sign__form-entrance' action="formEntrance" name="formEntrance" noValidate>
          <input className='sign__text sign__text-entrance-email' id="email-entrance-input" type="email" name="email" placeholder="Email" required />
          <div className='sign__text-block'>
            <span className='sign__text-error email-input-error'></span>
          </div>
          <input className='sign__text sign__text-entrance-password' id="password-entrance-input" type="password" name="password" placeholder="Пароль" required />
          <div className='sign__text-block'>
            <span className='sign__text-error password-input-error'></span>
          </div>

          <button className='sign__actions sign-entrance__actions sign__actions_disabled' type="submit">Войти</button>
        </form>

      </div>

    </section>
  )
}

export default Login;