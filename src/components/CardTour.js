import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardGroup,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBIcon,
  MDBTooltip,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { likeTour } from "../redux/features/tourSlice";

const CardTour = ({ image, description, title, tags, _id, name,likes }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state.auth }));
  const userId = user?.result?._id;
  const Likes = () => {
    if (likes && likes.length > 0) {
      return likes.find((likeId) => likeId === userId) ? (
        <>
          <MDBIcon icon="heart" size="2x" />
          {likes.length}
        </>
      ) : (
        <>
            <MDBIcon far icon="heart" size="2x" />
            {likes.length} 
        </>
      );
    }
    return (
      <>
        <MDBIcon far icon="heart" size="2x" />
      </>
    );
  };

  const handleLike = () => {
    dispatch(likeTour(_id));
  };

  const excerpt = (str) => {
    if (str.length > 45) {
      str = str.substring(0, 45) + "...";
    }
    return str;
  };

  return (
    <MDBCardGroup>
      <MDBCard className="h-100 mt-2 d-sm-flex" style={{ maxWidth: "20rem" }}>
        <MDBCardImage
          src={image}
          alt={title}
          position="top"
          style={{ maxWidth: "100%", height: "180px" }}
        />
        <div className="top-left">{name}</div>
        <span className="text-start tag-card">
          {tags.map((tag) => (
            <Link to={`/tours/tag/${tag}`} key={tag}>
              #{tag}
            </Link>
          ))}
          <MDBBtn
            style={{ float: "right", marginRight: "10px" }}
            tag="a"
            color="none"
            onClick={!user?.result ? null : handleLike}
          >
            {!user?.result ? (
              <MDBTooltip tag='p' title="Please login to like this tour">
                <Likes /> 
              </MDBTooltip>
            ) : (
              <Likes /> 
            )}
          </MDBBtn>
        </span>

        <MDBCardBody>
          <MDBCardTitle className="text-start">{title}</MDBCardTitle>
          <MDBCardText className="text-start">
            {excerpt(description)}
          </MDBCardText>
          <Link to={`/tour/${_id}`}>Read more</Link>
        </MDBCardBody>
      </MDBCard>
    </MDBCardGroup>
  );
};

export default CardTour;
