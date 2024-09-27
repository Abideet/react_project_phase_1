import React, {useState, useEffect} from 'react';
import { getAll, putCustomer, deleteCustomer, deleteById, postCustomer, put, post } from './data.js'
import './App.css';
import CustomerList from './components/CustomerList.jsx';
import CustomerForm from './components/CustomerForm.jsx';

function log(message){console.log(message);}

export function App(params) {

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:4000/customers");
        const data = await response.json();
        setCustomers(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, []);



  let blankCustomer = {"id": -1, "name": "", "email": "", "password": ""};

  const [customers, setCustomers] = useState([]);

  const [formObject, setFormObject] = useState(blankCustomer);

  let mode = (formObject.id >= 0)? 'Update': 'Add';

  useEffect(() => { getCustomers() }, []);
  
  const getCustomers = function () 
  {
    log("in getCustomers()");
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


  const handleInputChange = function(event)
  {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    let newFormObject = {...formObject};
    newFormObject[name] = value;
    setFormObject(newFormObject);
  }


  // const onDeleteClick = function()
  // {
  //   if (window.confirm('Are you sure you want to delete this customer?')) 
  //   {
  //     setCustomers(deleteCustomer(formObject.id));
  //   }
  // }

  const onDeleteClick = function () {
    // if(window.confirm('Are you sure you want to delete this customer?'))
    // {
      let postopCallback = () => { setFormObject(blankCustomer); }
      if (formObject.id >= 0) {
        deleteById(formObject.id, postopCallback);
      } else {
        setFormObject(blankCustomer);
      }
    //}
  }

  // const onSaveClick = function()
  // {
  //   if(mode === 'Add'){
  //     let newItems = post(formObject.name, formObject.email, formObject.password);
  //     setCustomers(newItems);
  //   } 
  //   if(mode === 'Update')
  //   {
  //     let newItems = putCustomer(formObject.id, formObject.name, formObject.email, formObject.password);
  //     console.log(newItems);
  //     setCustomers(newItems);
  //   }

  //   setFormObject(blankCustomer);
  // }


  const onSaveClick = function () 
  {
    let postopCallback = () => { setFormObject(blankCustomer); }
    if (mode === 'Add') {
      post(formObject, postopCallback);
      getCustomers();
    }
    if (mode === 'Update') {
      put(formObject, postopCallback);
      getCustomers();
    }
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
