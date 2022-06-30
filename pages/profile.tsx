import { useUser } from '../lib/hooks'
import Layout from '../components/Layout'

const Profile = () => {
  const user = useUser({ redirectTo: '/login' })

  return (
      <Layout user={user}>
        <div style={{margin: "3em"}}>
      <h1>Profile</h1>
      {user && (
        <>
          <div>Username: {user.username}</div>
          <div>Created: {new Date(Number(user.created)).toISOString()}</div>
          <div>Roles: <ul>{user.roles.map(role => <li key={role}>{role}</li>)}</ul></div>
        </>
      )}
          {
              user && user.roles.includes('admin') && (
                  <a href="/roles">Role Management</a>
              )
          }

      <style jsx>{`
        pre {
          white-space: pre-wrap;
          word-wrap: break-word;
        }
      `}</style>
      </div>
      </Layout>
  )
}

export default Profile
