import React, {useState, useEffect} from 'react';
import { getAll, putCustomer, deleteCustomer, deleteById, postCustomer, put, post } from './data.js'
import './App.css';
import CustomerList from './components/CustomerList.jsx';
import CustomerForm from './components/CustomerForm.jsx';


export function App() {
  let blankCustomer = {"id": -1, "name": "", "email": "", "password": ""};

  const [customers, setCustomers] = useState([]);

  const [formObject, setFormObject] = useState(blankCustomer);

  const [searchQuery, setSearchQuery] = useState('');

  let mode = (formObject.id >= 0)? 'Update': 'Add';

  useEffect(() => { getCustomers() }, [formObject]);
  
  const getCustomers = function () 
  {
    console.log("in getCustomers()");
    getAll(setCustomers);
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

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  }


  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchQuery.toLocaleLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLocaleLowerCase())
    );

  const handleInputChange = function(event)
  {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    let newFormObject = {...formObject};
    newFormObject[name] = value;
    setFormObject(newFormObject);
  }

  const onDeleteClick = function () 
  {
    if(window.confirm('Are you sure you want to delete this customer?'))
    {
      let postopCallback = () => { setFormObject(blankCustomer); }
      if (formObject.id >= 0) {
        deleteById(formObject.id, postopCallback);
        getCustomers();
      } else {
        setFormObject(blankCustomer);
      }
    }
  }


  let onSaveClick = function () 
  {
    let postopCallback = () => { setFormObject(blankCustomer); }
    if (mode === 'Add') {
      post(formObject, postopCallback);
    }
    if (mode === 'Update') {
      put(formObject, postopCallback);
    }
  }  

  const onCancelClick = function()
  {
    console.log("cancel clicked");
    setFormObject(blankCustomer);
  }  

  return (
    <div>
          <input
          type="text"
          placeholder="Search by name or email"
          value={searchQuery}
          onChange={handleSearchChange}
          />

          <CustomerList 
            data={filteredCustomers} 
            formObject={formObject} 
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
