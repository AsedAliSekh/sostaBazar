// API for fatch user order to show in My orders section
export function fetchLoggedInUserOrders(userId) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8080/orders/?user.id='+userId)
    const data = await response.json()
    resolve({data})
  });
}
