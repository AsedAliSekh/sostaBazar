// Create or Place a Order API
export function createOrder(order) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch('http://localhost:8080/orders',
      {
        method: 'POST',
        body: JSON.stringify(order),
        headers: { 'content-type': 'application/json' }
      }
    )
    const data = await response.json()
    resolve({ data })
  });
}


// Fatch all orders API MY 
export function fetchAllOrders() {
  return new Promise(async (resolve) => {

    // TODO - not hard core the API path
    const response = await fetch('http://localhost:8080/orders')
    const data = await response.json()
    resolve({ data })
  });
}


// Update Order API 
export function updateOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/orders/'+order.id,
      {
        method: 'PATCH',
        body: JSON.stringify(order),
        headers: { 'content-type': 'application/json' }
      }
    )
    const data = await response.json()
    resolve({ data })
  });
}