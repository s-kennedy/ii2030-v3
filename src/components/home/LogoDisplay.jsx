import React from "react";
import { EditableImageUpload, EditableText } from "react-easy-editables"
import Button from "@material-ui/core/Button"


const LogoDisplay = ({ entity, index, onSave, onDelete }) => {
  return(
    <div>
      <a href={!onDelete ? entity.link ? entity.link.text : "#" : null} target="_blank" rel="noopener noreferrer">
        <EditableImageUpload content={ entity.logo } onSave={onSave(index, "logo")} showCaption={false} editCaption={true} />
        { onDelete && <EditableText content={ entity.link } onSave={onSave(index, "link")} placeholder={"URL"} /> }
      </a>
      { onDelete && <Button onClick={onDelete(index)}>Delete</Button> }
    </div>
  )
}

export default LogoDisplay;
