function Form(){


    const handleSave = () => {
        console.log("Save button")
      }
    
      const handleDelete = () => {
        console.log("Delete button")
      }
    
      const handleUpdate = () => {
        console.log("Update button")
      }


    return (

        <div>
            <input placeholder="Name"/>
            <input placeholder="Email"/>
            <input placeholder="Password"/>
            <button onClick={handleUpdate}>Update</button>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
        
    );


}

export default Form;