// API for creating a new user / Singup
export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/users', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: { 'content-type': 'application/json' }
    })
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data })
  });
}


// API for Cheacking user in valid for login or not 
export function checkUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    const email = loginInfo.email;
    const password = loginInfo.password;

    const response = await fetch('http://localhost:8080/users?email=' +email);
    const data = await response.json();
    // check email and password for log in demo in frontend 
    if(data.length){
      if(password === data[0].password){
        resolve({data: data[0]})
      }else{
        reject({message: "Wrong Crediential"})
      }
    }else{
      reject({message: "Wrong Crediential"})
    }
  });
}

// API for add/update user address
export function updateUserAddress(update) {
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