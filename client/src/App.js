import { useState } from 'react';
import './App.css';

function App() {
  const [name,setName] = useState('')
  const [age,setAge] = useState(0)

  const handleSubmit = _=> alert(name + " " + age)

  return (
    <div className="App">
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
  );
}

export default App;
