import React from "react";
import { graphql } from "gatsby";
import { connect } from "react-redux";
import { nanoid } from 'nanoid'

import {
  saveTrackContent,
  saveTrackData,
  loadPageData,
  updatePage,
  pushContentItem,
  removeContentItem,
} from "../redux/actions";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import Layout from "../layouts/default.js";
import Section from "../components/common/Section";
import { EditableText, EditableParagraph, EditableImageUpload } from "react-easy-editables"
import { uploadImage } from "../firebase/operations"
import Collection from "../components/common/Collection";
import ParticipantLogo from "../components/common/ParticipantLogo"
import TrackRecord from "../components/common/TrackRecord"

import bgImg1 from "../assets/images/shapes/polygon-lg-white.svg"
import bgImg2 from "../assets/images/shapes/triangle-orange.svg"
import bgImg3 from "../assets/images/shapes/circuit-board-white.svg"
import bgImg4 from "../assets/images/shapes/polygon-red.svg"
import defaultImage1 from "../assets/images/head.png"
import defaultImage2 from "../assets/images/tour.png"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { DEFAULT_COMPONENT_CONTENT } from "../utils/constants"


const mapDispatchToProps = dispatch => {
  return {
    onUpdateTrackContent: (track, id, data) => {
      dispatch(saveTrackContent(track, id, data));
    },
    onUpdateTrackData: (track, id, data) => {
      dispatch(saveTrackData(track, id, data));
    },
    onLoadPageData: data => {
      dispatch(loadPageData(data));
    },
    onUpdatePageData: (page, id, data) => {
      dispatch(updatePage(page, id, data));
    },
    onPushContentItem: (location, data) => {
      dispatch(pushContentItem(location, data))
    },
    onRemoveContentItem: (location, itemId) => {
      dispatch(removeContentItem(location, itemId))
    },
  };
};

const mapStateToProps = state => {
  return {
    pageData: state.page.data,
    isEditingPage: state.adminTools.isEditingPage,
  };
};

