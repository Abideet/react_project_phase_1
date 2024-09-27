let items = 
[
    {"id":1,"name":"Dan Cockerill","email":"bcockerill0@reddit.com","password":"gI9$+#'oEg>#u"},
    {"id":2,"name":"Amalea Anan","email":"aanan1@cdbaby.com","password":"rL4@RGYr{8qjX"}
]



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

export function postCustomer(name, email, password)
{
    let id = getNextID();
    items.push({id, name, email, password});
    return items;
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

export function deleteCustomer(id)
{

    items = items.filter(items => items.id !== id);
    return items;
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

