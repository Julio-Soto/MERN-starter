import { useEffect, useState } from 'react';
import './App.css';
import Axios from 'axios'

function App() {
  const [name,setName] = useState('')
  const [age,setAge] = useState(0)
  const [friendsList,setFriendsList] = useState([])

  const handleSubmit = _=> Axios.post('http://10.0.0.59:3001/insert',
                                      {name: name, age: age})
                                      .then( _=> setFriendsList([...friendsList,{name: name, age: age}]))
                                      .catch( err => console.log(err))

  useEffect(
    _=> {
        Axios.get('http://10.0.0.59:3001/read')
          .then(res => setFriendsList(res.data))
          .catch(err => console.log(err))
    }
  ,[])

  return (
    <div className="App">
      <div className='dataInput'>
        <h2>Enter Friend DATA</h2>
        <input 
          type='text'
          placeholder='First Name'
          onChange={ (event) => setName(event.target.value)}
        />
        <input 
          type='number'
          placeholder='Age'
          onChange={(event) => setAge(event.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div className='dataDisplay'>
        <ul className='friendsList'>
          {friendsList.map(friend => {
            return(
            <li key={friend.name}className='friendItem'>
              <span>{friend.name}</span>
              <span> {friend.age}</span>
            </li>
            )
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
