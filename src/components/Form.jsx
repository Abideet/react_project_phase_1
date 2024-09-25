import {useState} from 'react';
import data from '../data';

function Form(props){

  const [record, setRecord] = useState({data});
  const [name, setName] = useState('');

  const handleSave = () => {
      console.log("Save button")
    }
  
    const handleDelete = () => {
      console.log("Delete button")
    }
  
    const handleUpdate = () => {
      setRecord({
        ...record,
        name: name
      });
    }

  return (

      <div>
          <input value={name} placeholder="Name"/>
          <input placeholder="Email"/>
          <input placeholder="Password"/>
          <button onClick={handleUpdate}>Update</button>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleDelete}>Delete</button>
      </div>
      
  );


}

export default Form;