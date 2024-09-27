import React, { useState, useEffect } from 'react';
import { getAll, putCustomer, deleteCustomer, deleteById, postCustomer, put, post } from './data.js'
import './App.css';
import CustomerList from './components/CustomerList.jsx';
import CustomerForm from './components/CustomerForm.jsx';
import Pagination from './components/Pagination.jsx';

export function App(params) {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage] = useState(10);

  let blankCustomer = {"id": -1, "name": "", "email": "", "password": ""};
  const [formObject, setFormObject] = useState(blankCustomer);
  let mode = (formObject.id >= 0) ? 'Update' : 'Add';

  useEffect(() => {
    getCustomers();
  }, []);

  const getCustomers = async function() {
    setLoading(true);
    try {
      const data = await getAll();
      setCustomers(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  // Get current customers
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = customers.slice(indexOfFirstCustomer, indexOfLastCustomer);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <div>
      <CustomerList 
        data={currentCustomers} 
        formObject={formObject} 
        mode={mode}
        onSelect={handleListClick}
      />
      <CustomerForm
        formObject={formObject} 
        mode={mode}
        onChange={handleInputChange}
        onDeleteClick={onDeleteClick}
        onSaveClick={onSaveClick}
        onCancelClick={onCancelClick}
      />
      <Pagination
        customersPerPage={customersPerPage}
        totalCustomers={customers.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}

export default App;