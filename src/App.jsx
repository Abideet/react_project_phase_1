import './App.css';
import DataTable from 'react-data-table-component';
//import { tableCustomStyles } from './tableStyle.jsx';
import data1 from './data.json';

import { useCallback, useState } from 'react';
import Form from "./components/Form"


function App() {

  const columns = 
  [
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true
    },
    {
      name: 'Password',
      selector: row => row.password,
      sortable: true
    }
  ];

  const [selectedRows, setSelectedRows] = useState([]);

  //conditionalRowStyles object with two properties: when and style
  const conditionalRowStyles = [
    {
      //when is a function that takes row as an arugument and returns true if 
      //the selected row has an id that matches the current rows id.
      when: row => selectedRows.some(selectedRow => selectedRow.id 
        === row.id),
        //style to apply when condition is true
        style: {
          fontWeight: 'bold',
        },
    },
  ];


  //useCallback caches the table so it isnt re-rendered everytime
  const handleChange = useCallback(({ selectedRows }) => {
    setSelectedRows(selectedRows);
    console.log('Selected Rows: ', selectedRows);
  },[]);

  return (
   <div className="App">
      <header className="fw-bold">
        Customer List
      </header>

      <DataTable 
        columns={columns} data={data1} 
        conditionalRowStyles={conditionalRowStyles}
        onSelectedRowsChange={handleChange}
        selectableRows />


      <Form/>
         
        
      
    </div>
  );
}

export default App;
