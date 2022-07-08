import type { GetServerSideProps, NextApiRequest, NextApiResponse } from 'next';
import { asNextApi } from '../lib/serverProps'
import { loginRequired } from '../lib/loggedin'

import { useUser } from '../lib/hooks'
import Layout from '../components/Layout'
import ButtonPrimary from '../components/ButtonPrimary';

const Profile = ({user}) => {
    return (
        <Layout title="User Profile" user={user}>
          <div style={{margin: "3em"}}>
            <h1>Profile</h1>
            {user && (
                <>
                  <div>Username: {user.username}</div>
                  <div>Created: {new Date(Number(user.created)).toISOString()}</div>
                  <div>Roles: <ul>{user.roles.map(role => <li key={role}>{role}</li>)}</ul></div>
                </>
            )}
            {user && user.roles.includes('admin') && (<a href="/roles">Role Management</a>)}
            <ButtonPrimary href="/api/logout">Logout</ButtonPrimary>
          </div>
        </Layout>
    )
}


export async function getServerSideProps(ctx: GetServerSideProps) {
    let [req, res] = asNextApi(ctx.req, ctx.res);

    let user = await loginRequired(req, res);
    if(!user) {
        res.redirect('/login');
    }
    return {
        props: { user }
    };
}


export default Profile
