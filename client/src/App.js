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

                      
  const updateFriend = id => {
    const newAge = prompt('enter new age: ')

    Axios.put('http://10.0.0.59:3001/update', {newAge: newAge, id: id} )
              .then( _=> setFriendsList(friendsList.map(friend => {
                return friend._id === id? {name: friend.name, age: newAge} : friend
              })))
  }

  const deleteFriend = _id => {
    console.log('id:' + _id)
    Axios.delete('http://10.0.0.59:3001/delete?id='+_id)
                  .then(_=> setFriendsList(friendsList.filter(friend => {
                    return friend._id !== _id
                  })))
                  .catch(err => console.log(err))
  }                            
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
            <li key={friend.name} className='friendItem'>
              <span className='dataField'>{friend.name}</span>
              <span className='dataField right'> {friend.age}</span>
              <span className="material-symbols-outlined" onClick={() => {updateFriend(friend._id)}}>edit</span>
              <span className='material-symbols-outlined' onClick={() => {deleteFriend(friend._id)}}>delete</span>
            </li>
            )
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
