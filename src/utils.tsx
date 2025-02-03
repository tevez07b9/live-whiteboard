export const setUser = (name: string) => {
  localStorage.setItem('username', name)
}

export const removeUser = () => {
  localStorage.setItem('username', '')
}

export const getUser = () => {
  return localStorage.getItem('username')
}

export const isValidURL = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url)
    return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:'
  } catch (error) {
    console.error(error)
    return false
  }
}
