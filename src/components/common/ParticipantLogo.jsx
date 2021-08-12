import React from "react";

import {
  ImageUploadEditor,
  Editable
} from 'react-easy-editables';

import { uploadImage } from "../../firebase/operations"

const PartnerLogoEditor = ({ content, onContentChange }) => {
  const handleEditorChange = field => item => {
    onContentChange({
      ...content,
      [field]: {
        ...item
      }
    });
  }

  return(
    <div className="partner-logo-editor" style={{ minWidth: '300px' }}>
      <ImageUploadEditor
        content={content["partner-image"]}
        onContentChange={handleEditorChange("partner-image")}
        uploadImage={uploadImage}
      />
    </div>
  )
}

const PartnerLogo = props => {

  const content = props.content || {};

  const handleSave = newContent => {
    props.onSave(newContent)
  }
  return (
    <div className="logo-container">
      <Editable
        Editor={PartnerLogoEditor}
        handleSave={handleSave}
        content={content}
        {...props}
      >
        <div className="logo">
          <img src={content["partner-image"]["imageSrc"]} alt={content["partner-image"]["title"]} />
        </div>
      </Editable>
    </div>
  );
};

export default PartnerLogo;

