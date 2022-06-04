import React, { useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBCardGroup,
  MDBRow,
  MDBCol,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner.js";
import { getToursByTag } from "../redux/features/tourSlice";
import { excerpt } from "../utilities/index.js";

const TagTours = () => {
  const { tagTours, loading } = useSelector((state) => ({ ...state.tours }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tag } = useParams();

 

  useEffect(() => {
    if (tag) {
      dispatch(getToursByTag(tag));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tag]);

  if (loading) {
    return <Spinner />;
  }
  return (
    <div
      style={{
        margin: "auto",
        padding: "120px",
        maxWidth: "900px",
        alignContent: "center",
      }}
    >
      <h3 className="text-center">Tours with tag : #{tag}</h3>
      <hr style={{maxWidth:'570px'}}/>
      {tagTours && tagTours.map((tour)=>(
          <MDBCardGroup key={tour._id}>
              <MDBCard style={{maxWidth:'600px'}} className='mt-2'>
                <MDBRow className="g-0">
                    <MDBCol md='4'>
                        <MDBCardImage
                        className="rounded"
                        src={tour.image}
                        alt={tour.title}
                        fluid
                        />
                    </MDBCol>
                    <MDBCol md='8'>
                        <MDBCardBody>
                            <MDBCardTitle className="text-start">{tour.title}</MDBCardTitle>
                            <MDBCardText className="text-start">{excerpt(tour.description,40)}</MDBCardText>
                            <div style={{float:'left',marginTop:'-10px'}}>
                                <MDBBtn size="sm" rounded color="info" onClick={()=>navigate(`/tour/${tour._id}`)}>
                                    Read more
                                </MDBBtn>
                            </div>
                        </MDBCardBody>
                    </MDBCol>
                </MDBRow>
              </MDBCard>
          </MDBCardGroup>
      ))}
    </div>
  );
};

export default TagTours;
