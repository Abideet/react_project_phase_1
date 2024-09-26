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


export function deleteCustomer(id){

    let newItems = items.filter(items => items.id !== id);
    console.log(newItems);
    return newItems;
}