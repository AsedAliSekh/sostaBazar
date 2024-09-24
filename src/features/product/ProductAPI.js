// A mock function to mimic making an async request for data
export function fetchAllProducts() {
  return new Promise(async (resolve) =>{

    // TODO - not hard core the API path
    const response = await fetch('http://localhost:8080/products')
    const data = await response.json()
    resolve({data})
  });
}

export function fetchProductsByFilters(filter) {
  // filter = {"catagory":"laptop"} | {"_sort": "price", "_order": "asc"}
  // TODO - on server it will support multi value filter
  let quaryString = '';
  for(let key in filter){
    quaryString += `${key}=${filter[key]}&`
  }
  console.log(quaryString);
  return new Promise(async (resolve) =>{
    // TODO - not hard core the API path
    const response = await fetch('http://localhost:8080/products?'+quaryString)
    const data = await response.json()
    resolve({data})
  });
}