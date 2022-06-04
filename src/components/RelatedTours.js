import React from "react";
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBCardTitle,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { excerpt } from "../utilities";

const RelatedTours = ({ relatedTours, tourId }) => {
  return (
    <>
      {relatedTours && relatedTours.length > 0 && (
        <>
          {relatedTours.length > 1 && <h4>Related Tours</h4>}
          <MDBRow className="row-cols-1 row-cols-md-3 g-4">
            {relatedTours
              .filter((tour) => tour._id !== tourId)
              .splice(0, 3)
              .map((tour,index) => (
                <MDBCol key={index}>
                  <MDBCard style={{marginLeft:'20px', marginBottom:'20px'}}>
                    <Link to={`/tour/${tour._id}`}>
                      <MDBCardImage
                        src={tour.image}
                        alt={tour.title}
                        position="top"
                      />
                    </Link>
                    <span className="text-start tag-card">
                      {tour.tags.map((tag,index) => (
                        <Link to={`/tours/tag/${tag}`} key={index}>#{tag}</Link>
                      ))}
                    </span>
                    <MDBCardBody>
                      <MDBCardTitle className="text-start">
                        {tour.title}
                      </MDBCardTitle>
                      <MDBCardText className="text-start">
                        {excerpt(tour.description, 40)}
                      </MDBCardText>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              ))}
          </MDBRow>
        </>
      )}
    </>
  );
};

export default RelatedTours;
