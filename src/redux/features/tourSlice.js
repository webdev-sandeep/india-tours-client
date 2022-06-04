import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import * as api from '../api'

export const createTour = createAsyncThunk('tour/createTour', async({updatedTour,navigate,toast},{rejectWithValue})=>{
    try {
        const response = await api.createTour(updatedTour)
        toast.success("Tour created successfully!")
        navigate('/')
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
}) 

export const getTours = createAsyncThunk('tour/getTours', async(page,{rejectWithValue})=>{
    try {
        const response = await api.getTours(page);
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
}) 

export const getTour = createAsyncThunk('tour/getTour', async(id,{rejectWithValue})=>{
    try {
        const response = await api.getTour(id);
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
}) 

export const getToursByUser = createAsyncThunk('tour/getToursByUser', async(id,{rejectWithValue})=>{
    try {
        const response = await api.getToursByUser(id);
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
}) 

export const deleteTourById = createAsyncThunk('tour/deleteTourById', async({id,toast},{rejectWithValue})=>{
    try {
        const response = await api.deleteTourById(id);
        toast.success('Tour deleted successfully!')
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
}) 

export const editTourById = createAsyncThunk('tour/editTourById', async({id,updatedTour,navigate,toast},{rejectWithValue})=>{
    try {
        console.log('trigger',id)
        const response = await api.editTourById(updatedTour,id);
        toast.success('Tour updated successfully!')
        navigate('/')
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
}) 

export const getToursBySearch = createAsyncThunk('tour/getToursBySearch', async(searchQuery,{rejectWithValue})=>{
    try {
        const response = await api.getToursBySearch(searchQuery);
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
}) 

export const getToursByTag = createAsyncThunk('tour/getToursByTag', async(tag,{rejectWithValue})=>{
    try {
        const response = await api.getToursByTag(tag);
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
}) 

export const getRelatedTours = createAsyncThunk('tour/getRelatedTours', async(tags,{rejectWithValue})=>{
    try {
        const response = await api.getRelatedTours(tags);
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
}) 

export const likeTour = createAsyncThunk('tour/likeTour', async(id,{rejectWithValue})=>{
    try {
        const response = await api.likeTour(id);
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
}) 


const tourSlice = createSlice({
    name:'tour',
    initialState:{
        tour:{},
        tours:[],
        userTours:[],
        tagTours:[],
        relatedTours:[],
        error:'',
        loading:false,
        currentPage:1,
        numberOfPages:null
    },
    reducers:{
        setCurrentPage : (state,action) => {
            state.currentPage = action.payload
        }
    },
    extraReducers:{
        [createTour.pending] : (state,action) => {
            state.loading = true
        },
        [createTour.fulfilled] : (state,action) => {
            state.loading = false
            state.tours = [action.payload]
        },
        [createTour.rejected] : (state,action) => {
            state.loading = false
            state.error = action.payload.message
        },
        [getTours.pending] : (state,action) => {
            state.loading = true
        },
        [getTours.fulfilled] : (state,action) => {
            state.loading = false
            state.tours = action.payload.data
            state.numberOfPages = action.payload.numberOfPages
            state.currentPage = action.payload.currentPage
        },
        [getTours.rejected] : (state,action) => {
            state.loading = false
            state.error = action.payload.message
        },
        [getTour.pending] : (state,action) => {
            state.loading = true
        },
        [getTour.fulfilled] : (state,action) => {
            state.loading = false
            state.tour = action.payload
        },
        [getTour.rejected] : (state,action) => {
            state.loading = false
            state.error = action.payload.message
        },
        [getToursByUser.pending] : (state,action) => {
            state.loading = true
        },
        [getToursByUser.fulfilled] : (state,action) => {
            state.loading = false
            state.userTours = action.payload
        },
        [getToursByUser.rejected] : (state,action) => {
            state.loading = false
            state.error = action.payload.message
        },
        [deleteTourById.pending] : (state,action) => {
            state.loading = true
        },
        [deleteTourById.fulfilled] : (state,action) => {
            state.loading = false
            const id = action.meta.arg.id
            if(id){
                state.userTours = state.userTours.filter((tour)=>tour._id!==id)
                state.tours = state.tours.filter((tour)=>tour._id!==id)
            } 
        },
        [deleteTourById.rejected] : (state,action) => {
            state.loading = false
            state.error = action.payload.message
        },
        [editTourById.pending] : (state,action) => {
            state.loading = true
        },
        [editTourById.fulfilled] : (state,action) => {
            state.loading = false
            const id = action.meta.arg.id
            if(id){
                state.userTours = state.userTours.map((tour)=>tour._id===id ? action.payload : tour)
                state.tours = state.tours.filter((tour)=>tour._id===id ? action.payload : tour)
            } 
        },
        [editTourById.rejected] : (state,action) => {
            state.loading = false
            state.error = action.payload.message
        },
        [likeTour.pending] : (state,action) => {},
        [likeTour.fulfilled] : (state,action) => {
            const id = action.meta.arg
        
            if(id){
                state.tours = state.tours.map((tour)=>tour._id===id ? action.payload : tour)
            } 
        },
        [likeTour.rejected] : (state,action) => {
            state.error = action.payload.message
        },
        [getToursBySearch.pending] : (state,action) => {
            state.loading = true
        },
        [getToursBySearch.fulfilled] : (state,action) => {
            state.loading = false
            state.tours = action.payload
        },
        [getToursBySearch.rejected] : (state,action) => {
            state.loading = false
            state.error = action.payload.message
        },
        [getToursByTag.pending] : (state,action) => {
            state.loading = true
        },
        [getToursByTag.fulfilled] : (state,action) => {
            state.loading = false
            state.tagTours = action.payload
        },
        [getToursByTag.rejected] : (state,action) => {
            state.loading = false
            state.error = action.payload.message
        },
        [getRelatedTours.pending] : (state,action) => {
            state.loading = true
        },
        [getRelatedTours.fulfilled] : (state,action) => {
            state.loading = false
            state.relatedTours = action.payload
        },
        [getRelatedTours.rejected] : (state,action) => {
            state.loading = false
            state.error = action.payload.message
        },
    }
})

export const {setCurrentPage} = tourSlice.actions
export default tourSlice.reducer