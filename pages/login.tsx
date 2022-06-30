import { useState } from 'react'
import Router from 'next/router'
import { useUser } from '../lib/hooks'
import LoginForm from '../components/LoginForm'
import Layout from '../components/Layout'

const Login = () => {
    const user = useUser({ redirectTo: '/', redirectIfFound: true })

  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e) {
      e.preventDefault()

      if (errorMsg) setErrorMsg('')

      const body = {
          username: e.currentTarget.username.value,
          password: e.currentTarget.password.value,
      };
      try {
          const res = await fetch('/api/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(body),
          });
          if (res.status === 200) {
              Router.push('/')
          } else {
              const text = await res.json();
              throw new Error( text.message )
          }
      } catch (error) {
          setErrorMsg(error.message)
      }
  }

  return (
      <Layout user={user}>
      <div className="login">
        <LoginForm isLogin errorMessage={errorMsg} onSubmit={handleSubmit} />
      </div>
      <style jsx>{`
        .login {
          max-width: 21rem;
          margin: 2em auto;
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
      `}</style>
    </Layout>
  );
};

export default Login
