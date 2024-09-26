let items = 
[
    {"id":1,"name":"Dan Cockerill","email":"bcockerill0@reddit.com","password":"gI9$+#'oEg>#u"},
    {"id":2,"name":"Amalea Anan","email":"aanan1@cdbaby.com","password":"rL4@RGYr{8qjX"}
]

export function getAll(){
    return items;
}

export function get(id)
{
    let result = null;
    for(let item in items){
        if(item.id === id)
        {
            result = item;
        }
    }
    return result;
}


export function deleteCustomer(id)
{
    items = items.filter(items => items.id !== id);
    return items;
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