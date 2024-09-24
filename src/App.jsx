import './App.css';
import DataTable from 'react-data-table-component';
//import { tableCustomStyles } from './tableStyle.jsx';
import { useCallback, useState } from 'react';


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

  //in memory data
  const data = [{id:1,name:"Bradney Cockerill",email:"bcockerill0@reddit.com",password:"gI9$+#'oEg>#u"},
                {id:2,name:"Amalea Anan",email:"aanan1@cdbaby.com",password:"rL4@RGYr{8qjX"}];

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

  const handleSave = () => {
    console.log("Save button")
  }

  const handleDelete = () => {
    console.log("Delete button")
  }

  return (

   <div className="App">

      <header className="fw-bold">
        Customer List
      </header>
      

      <DataTable 
        columns={columns} data={data} 
        conditionalRowStyles={conditionalRowStyles}
        onSelectedRowsChange={handleChange}
        selectableRows />
         
        <button onClick={handleSave}>Save</button>
        <button onClick={handleDelete}>Delete</button>
      
    </div>
  );
}

export default App;
