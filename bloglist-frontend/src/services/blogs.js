import axios from 'axios'
const baseUrl = '/api/blogs' // Adjust this based on your backend

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newBlog, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (id, updatedBlog) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog)
  return response.data
}

const remove = (id, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  return axios
    .delete(`${baseUrl}/${id}`, config)
    .then((response) => response.data)
}

export default { getAll, create, update, remove }
