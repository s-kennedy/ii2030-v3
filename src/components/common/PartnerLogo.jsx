import React from "react";

import {
  ImageUploadEditor,
  LinkEditor,
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
      <LinkEditor
        content={content["partner-link"]}
        onContentChange={handleEditorChange("partner-link")}
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
          <a href={content['partner-link'] ? content['partner-link']['link'] : "https://endeva.org/"} target="blank" rel="noreferrer noopener">
            <img src={content["partner-image"]["imageSrc"]} alt={content["partner-image"]["title"]} />
          </a>
        </div>
      </Editable>
    </div>
  );
};

export default PartnerLogo;

