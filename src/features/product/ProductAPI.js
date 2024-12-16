

export function fetchAllProducts() {
  return new Promise(async (resolve) => {

    // TODO - not hard core the API path
    const response = await fetch('http://localhost:8080/products')
    const data = await response.json()
    resolve({ data })
  });
}
// API for fetching a product by :id peram for showing product details page 
export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/products/'+id)
    const data = await response.json()
    resolve({ data })
  });
}



export function fetchProductsByFilters(filter, sort, pagination) {
  // filter = {"catagory": ["laptop", "smartphone"]}  
  // sort = {"_sort": "price", "_order": "asc"}
  // pagenation = {"_page": 1, "_per_page": 10} // Now ir is per page _per_page (_limit)
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

  for(let key in pagination){
    quaryString += `${key}=${pagination[key]}&`;
  }

  console.log(quaryString);
  return new Promise(async (resolve) => {
    // TODO - not hard core the API path
    const response = await fetch('http://localhost:8080/products?' + quaryString)
    const data = await response.json();
    const totalItems = data.items;  // find totalItems derectly from data, not from Headers 
    resolve({ data:{products:data, totalItems: totalItems} })
  });
}

// brands data fatch from backend API 
export function fetchBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/brands')
    const data = await response.json()
    resolve({ data })
  });
}

export function fetchCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/categories')
    const data = await response.json()
    resolve({ data })
  });
}

// Add, Create a product API
export function createProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/products/', {
      method: 'POST',
      body: JSON.stringify(product),
      headers: { 'content-type': 'application/json' }
    })
    const data = await response.json();
    resolve({ data })
  });
}

// API for update product by admin
export function updateProduct(update) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/products/'+update.id, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: { 'content-type': 'application/json' }
    })
    const data = await response.json();
    resolve({ data })
  });
}
