import React, {useState, useEffect} from 'react';


function CustomerList(props){
    return(
        <div id="customer-list-div">
            <div className="boxed" id={"list-outer"} >
    
            <h4 >Customer List</h4>
            <table id="customer-list">
                <thead >
                <tr> 
                    <th id="tb-head">Name</th>
                    <th id="tb-head1">Email</th>
                    <th id="tb-head2">Pass</th>

                </tr>
                </thead>
                <tbody>
                {props.data.map(
                    (item, index) => {
                    return (<tr 
                    key={item.id} 
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