class TrackTemplate extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props)
    const initialPageData = {
      ...this.props.data.tracks,
      content: JSON.parse(this.props.data.tracks.content)
    };

    this.props.onLoadPageData(initialPageData);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data.tracks.id !== this.props.data.tracks.id) {
      const initialPageData = {
        ...this.props.data.tracks,
        content: JSON.parse(this.props.data.tracks.content)
      };

      this.props.onLoadPageData(initialPageData);
    }
  }

  onSave = fieldId => content => {
    const { id } = this.props.data.tracks;
    this.props.onUpdateTrackContent(id, fieldId, content);
  };

  onSaveTitle = content => {
    const { id } = this.props.data.tracks;
    this.props.onUpdateTrackData(id, "title", content.text)
  }

  addTrackLead = () => {
    const newArr = this.props.pageData.content["track-leads"] ? [...this.props.pageData.content["track-leads"]] : [];
    const { id } = this.props.data.tracks;

    const newItem = {
      "track-lead-image" : {
        "imageSrc" : "/icon.png",
      },
      "track-lead-name": {
        "text": "Name"
      },
      "track-lead-quote": {
        "text": "Quote"
      }
    }

    newArr.push(newItem)
    this.props.onUpdateTrackContent(id, "track-leads", newArr)
  };

  editTrackLead = (index, field) => content => {
    const arr = [...this.props.pageData.content["track-leads"]];
    const { id } = this.props.data.tracks;

    const updated = {
      ...arr[index],
      [field]: content
    };

    arr[index] = updated;

    this.props.onUpdateTrackContent(id, "track-leads", arr);
  };

  deleteTrackLead = i => () => {
    const arr = [...this.props.pageData.content["track-leads"]];
    const { id } = this.props.data.tracks;

    arr.splice(i, 1)
    this.props.onUpdateTrackContent(id, "track-leads", arr)
  };

  onSaveQuestion = (introSlides, key, fieldId) => content => {
    const slides = {
      ...introSlides,
      [key]: {
        ...introSlides[key],
        [fieldId]: content
      }
    }

    const { id } = this.props.data.tracks;
    this.props.onUpdateTrackContent(id, 'intro-slides', slides);
  }

  addParticipantLogo = (newItem) => {
    const { id } = this.props.data.tracks;
    const newLogos = this.props.pageData.content["participant-logos"] ? {...this.props.pageData.content["participant-logos"]} : {};
    const itemId = nanoid(10);
    newLogos[itemId] = newItem
    this.props.onUpdateTrackContent(id, "participant-logos", newLogos)
  };

  deleteParticipantLogo = itemId => {
    const { id } = this.props.data.tracks;
    const newLogos = {...this.props.pageData.content["participant-logos"]};

    delete newLogos[itemId];

    this.props.onUpdateTrackContent(id, "participant-logos", newLogos)
  };

  render() {
    const title = this.props.pageData ? this.props.pageData.title : "";
    const content = this.props.pageData ? this.props.pageData.content : JSON.parse(this.props.data.tracks.content);
    const introSlides = content["intro-slides"] || [];
    const trackLeads = content["track-leads"] || [];

    let metadata = {
      title: title,
      url: this.props.location.href
    }

    if (content["topic"]) {
      metadata.description = content["topic"]["text"]
    }

    return (
      <Layout className="track-page" location={this.props.location} metadata={metadata}>
        <Section id="header" className="bg-light" data-aos="fade-in">
          <div className="content">
            <Grid container spacing={6}>
              <Grid item xs={12} md={7}>
                <h1 className="mb-40">
                  <EditableText content={{ text: title }} onSave={this.onSaveTitle} />
                </h1>
                <div className="subtitle">
                  <EditableText content={ content["topic"] } onSave={this.onSave('topic')} />
                </div>
              </Grid>

              <Grid item xs={12} md={5}>
                <div className="track-image">
                  <EditableImageUpload
                    classes="track-icon"
                    content={ content["icon-small"] }
                    onSave={this.onSave('icon-small')}
                    uploadImage={uploadImage}
                    helpText="This is the main icon for this track (solid background)"
                  />
                  <div className="background">
                    <img src={bgImg2} alt="" className="rotateme-reverse" />
                    <img src={bgImg1} alt="" className="rotateme" />
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </Section>

        <Section id="questions" className="">
          {
            introSlides["how"] &&
            <div className="question pb-40 pt-40">
              <Grid container justify="space-around" alignItems="stretch">

                <Grid item xs={12} md={5}>
                  <h3>
                    <EditableText content={introSlides["how"]["question"]} onSave={this.onSaveQuestion(introSlides, "how", "question")} />
                  </h3>
                  <div className="underline">
                    <div className={`shape red`} />
                  </div>
                  <div className="indented">
                    <EditableParagraph content={introSlides["how"]["answer"]} onSave={this.onSaveQuestion(introSlides, "how", "answer")} />
                  </div>
                </Grid>

                <Grid item xs={12} md={7} style={{ position: "relative", minHeight: "260px" }}>
                  <EditableImageUpload
                      classes="track-icon"
                      content={ content["track-img-how"] ? content["track-img-how"] : { imageSrc: defaultImage1, title: "Image placeholder" } }
                      onSave={this.onSave('track-img-how')}
                      uploadImage={uploadImage}
                      styles={{
                        image: {
                          objectFit: "contain",
                          height: "100%",
                          width: "100%",
                          maxHeight: "450px"
                        }
                      }}
                    />
                </Grid>

              </Grid>
            </div>
          }

          {
            introSlides["what"] &&
            <div className="question pb-40 pt-40">
              <Grid container justify="center">
                <Grid item xs={12} md={7}>
                  <h3>
                    <EditableText content={introSlides["what"]["question"]} onSave={this.onSaveQuestion(introSlides, "what", "question")} />
                  </h3>
                  <div className="underline">
                    <div className={`shape orange`} />
                  </div>
                  <div className="indented">
                    <EditableParagraph content={introSlides["what"]["answer"]} onSave={this.onSaveQuestion(introSlides, "what", "answer")} />
                  </div>
                </Grid>
              </Grid>
            </div>
          }

          {
            introSlides["why"] &&
            <div className="question pb-40 pt-40">
              <Grid container justify="space-between" alignItems="stretch">
                <Grid item xs={12} md={7} style={{ position: "relative", minHeight: "260px" }}>

                    <EditableImageUpload
                      classes="track-icon"
                      content={ content["track-img-why"] ? content["track-img-why"] : { imageSrc: defaultImage2, title: "Image placeholder" } }
                      onSave={this.onSave('track-img-why')}
                      uploadImage={uploadImage}
                      styles={{
                        container: {
                          height: "100%",
                          width: "100%",
                          display: "flex",
                          justify: "center",
                          alignItems: "center",
                          position: "absolute",
                          top: 0,
                          right: 0,
                          bottom: 0,
                          left: 0,
                          paddingLeft: "20px",
                          paddingRight: "20px",
                        },
                        image: {
                          objectFit: "contain",
                          height: "100%",
                          width: "100%",
                        }
                      }}
                    />

                </Grid>

                <Grid item xs={12} md={5}>
                  <h3>
                    <EditableText content={introSlides["why"]["question"]} onSave={this.onSaveQuestion(introSlides, "why", "question")} />
                  </h3>
                  <div className="underline">
                    <div className={`shape blue`} />
                  </div>
                  <div className="indented">
                    <EditableParagraph content={introSlides["why"]["answer"]} onSave={this.onSaveQuestion(introSlides, "why", "answer")} />
                  </div>
                </Grid>
              </Grid>
            </div>
          }
          </Section>

          <Section id="journey" className="bg-light">
            <Grid container>
              <Grid item xs={12} md={7} >
                <h2 className="mb-40"><EditableText content={content["journey-title"]} onSave={this.onSave('journey-title')} /></h2>
                <div className="indented">
                  <EditableParagraph content={content["journey-description"]} onSave={this.onSave('journey-description')} />
                </div>
              </Grid>
            </Grid>

            <Grid container justify="space-around">
              <Grid item xs={12} sm={4} md={2} className="journey-container mt-40" data-aos="fade-in" data-aos-delay="50">
                <TrackRecord className="mt-100" content={content["journey-step-1"]} onSave={this.onSave('journey-step-1')} shape="arrow" />
              </Grid>
              <Grid item xs={12} sm={4} md={2} className="journey-container mt-80" data-aos="fade-in" data-aos-delay="250">
                <TrackRecord className="mt-80" content={content["journey-step-2"]} onSave={this.onSave('journey-step-2')} shape="arrow" />
              </Grid>
              <Grid item xs={12} sm={4} md={2} className="journey-container mt-60" data-aos="fade-in" data-aos-delay="450">
                <TrackRecord className="mt-60" content={content["journey-step-3"]} onSave={this.onSave('journey-step-3')} shape="arrow" />
              </Grid>
              <Grid item xs={12} sm={4} md={2} className="journey-container" data-aos="fade-in" data-aos-delay="650">
                <TrackRecord className="mt-40" content={content["journey-step-4"]} onSave={this.onSave('journey-step-4')} shape="arrow" />
              </Grid>
              <Grid item xs={12} sm={4} md={2} className="journey-container" data-aos="fade-in" data-aos-delay="850">
                <TrackRecord className="mt-20" content={content["journey-step-5"]} onSave={this.onSave('journey-step-5')} shape="arrow" />
              </Grid>
              <Grid item xs={12} sm={4} md={2} className="journey-container" data-aos="fade-in" data-aos-delay="1000">
                <TrackRecord content={content["journey-step-6"]} onSave={this.onSave('journey-step-6')} shape="arrow" />
              </Grid>
            </Grid>

          </Section>

          <Section id="questions-continued" className="">
          {
            introSlides["next"] &&
            <div className="question pb-40 pt-40">
              <Grid container justify="space-around" alignItems="stretch">

                <Grid item xs={12} md={5}>
                  <h3>
                    <EditableText content={introSlides["next"]["question"]} onSave={this.onSaveQuestion(introSlides, "next", "question")} />
                  </h3>
                  <div className="underline">
                    <div className={`shape red`} />
                  </div>
                  <div className="indented">
                    <EditableParagraph content={introSlides["next"]["answer"]} onSave={this.onSaveQuestion(introSlides, "next", "answer")} />
                  </div>
                </Grid>

                <Grid item xs={12} md={7} style={{ position: "relative", minHeight: "260px" }}>
                  <EditableImageUpload
                      classes="track-icon"
                      content={ content["track-img-next"] ? content["track-img-next"] : { imageSrc: defaultImage1, title: "Image placeholder" } }
                      onSave={this.onSave('track-img-next')}
                      uploadImage={uploadImage}
                      styles={{
                        image: {
                          objectFit: "contain",
                          height: "100%",
                          width: "100%",
                          maxHeight: "450px"
                        }
                      }}
                    />
                </Grid>

              </Grid>
            </div>
          }

          {
            introSlides["who"] &&
            <div className="question pb-40 pt-40">
              <Grid container justify="center">
                <Grid item xs={12} md={7}>
                  <h3>
                    <EditableText content={introSlides["who"]["question"]} onSave={this.onSaveQuestion(introSlides, "who", "question")} />
                  </h3>
                  <div className="underline">
                    <div className={`shape orange`} />
                  </div>
                  <div className="indented">
                    <EditableParagraph content={introSlides["who"]["answer"]} onSave={this.onSaveQuestion(introSlides, "who", "answer")} />
                  </div>
                </Grid>
              </Grid>
            </div>
          }

          {
            introSlides["participants"] &&
            <div className="question pb-40 pt-40">
              <Grid container justify="flex-end">

                <Grid item xs={12} md={5}>
                  <h3>
                    <EditableText content={introSlides["participants"]["question"]} onSave={this.onSaveQuestion(introSlides, "participants", "question")} />
                  </h3>
                  <div className="underline">
                    <div className={`shape gray`} />
                  </div>
                  <Collection
                    items={content["participant-logos"]}
                    Component={ParticipantLogo}
                    onSave={this.onSave('participant-logos')}
                    onAddItem={this.addParticipantLogo}
                    onDeleteItem={this.deleteParticipantLogo}
                    isEditingPage={this.props.isEditingPage}
                    defaultContent={DEFAULT_COMPONENT_CONTENT['partner-logos']}
                    classes="partner-logos indented"
                  />
                </Grid>

              </Grid>
            </div>
          }

        </Section>

      </Layout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackTemplate);


export const query = graphql`
  query($id: String!) {
    tracks(id: { eq: $id }) {
      id
      content
      title
      slug
      template
      page_type
      year
      navigation {
        order
        displayTitle
      }
    }
  }
`;

