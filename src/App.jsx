import React, {useState, useEffect} from 'react';
import { getAll, putCustomer, deleteCustomer, postCustomer } from './data.js'
import './App.css';
import CustomerList from './components/CustomerList.jsx';

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

          <div className="boxed">
            <div>
            <h4>{mode}</h4>
            </div>
            <form >
              <table id="customer-add-update" >
                <tbody>
                  <tr>
                    <td className={'label'} >Name:</td>
                    <td><input
                      type="text"
                      name="name"
                      onChange={(e) => handleInputChange(e)}
                      value={formObject.name}
                      placeholder="Customer Name"
                      required /></td>
                  </tr>
                  <tr>
                    <td className={'label'} >Email:</td>
                    <td><input
                      type="email"
                      name="email"
                      onChange={(e) => handleInputChange(e)}
                      value={formObject.email}
                      placeholder="name@company.com" /></td>
                  </tr>
                  <tr>
                    <td className={'label'} >Pass:</td>
                    <td><input
                      type="text"
                      name="password"
                      onChange={(e) => handleInputChange(e)}
                      value={formObject.password}
                      placeholder="password" /></td>
                  </tr>
                  <tr className="button-bar">
                    <td colSpan="2">
                      <input type="button" value="Delete" onClick={onDeleteClick} />
                      <input type="button" value="Save" onClick={onSaveClick} />
                      <input type="button" value="Cancel" onClick={onCancelClick} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>


          </div>
        </div>


  );
}

export default App;
