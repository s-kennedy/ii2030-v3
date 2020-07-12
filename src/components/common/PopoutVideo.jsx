import React, { useState } from "react"
import PropTypes from "prop-types";
import Dialog from '@material-ui/core/Dialog';
import PlayIcon from "@material-ui/icons/PlayCircleOutline"
import thumbnail from "../../assets/images/video-thumbnail.jpg"
import circuitBoard from "../../assets/images/shapes/circuit-board-blue.svg"
import defaultBgImg from "../../assets/images/shapes/triangle-blue.svg"

import {Editable, EmbeddedIframeEditor} from "react-easy-editables";

const VideoModal = ({ open, onClose, ...props}) => {

  const { src, height, width, title } = props.content;
  const ratio = (height / width) * 100

  const styles = {
    iframeContainer: {
      position: "relative",
      paddingBottom: `${ratio}%`,
      height: 0,
      overflow: "hidden",
      width: "100%",
      maxWidth: "100%",
    },
    iframe: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
    }
  }

  return(
    <Dialog maxWidth="lg" open={open} onClose={onClose}>
      <div className="popout-video">
        <div className="embedded-iframe" style={styles.iframeContainer}>
          <iframe
            src={ src }
            style={styles.iframe}
            frameBorder="0"
            allowFullScreen={ true }
            height={ height }
            width={ width }
            title={ title }
          />
        </div>
      </div>
    </Dialog>
  )
}

const PopoutVideo = ({ className, ...props }) => {
  const [open, setOpen] = useState(false);

  const handleSave = newContent => {
    props.onSave(newContent);
  };

  const { src } = props.content;
  const bgImg = props.bgImg || defaultBgImg;

  return (
    <Editable
      Editor={EmbeddedIframeEditor}
      handleSave={handleSave}
      content={{ src: src }}
      {...props}
    >
      <div className="video-collage">
        <img src={bgImg} alt="" className="bg-img rotateme-reverse" />
        <img src={circuitBoard} alt="" className="bg-img p-absolute grow" />
        <button onClick={() => setOpen(true)} className="popout-video-btn">
          <PlayIcon />
          <img src={props.thumbnail} alt="video thumbnail" />
        </button>
      </div>
      <VideoModal open={open} onClose={() => setOpen(false)} {...props} />
    </Editable>
  );
};

PopoutVideo.propTypes = {
  content: PropTypes.shape({
    src: PropTypes.string,
    height: PropTypes.string,
    width: PropTypes.string,
    allowFullScreen: PropTypes.bool,
    title: PropTypes.string
  }).isRequired,
  onSave: PropTypes.func.isRequired,
}

PopoutVideo.defaultProps = {
  content: {
    src: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:6518432679573090304?compact=1',
    height: '300',
    width: '560',
    title: 'Video',
  },
  onSave: newContent => console.log('Implement a function to save changes!', newContent),
  thumbnail: thumbnail,
}

export default PopoutVideo;
