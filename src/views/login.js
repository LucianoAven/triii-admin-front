import React, {Fragment} from 'react'
import {auth, db} from '../firebase'
import {withRouter} from 'react-router-dom'

const Login2 = () => {
  

  const [email, setEmail] = React.useState('prueba@prueba.com')
  const [pass, setPass] = React.useState('123123')
  const [error, setError] = React.useState(null)

  const procesarDatos = e => {
      e.preventDefault()
      if(!email.trim() || !pass.trim()){
          console.log('Datos vacíos email!')
          setError('Datos vacíos email!')
          return
      }
      if(!pass.trim()){
          console.log('Datos vacíos pass!')
          setError('Datos vacíos pass!')
          return
      }
      if(pass.length < 6){
          console.log('6 o más carácteres')
          setError('6 o más carácteres en pass')
          return
      }
      console.log('correcto...')
      setError(null)

      login()

  }

  const login = React.useCallback(async () => {
      try {
          const res = await auth.signInWithEmailAndPassword(email, pass)
          console.log(res.user)
          setEmail('')
          setPass('')
          setError(null)
      } catch (error) {
          console.log(error)
          if(error.code === 'auth/invalid-email'){
              setError('Email no válido')
          }
          if(error.code === 'auth/user-not-found'){
              setError('Email no registrado')
          }
          if(error.code === 'auth/wrong-password'){
              setError('Contraseña incorrecta')
          }
      }
  }, [email, pass])

  return (
      <div className="mt-5">
          <h3 className="text-center">
              Login
          </h3>
          <hr/>
          <div className="row justify-content-center">
              <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                  <form onSubmit={procesarDatos}>
                      {
                          error ? (
                              <div className="alert alert-danger">
                                  {error}
                              </div>
                          ) : null
                      }
                      <input
                          type="email"
                          className="form-control mb-2"
                          placeholder="Ingrese Email"
                          onChange={ e => setEmail(e.target.value) }
                          value={email}
                      />
                      <input
                          type="password"
                          className="form-control mb-2"
                          placeholder="Ingrese Contraseña"
                          onChange={ e => setPass(e.target.value) }
                          value={pass}
                      />
                      <button
                          className="btn btn-lg btn-dark btn-block"
                          type="submit"
                      >
                          Acceder
                      </button>

                  </form>
              </div>
          </div>
      </div>
  )
};

export default Login2;
