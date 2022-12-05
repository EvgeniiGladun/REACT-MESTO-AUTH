import React from 'react'

function Register() {
  return (
    <section className='sign sign-up'>

      <div className='sign__container'>
        <h2 className='sign__title'>Регистрация</h2>

        <form className='sign__form sign__form-registration' action="formRegistration" name="formRegistration" noValidate>
          <input className='sign__text sign__text-registration-email' id="email-registration-input" type="email" name="email" placeholder="Email" required />
          <div className='sign__text-block'>
            <span className='sign__text-error email-input-error'></span>
          </div>
          <input className='sign__text sign__text-registration-password' id="password-registration-input" type="password" name="password" placeholder="Пароль" required />
          <div className='sign__text-block'>
            <span className='sign__text-error password-input-error'></span>
          </div>

          <button className='sign__actions sign-entrance__actions sign__actions_disabled' type="submit">Зарегистрироваться</button>
          <p className='sign__text sign__text-registration'>Уже зарегистрированы? <a href="/">Войти</a></p>
        </form>
      </div>

    </section>
  )
}

export default Register;