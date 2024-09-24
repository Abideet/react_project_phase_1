import './App.css';
import DataTable from 'react-data-table-component';
//import { tableCustomStyles } from './tableStyle.jsx';
import { useState } from 'react';


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

  const data = [{id:1,name:"Bradney Cockerill",email:"bcockerill0@reddit.com",password:"gI9$+#'oEg>#u"},
                {id:2,name:"Amalea Anan",email:"aanan1@cdbaby.com",password:"rL4@RGYr{8qjX"}];

  

  // const columns = 
  // [
  //   {
  //     name: 'Name',
  //     selector: "name",
  //     sortable: true,
  //   },
  //   {
  //     name: 'Email',
  //     selector: "email",
  //     sortable: true
  //   },
  //   {
  //     name: 'Password',
  //     selector: "password",
  //     sortable: true
  //   }
  // ];

  // const data = [{id:1,name:"Bradney Cockerill",email:"bcockerill0@reddit.com",password:"gI9$+#'oEg>#u"},
  //               {id:2,name:"Amalea Anan",email:"aanan1@cdbaby.com",password:"rL4@RGYr{8qjX"}];

  const [selectedRows, setSelectedRows] = useState([]);

  const tableCustomStyles = {
    cells: {
      style: (row) =>  ({
        fontWeight: selectedRows.includes(row.name) ? 'bold' : 'normal',
      }),
    },
  };

  const handleChange = ({ selectedRows }) => {
    // You can set state or dispatch with something like Redux so we can use the retrieved data
    //console.log('Selected Rows: ', selectedRows);
    setSelectedRows(selectedRows.map(row => row.name));
    console.log('Selected Rows: ', selectedRows);

  };

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
        customStyles={tableCustomStyles}
        onSelectedRowsChange={handleChange}
        selectableRows />
         
        <button onClick={handleSave}>Save</button>
        <button onClick={handleDelete}>Delete</button>
      
    </div>
  );
}

export default App;
