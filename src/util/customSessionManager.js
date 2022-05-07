const sessionTTL = 36000000

const setWithExpiry = (key, value)  => {
    const now = new Date();

    const item = {
        value: value,
        expiry: now.getTime() + sessionTTL
    }
    localStorage.setItem(key, JSON.stringify(item))
    
  }

  const getWithExpiry = (key)  => {
    const itemStr = localStorage.getItem(key)
    // if the item doesn't exist, return null
    if (!itemStr) {
        return null
    }
    const item = JSON.parse(itemStr)
    const now = new Date()
    // compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry) {
        // If the item is expired, delete the item from storage
        // and return null
        localStorage.removeItem(key)
        return null
    }
    return item.value
    
  }

  const removeKey = (key)  => {
    localStorage.removeItem(key);
  }
  
  export {
    setWithExpiry,
    getWithExpiry,
    removeKey
  };