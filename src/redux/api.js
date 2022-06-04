import axios from "axios";

const devEnv = process.env.NODE_ENV !== "production"

const  {REACT_APP_DEV_API,REACT_APP_PROD_API} = process.env

const API = axios.create({
    baseURL:`${devEnv?REACT_APP_DEV_API:REACT_APP_PROD_API}`
})

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.authorization = `Bearer ${
            JSON.parse(localStorage.getItem('profile')).token
        }`
    }
    return req;
})

export const login = (formData) => {
    return API.post('/users/login',formData)
}

export const signup = (formData) => {
    return API.post('/users/signup',formData)
}

export const createTour = (formData) => {
    return API.post('/tour',formData)
}

export const getTours = (page) => {
    return API.get(`/tour?page=${page}`)
}

export const getTour = (id) => {
    return API.get(`/tour/${id}`)
}

export const getToursByUser = (id) => {
    return API.get(`/tour/userTours/${id}`)
}

export const deleteTourById = (id) => {
    return API.delete(`/tour/${id}`)
}

export const editTourById = (updatedTour,id) => {
    return API.patch(`/tour/${id}`,updatedTour)
}

export const getToursBySearch = (searchQuery) => {
    return API.get(`/tour/search?searchQuery=${searchQuery}`)
}

export const getToursByTag = (tag) => {
    return API.get(`/tour/tag/${tag}`)
}

export const getRelatedTours = (tags) => {
    return API.post(`/tour/relatedTours`,tags)
}

export const likeTour = (id) => {
    return API.patch(`/tour/like/${id}`)
}