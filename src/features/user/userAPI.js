// API for fatch user order to show in My orders section
export function fetchLoggedInUserOrders(userId) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8080/orders/?user.id='+userId)
    const data = await response.json()
    resolve({data})
  });
}

// API for fatch User Detailed info
export function fetchLoggedInUser(userId) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8080/users/'+userId)
    const data = await response.json()
    resolve({data})
  });
}

// API for add/update user address
export function updateUser(update) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/users/'+update.id, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: { 'content-type': 'application/json' }
    })
    const data = await response.json();
    resolve({ data })
  });
}