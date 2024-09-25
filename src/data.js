let items = [
    {"id":1,"name":"Dan Cockerill","email":"bcockerill0@reddit.com","password":"gI9$+#'oEg>#u"},
    {"id":2,"name":"Amalea Anan","email":"aanan1@cdbaby.com","password":"rL4@RGYr{8qjX"}
]



export function getAll(){
    return items;
}

export function get(id) {
    let result = null;
    for( let item of items){
        if(item.id === id){
            result = item;
        }
    }
  return result;
}


function getArrayIndexForId(id){
  for( let i = 0; i < items.length; i++){
    if(items[i].id === id){
      return i;
    }
  }
  return -1;  
}


function getNextId(){
  let maxid = 0;
  for( let item of items){
    maxid = (item.id > maxid)?item.id:maxid;
  }  
  return maxid + 1;
}
