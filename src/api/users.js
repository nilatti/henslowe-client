import API from './api'
import axios from 'axios';

async function createUser(user) {
  return (API.get(
    'registration', {
      user
    }
  ))
}

async function deleteUser(userId) {
  return API.delete(`users/${userId}`)
}

async function loginUser(user) {
  return (API.post(
    'sign_in', {
      user: user
    }
  ).catch(err => {return ({status: 401, message: 'Incorrect username or password'})}))
}

async function getUser(userId) {
  return API.request(`users/${userId}`)
}

async function getUsers() {
  return API.request(`users`)
}

async function updateServerUser(user) {
  return API.put(`users/${user.id}`, {
    id: user.id,
    user: user,
  })
}


export {
  createUser,
  deleteUser,
  loginUser,
  getUser,
  getUsers,
  updateServerUser
}
