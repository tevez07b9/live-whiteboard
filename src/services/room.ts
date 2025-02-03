const API_URL = import.meta.env.VITE_API_URL

export const createRoom = async () => {
  try {
    const response = await fetch(`${API_URL}/create-room`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to create room')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error creating room:', error)
    throw error
  }
}
