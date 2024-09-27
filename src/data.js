let items = 
[
    {"id":1,"name":"Dan Cockerill","email":"bcockerill0@reddit.com","password":"gI9$+#'oEg>#u"},
    {"id":2,"name":"Amalea Anan","email":"aanan1@cdbaby.com","password":"rL4@RGYr{8qjX"}
]

// export function getAll(){
//     return items;
// }

const baseURL = 'http://localhost:4000/customers';

//getting data
export async function getAll(setCustomers)
{
    const myInit = {method: 'GET', mode: 'cors'};

    const fetchData = async (url) => {
        try 
        {
            const response = await fetch(url, myInit);
            if(!response.ok)
            {
                throw new Error(`Error fetching data:' ${response.status}`);
            }    
            const data = await response.json();
            setCustomers(data);
        } catch (error)
        {
            alert(error);
        }
    }
    fetchData(baseURL);
}

// export function get(id)
// {
//     let result = null;
//     for(let item in items){
//         if(item.id === id)
//         {
//             result = item;
//         }
//     }
//     return result;
// }

export function deleteCustomer(id)
{

    items = items.filter(items => items.id !== id);
    return items;
}

// export async function post(name, email, password)
// {
//     let id = getNextID();
//     const myInit = {method: 'POST', mode: 'cors', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({id , name, email, password})};
//         try 
//         {
//             const response = await fetch(baseURL, myInit);
//             if(!response.ok)
//             {
//                 throw new Error(`Error fetching data:' ${response.status}`);
//             } 
//             const data = await response.json()
//             console.log("Sucess:", data);
//             return data;
//         }  
//         catch(error)
//         {
//             alert(error);
//         } 
// }




// export function postCustomer(name, email, password)
// {
//     let id = getNextID();
//     items.push({id, name, email, password});
//     return items;
// }

export function post(customer, postopCallback) 
{
    const myHeaders = new Headers({ "Content-Type": "application/json" });
    delete customer.id;
    const myInit = {
        method: 'POST',
        body: JSON.stringify(customer),
        headers: myHeaders,
        mode: 'cors'
    };
    const postItem = async (url) => {
        try {
            const response = await fetch(url, myInit);
            if (!response.ok) {
                throw new Error(`Error posting data: ${response.status}`);
            }
            await response.json();
            postopCallback();
        } catch (error) {
            alert(error);
        }
    }
    postItem(baseURL);
}


function getNextID()
{
    let maxid = 0;
    for(let item of items)
    {
        maxid = (item.id > maxid)? item.id : maxid;
    }
    return maxid + 1;
}

// export function putCustomer(id, name, email, password)
// {
//     //creating a new array for immutability
//     const newItems = [...items];


//     for(let i = 0; i < newItems.length; ++i)
//     {
//         if(newItems[i]['id'] === id)
//         {
//             newItems[i].name = name;
//             newItems[i].email = email;
//             newItems[i].password = password;
//             break;
//         }
//     }

//     items = newItems; // Update the original array
//     return items;
// }


export function put(customer, postopCallback) {
    const myHeaders = new Headers({ "Content-Type": "application/json" });
    const myInit = {
        method: 'PUT',
        body: JSON.stringify(customer),
        headers: myHeaders,
        mode: 'cors'
    };
    const putItem = async (url) => 
    {
        try {
            const response = await fetch(url, myInit);
            if (!response.ok) {
                throw new Error(`Error puting data: ${response.status}`);
            }
            await response.json();
            postopCallback();
        } catch (error) {
            alert(error);
        }
    }
    putItem(baseURL + "/" + customer.id);
}

export async function deleteById(id, postopCallback) 
{
    const myInit = { 
        method: 'DELETE', 
        mode: 'cors' };
    const deleteItem = async (url) => {
        try {
            const response = await fetch(url, myInit);
            if (!response.ok) {
                throw new Error(`Error deleting data: ${response.status}`);
            }
            await response.json();
            postopCallback();
        } catch (error) {
            alert(error);
        }
    }
    deleteItem(baseURL + "/" + id);
}

