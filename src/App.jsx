import React, {useState, useEffect} from 'react';
import { getAll, putCustomer, deleteCustomer, postCustomer } from './data.js'
import './App.css';
import CustomerList from './components/CustomerList.jsx';
import CustomerForm from './components/CustomerForm.jsx';

function log(message){console.log(message);}

export function App(params) {

  let blankCustomer = {"id": -1, "name": "", "email": "", "password": ""};

  const [customers, setCustomers] = useState([]);

  const [formObject, setFormObject] = useState(blankCustomer);

  let mode = (formObject.id >= 0)? 'Update': 'Add';

  useEffect(() => { getCustomers() }, []);
  
  const getCustomers = function()
  {
    setCustomers(getAll());
  }


  const handleListClick = function(item)
  {
    console.log("");
    if(formObject.id === item.id){
      setFormObject(blankCustomer);
    } else {
      setFormObject(item);
    }
  }


  const handleInputChange = function(event)
  {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    let newFormObject = {...formObject};
    newFormObject[name] = value;
    setFormObject(newFormObject);
  }


  const onDeleteClick = function()
  {
    if (window.confirm('Are you sure you want to delete this customer?')) 
    {
      setCustomers(deleteCustomer(formObject.id));
    }
  }

  const onSaveClick = function()
  {
    if(mode === 'Add'){
      let newItems = postCustomer(formObject.name, formObject.email, formObject.password);
      setCustomers(newItems);
    } 
    if(mode === 'Update')
    {
      let newItems = putCustomer(formObject.id, formObject.name, formObject.email, formObject.password);
      console.log(newItems);
      setCustomers(newItems);
    }

    setFormObject(blankCustomer);
  }

  const onCancelClick = function()
  {
    console.log("cancel clicked");
    setFormObject(blankCustomer);
  }
  

  return (
    <div>
          <CustomerList 
            data={customers} 
            formObject={formObject} 
            blankCustomer={blankCustomer} 
            mode={mode}
            onSelect={handleListClick}/>

          <CustomerForm
            formObject={formObject} 
            mode={mode}
            onChange={handleInputChange}
            onDeleteClick={onDeleteClick}
            onSaveClick={onSaveClick}
            onCancelClick={onCancelClick}
          />
        </div>


  );
}

export default App;
