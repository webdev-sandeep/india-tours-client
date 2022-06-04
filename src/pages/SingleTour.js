import React,{useEffect} from 'react'
import {MDBCard,MDBCardBody,MDBCardText,MDBCardImage,MDBIcon,MDBContainer, MDBBtn} from 'mdb-react-ui-kit'
import {useDispatch,useSelector} from 'react-redux'
import { getRelatedTours, getTour } from '../redux/features/tourSlice'
import {useParams, useNavigate} from 'react-router-dom'
import moment from 'moment'
import RelatedTours from '../components/RelatedTours'
import DisqusThread from '../components/DisqusThread'
const SingleTour = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {tour,relatedTours} = useSelector((state)=>({...state.tours}))
    const {id} = useParams()
    const tags = tour?.tags

    useEffect(()=>{
        tags && dispatch(getRelatedTours(tags))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[tags])
    useEffect(()=>{
        if(id){
            dispatch(getTour(id))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[id])
  return (
    <MDBContainer>
        <MDBCard className='mb-3 mt-2'>
            <MDBCardImage
            position='top'
            style={{width:'100%',maxHeight:'600px'}}
            src={tour.image}
            alt={tour.title}
            />
            <MDBCardBody>
                <MDBBtn tag='a' color='none' style={{float:'left', color:'#000'}} onClick={()=>navigate('/')}>
                    <MDBIcon
                    fas
                    icon='long-arrow-alt-left'
                    size='2x'
                    />
                </MDBBtn>
                <h3>{tour.title}</h3>
                <span>
                    <p className="text-start tourName">Created by : {tour.name} </p>
                </span>
                <div style={{float:'left'}}>
                    <span className="text-start">
                        {tour && tour.tags && tour.tags.map((tag,index)=>
                        <span key={index}>#${tag}&nbsp;</span>
                        )}
                    </span>
                </div>
                <br/>
                <MDBCardText className='text-start mt-2'>
                    <MDBIcon style={{float:'left', margin:'5px'}} far icon='calendar-alt' size='lg'/>
                    <small className="text-muted">{moment(tour.createdAt).fromNow()}</small>
                </MDBCardText>
                <MDBCardText className='lead mb-0 text-start'>{tour.description}</MDBCardText>
            </MDBCardBody>
            <RelatedTours relatedTours={relatedTours}  tourId={id}/>
        </MDBCard>
        <DisqusThread 
        id={id}
        title="title"
        path={`/tour/${id}`}
        />
    </MDBContainer>
  )
}

export default SingleTour