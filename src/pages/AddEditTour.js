import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBValidation,
  MDBBtn,
  MDBInput,
  MDBValidationItem,
  MDBIcon,
} from "mdb-react-ui-kit";
import ChipInput from "material-ui-chip-input";
import { toast } from "react-toastify";
import { useNavigate,useParams } from "react-router-dom";
import { createTour, editTourById } from "../redux/features/tourSlice.js";
import { useDispatch, useSelector } from "react-redux";
import Dropzone from "react-dropzone";

const initialState = {
  title: "",
  description: "",
  tags: [],
};

const AddEditTour = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error,userTours } = useSelector((state) => ({ ...state.tours }));
  const { user } = useSelector((state) => ({ ...state.auth }));
  const [tourData, setTourData] = useState(initialState);
  const [fileName,setFileName] = useState(null);
  const [tagErrorMsg,setTagErrorMsg] = useState(null)
  const { title, description, tags } = tourData;
  const {id} = useParams()

  useEffect(()=>{
    if(id){
      const singleTour = userTours.find((tour)=>tour._id===id)
      setTourData({...singleTour})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[id])

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setTourData({ ...tourData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!tags.length){
      setTagErrorMsg('Please enter some tags!')
    }
    if(title && description && tags){
      const updatedTour = {
        ...tourData,
        name:user?.result?.name,
      }
      if(!id){
        await dispatch(createTour({updatedTour,navigate,toast}))
      }else{
        await dispatch(editTourById({id,updatedTour,navigate,toast}))
      }
      handleClear()
    }
  };

  const handleClear = () => {
    setTourData({
      title: "",
      description: "",
      tags: [],
    });
  };

  const handleAddTag = (tag) => {
    setTagErrorMsg(null)
    setTourData({ ...tourData, tags: [...tourData.tags, tag] });
  };

  const handleDeleteTag = (tag) => {
    setTourData({
      ...tourData,
      tags: [...tourData.tags.filter((item) => item !== tag)],
    });
  };
  return (
    <div className="tour container" style={{ maxWidth: "450px" }}>
      <MDBCard alignment="center">
        <h5>{id ? 'Edit Tour' : 'Add Tour'}</h5>
        <MDBCardBody>
          <MDBValidation className="row g-3" onSubmit={handleSubmit} noValidate>
            <MDBValidationItem
              feedback="Please provide title!"
              invalid="true"
              className="col-md-12"
            >
              <MDBInput
                label="Title"
                type="text"
                value={title}
                name="title"
                onChange={onInputChange}
                required
                className="form-control"
              />
            </MDBValidationItem>
            <MDBValidationItem
              feedback="Please provide description!"
              invalid="true"
              className="col-md-12"
            >
              <textarea
                placeholder="Description"
                type="textarea"
                rows="5"
                value={description}
                name="description"
                onChange={onInputChange}
                required
                className="form-control"
              />
            </MDBValidationItem>
            <div className="col-md-12"
            >
              <ChipInput
                name="tags"
                variant="outlined"
                placeholder="Enter Tags"
                fullWidth
                value={tags}
                onAdd={(tag) => handleAddTag(tag)}
                onDelete={(tag) => handleDeleteTag(tag)}
              />
              {tagErrorMsg && (
                <div className="tagErrorMsg">{tagErrorMsg}</div>
              )}
            </div>
            <div className="d-flex justify-content-start">
              <Dropzone
                onDrop={(acceptedFiles) => {
                  //convert file to base64
                  function getBase64(file) {
                    return new Promise((resolve, reject) => {
                      const reader = new FileReader();
                      reader.readAsDataURL(file);
                      reader.onload = () => resolve(reader.result);
                      reader.onerror = error => reject(error);
                    });
                  }
                  getBase64(acceptedFiles[0]).then(data=>setTourData({...tourData,image:data}))
                  setFileName(acceptedFiles[0].name)
                }}
                multiple={false}
              >
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <div className="file-container">
                        <MDBIcon fas icon="camera-retro" size="3x" style={{cursor:'pointer', marginLeft:'150px' }} />
                        {fileName&&<p>{fileName}</p>}
                      </div>
                    </div>
                  </section>
                )}
              </Dropzone>
            </div>
            <div className="col-12">
              <MDBBtn style={{ width: "100%" }}>{id?'Update':'Submit'}</MDBBtn>
              <MDBBtn
                style={{ width: "100%" }}
                className="mt-2"
                color="danger"
                onClick={handleClear}
              >
                Clear
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default AddEditTour;
