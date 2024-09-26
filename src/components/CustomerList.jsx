import React, {useState, useEffect} from 'react';
import { getAll, putCustomer, deleteCustomer, postCustomer } from '../data.js'


function CustomerList(props){
    return(

        <div>
            <div className="boxed" >
    
            <h4>Customer List</h4>
            <h4>{props.mode}</h4>
            <table id="customer-list">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Pass</th>
                </tr>
                </thead>
                <tbody>
                {props.data.map(
                    (item, index) => {
                    return (<tr key={item.id} 
                    className={ (item.id === props.formObject.id )?'selected': ''}
                    onClick={()=>props.onSelect(item)} 
                    >
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.password}</td>
                    </tr>);
                    }
                    )}
                </tbody>
            </table>
        </div>
      </div>



    );

}


export default CustomerList;