import {useState} from 'react';
import data from '../data';

function CustomerForm(props){

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
          <h4>{mode}</h4>
          <div>
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

export default CustomerForm;