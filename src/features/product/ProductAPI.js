// A mock function to mimic making an async request for data
export function fetchAllProducts() {
  return new Promise(async (resolve) => {

    // TODO - not hard core the API path
    const response = await fetch('http://localhost:8080/products')
    const data = await response.json()
    resolve({ data })
  });
}

export function fetchProductsByFilters(filter, sort) {
  // filter = {"catagory": ["laptop", "smartphone"]} | sort = {"_sort": "price", "_order": "asc"}
  // TODO - on server it will support multi value filter
  let quaryString = '';
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {
      const lastcategoryValue = categoryValues[categoryValues.length - 1];
      quaryString += `${key}=${lastcategoryValue}&`;
    }
  }
  for(let key in sort){
    quaryString += `${key}=${sort[key]}&`;
  }


  console.log(quaryString);
  return new Promise(async (resolve) => {
    // TODO - not hard core the API path
    const response = await fetch('http://localhost:8080/products?' + quaryString)
    const data = await response.json()
    resolve({ data })
  });
}