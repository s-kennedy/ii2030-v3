import React from "react";

import {
  PlainTextEditor,
  RichTextEditor,
  ImageUploadEditor,
  Editable
} from 'react-easy-editables';

import triangle from "../../assets/images/shapes/triangle-orange.svg"
import polygon from "../../assets/images/shapes/polygon-red.svg"
import arrow from "../../assets/images/shapes/arrow-white.svg"

import { uploadImage } from "../../firebase/operations"

const TrackRecordEditor = ({ content, onContentChange }) => {
  const handleEditorChange = field => item => {
    onContentChange({
      ...content,
      [field]: {
        ...item
      }
    });
  }

  return(
    <div className={`testimonial`}>
      <div className="image-container">
        <div className="img-bg" />
        <ImageUploadEditor
          content={content["testimonial-item-image"]}
          onContentChange={handleEditorChange("testimonial-item-image")}
          uploadImage={uploadImage}
        />
      </div>

      <div className="text">
        <h4 className="mb-20">
          <PlainTextEditor
            content={content["testimonial-item-title"]}
            onContentChange={handleEditorChange("testimonial-item-title")}
          />
        </h4>
        <div className="description">
          <RichTextEditor
            content={content["testimonial-item-description"]}
            onContentChange={handleEditorChange("testimonial-item-description")}
          />
        </div>
      </div>
    </div>
  )
}

const TrackRecord = props => {

  const content = props.content || {};

  const handleSave = newContent => {
    props.onSave(newContent)
  }

  const bgImg = () => {
    switch(props.shape){
      case 'triangle':
        return triangle;
      case 'arrow':
        return arrow;
      default:
        return polygon;
    }
  }

  return (
    <Editable
      Editor={TrackRecordEditor}
      handleSave={handleSave}
      content={content}
      {...props}
    >
      <div className={`testimonial ${props.className ? props.className : ""}`}>
        <div className="image-container">
          <div className="img-bg">
            <img src={bgImg()} alt="" />
          </div>
          {
            content["testimonial-item-image"] &&
            <img
              className="image"
              src={content["testimonial-item-image"]["imageSrc"]}
              alt={content["testimonial-item-image"]["caption"]}
            />
          }
        </div>

        <div className="text">
          {
            content["testimonial-item-title"] &&
            <h4 className="mb-20">
              { content["testimonial-item-title"]["text"] }
            </h4>
          }
          {
            content["testimonial-item-description"] &&
           <div className="description" dangerouslySetInnerHTML={{__html: content["testimonial-item-description"]["text"]}} />
          }
        </div>
      </div>
    </Editable>
  );
};

TrackRecord.defaultProps = {
  content: {
    "testimonial-item-image": { "imageSrc": "", "caption": "" },
    "testimonial-item-title": { "text": "Title" },
    "testimonial-item-description": { "text": "Description" },
  },
  classes: "",
  onSave: () => { console.log('implement a function to save changes') },
  shape: "triangle",
}

export default TrackRecord;