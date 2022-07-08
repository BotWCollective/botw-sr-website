import { useState } from 'react'
import Router from 'next/router'
import { useUser } from '../lib/hooks'
import LoginForm from '../components/LoginForm'
import Layout from '../components/Layout'
import Link from 'next/link';
import ButtonPrimary from '../components/ButtonPrimary'

import '../lib/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Login = ({user}) => {

  return (
      <Layout user={user}>
        <div className="login">
          { user && <div>You appear to already be logged in as {user.username}</div>}
          <ButtonPrimary
            href="/api/auth/github"
            alt="Login with Github">Login with Github <FontAwesomeIcon icon={['fab', 'github']} />
          </ButtonPrimary>
        </div>
      <style jsx>{`
        .login {
          max-width: 21rem;
          margin: 2em auto;
          padding: 1rem;
          border-radius: 4px;
        }
      `}</style>
    </Layout>
  );
};

import  getServerSideProps  from "../lib/serverProps";
export { getServerSideProps };

export default Login
