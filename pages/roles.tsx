import { useUser } from '../lib/hooks'
import { useEffect, useState } from 'react'
import Layout from '../components/Layout'

async function fetcher(url, method, data={}) {
    try {
        const options = gen_options(method, data);
        const res = await fetch(url, options);
        if(res.ok) {
            return {data:  await res.json()};
        }
        throw new Error(`${res.status}: ${res.statusText} ${res.url}`);
    } catch (err) {
        return {error : err.message};
    }
}

function gen_options(method, data) {
    let opts = { method }
    if(method != 'GET' && method != 'BODY') {
        opts.headers = { 'Content-Type': 'application/json' };
        opts.body = JSON.stringify(data);
    }
    return opts;
}

const Roles = () => {
    const user = useUser({ redirectTo: '/' })

    const [role_data, setRoleData] = useState([]);
    const [user_data, setUserData] = useState([]);
    const [error, setError] = useState('');

    const updateRoleData = async() => {
        const {data: data, error: err} = await fetcher('/api/roles','GET');
        if(err) { setError(err); }
        if(data) { setRoleData(data); }
    }
    const updateUserData = async() => {
        const {data: data, error: err} = await fetcher('/api/users','GET');
        if(err) { setError(err); }
        if(data) { setUserData(data); }
    }

    useEffect(() => {
        updateRoleData();
        updateUserData();
    }, [])

    const removeRole = async (event: any, role: any) => {
        const out = await fetcher(`/api/roles/${role.id}`, 'DELETE');
        updateRoleData();
    };
    const addRole = async (event: any) => {
        const rolename = document.querySelector('#add_rolename').value;
        const out = await fetcher('/api/roles', 'POST', {rolename: rolename })
        updateRoleData();
    };
    const addRoleToUser = async (event: any, user: any) => {
        const out = await fetcher(`/api/users/${user.id}`, 'POST', {
            username: user.username,
            rolename: event.target.id,
            action: 'USER_ADD_ROLE',
        });
        updateUserData();
    };
    const removeRoleFromUser = async (event: any, user: any, role: any) => {
        const out = await fetcher(`/api/users/${user.id}`, 'DELETE', {
            username: user.username,
            rolename: role,
            action: 'USER_REMOVE_ROLE',
        });
        updateUserData();
    };

    if(error) return <div style={{textAlign: "center", lineHeight: "100vh"}}>Error: {error}</div>
    if(!user_data) return <div>Loading user data</div>
    if(!role_data) return <div>Loading role data</div>

    return (
        <Layout user={user}>
        <div style={{margin: "3em"}}>
          <div>
            <h3>Roles</h3>
            <ul style={{paddingLeft: "3em"}} >
              {
                  role_data.map(role =>
                      <li key={role.id}>
                        {role.rolename} --
                        <button onClick={(ev) => removeRole(ev, role)}>Remove Role</button>
                      </li>)
              }
            </ul>
            <input style={{marginLeft: "2em"}}  type="text" id="add_rolename" placeholder="Rolename..."/>
            <button onClick={(ev) => addRole(ev)}>Add Role</button>
          </div>
          <hr/>
          <div>
            <h3>Users</h3>
            <div>
              {
                  user_data.map(user =>
                      <div style={{paddingLeft: "3em"}} key={user.id}>
                        {user.username} --
                        <button>Remove User</button>
                        <ul>
                          {
                              user.roles.map(role =>
                                  <li key={role}>{role} --
                                    <button onClick={(ev) => removeRoleFromUser(ev,user,role)}>Remove Role</button>
                                  </li>
                              )
                          }
                        </ul>
                        <select key={user.id} onClick={(ev) => addRoleToUser(ev, user)}>
                          <option key="nothing">Add Role to User</option>
                          {
                              role_data.filter(role => !(user.roles.includes(role.rolename))).map(role =>
                                  <option key={user.id+role.id}
                                          value={role.id}
                                          id={role.rolename}>
                                    {role.rolename}
                                  </option>
                              )
                          }
                        </select>
                      </div>
                  )
              }
            </div>
          </div>
        </div>
        </Layout>
    );
};

/*

*/

export default Roles
