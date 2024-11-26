// API for add a product in the cart 
export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/cart', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: { 'content-type': 'application/json' }
    })
    const data = await response.json();
    resolve({ data })
  });
}

// fetch cart item for user that is already in the cart previously 
export function fetchItemsByUserId(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/cart?user='+userId)
    const data = await response.json();
    resolve({ data })
  });
}

// API for delete item from cart
export function deleteItemFromCart(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/cart/'+itemId, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' }
    })
    const data = await response.json();
    resolve({ data:{id:itemId} })
  });
}

// API for update product quantity in cart 
export function updateCart(updatedItem) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/cart/'+updatedItem.id, {
      method: 'PATCH',
      body: JSON.stringify(updatedItem),
      headers: { 'content-type': 'application/json' }
    })
    const data = await response.json();
    resolve({ data })
  });
}
