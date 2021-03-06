import React, { useEffect } from "react";
import { Link } from "gatsby"
import ArrowIcon from "@material-ui/icons/ArrowRightAlt"
import AOS from 'aos';

import {
  PlainTextEditor,
  RichTextEditor,
  LinkEditor,
  ImageUploadEditor,
  Editable
} from 'react-easy-editables';


import { uploadImage } from "../../firebase/operations"

const TrackItemEditor = ({ content, onContentChange }) => {
  const handleEditorChange = field => item => {
    onContentChange({
      ...content,
      [field]: {
        ...item
      }
    });
  }

  return(
    <div className={`track-item mb-40`}>
      <div className="image-container">
        <div className="img-bg" />
        <ImageUploadEditor
          content={content["track-item-image"]}
          onContentChange={handleEditorChange("track-item-image")}
          uploadImage={uploadImage}
        />
      </div>

      <div className="text">
        <h4 className="mb-20">
          <PlainTextEditor
            content={content["track-item-title"]}
            onContentChange={handleEditorChange("track-item-title")}
          />
        </h4>
        <div className="description">
          <RichTextEditor
            content={content["track-item-description"]}
            onContentChange={handleEditorChange("track-item-description")}
          />
        </div>
        <div className="link">
          <LinkEditor
            content={content["track-item-link"]}
            onContentChange={handleEditorChange("track-item-link")}
          />
        </div>
      </div>
    </div>
  )
}

const TrackItem = props => {

  const content = props.content || {};

  const handleSave = newContent => {
    props.onSave(newContent)
  }

  useEffect(() => {
    AOS.init({ delay: 50, duration: 400 })
  });

  return (
    <Editable
      Editor={TrackItemEditor}
      handleSave={handleSave}
      content={content}
      {...props}
    >
      <div className={`mb-40 mt-40`} data-aos="fade-in">
        <div className="image-container">
          <div className="bg-circle"></div>
          <div className="icon">
          {
            content["track-item-image"] &&
            <img
              className="image"
              src={content["track-item-image"]["imageSrc"]}
              alt={content["track-item-image"]["caption"]}
            />
          }
          </div>
        </div>

        <div className="text mt-20">
          {
            content["track-item-title"] &&
            <h4 className="mb-20">
              { content["track-item-title"]["text"] }
            </h4>
          }
          {
            content["track-item-description"] &&
            <div className="description mb-20" dangerouslySetInnerHTML={ {__html: content["track-item-description"]["text"]} }>
            </div>
          }
          {
            content["track-item-link"] &&
            <Link className="link red" to={content["track-item-link"]["link"]}>{content["track-item-link"]["anchor"]}<ArrowIcon /></Link>
          }
        </div>
      </div>
    </Editable>
  );
};

TrackItem.defaultProps = {
  content: {
    "track-item-image": { "imageSrc": "", "caption": "" },
    "track-item-title": { "text": "Title" },
    "track-item-description": { "text": "Description" },
    "track-item-link": { "link": "/", "anchor": "Learn more" },
  },
  classes: "",
  onSave: () => { console.log('implement a function to save changes') },
}

export default TrackItem;
