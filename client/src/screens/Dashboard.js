import React,{ useState, useEffect }from 'react';
import { useSelector } from 'react-redux'
import config  from '../config';

function Dashboard() {
  
  const [ users, setUsers ] = useState([])
  const user = useSelector(state => state.App.user)

  async function fetchUsers(){
    try{
      const response = await fetch(`${config.url}/api/users`,{
        headers:
          {'Authorization': `Bearer ${user.token}`,
           'Content-Type' : 'application/json',
          },
      });

      const data = await response.json();

      if( !response.ok ) throw data.message;
      
      setUsers(data)

    }catch(err){
      console.log(err)
    }

  }

  useEffect(() => {
    fetchUsers();
  }, [])

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div>
      <h1>Dashboard</h1>

      {users && users.map( user => <h1 key={user._id}> {user.email} </h1>)}
    </div>
  );
}

export default Dashboard;
