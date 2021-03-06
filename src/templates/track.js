import React from "react";
import { graphql } from "gatsby";
import { connect } from "react-redux";
import {
  saveTrackContent,
  saveTrackData,
  loadPageData,
} from "../redux/actions";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import Layout from "../layouts/default.js";
import Section from "../components/common/Section";
import PopoutVideo from "../components/common/PopoutVideo"
import TrackRecord from "../components/common/TrackRecord"
import { EditableText, EditableParagraph, EditableImageUpload } from "react-easy-editables"
import { uploadImage } from "../firebase/operations"

import bgImg1 from "../assets/images/shapes/polygon-lg-white.svg"
import bgImg2 from "../assets/images/shapes/triangle-orange.svg"
import bgImg3 from "../assets/images/shapes/circuit-board-white.svg"
import bgImg4 from "../assets/images/shapes/polygon-red.svg"
import bgImg5 from "../assets/images/shapes/triangle-blue.svg"
import defaultImage1 from "../assets/images/head.png"
import defaultImage2 from "../assets/images/tour.png"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



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

  render() {
    const title = this.props.pageData ? this.props.pageData.title : "";
    const content = this.props.pageData ? this.props.pageData.content : {};
    const introSlides = content["intro-slides"] || [];
    const trackLeads = content["track-leads"] || [];
    const year = this.props.pageData ? this.props.pageData.year : null;

    return (
      <Layout className="track-page" location={this.props.location}>
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

                {
                  (year === 2019) ?
                  <Grid item xs={12} md={5}>
                    <div className="video">
                      <PopoutVideo
                        content={content["track-video"]}
                        onSave={this.onSave('track-video')}
                        bgImg={bgImg5}
                      />
                    </div>
                  </Grid> :
                  <Grid item xs={12} md={7} style={{ position: "relative", minHeight: "260px" }}>
                    <EditableImageUpload
                        classes="track-icon"
                        content={ content["track-img-1"] ? content["track-img-1"] : { imageSrc: defaultImage1, title: "Image placeholder" } }
                        onSave={this.onSave('track-img-1')}
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
                }

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
            introSlides["who"] &&
            <div className="question pb-40 pt-40">
              <Grid container justify="space-between" alignItems="stretch">
                <Grid item xs={12} md={7} style={{ position: "relative", minHeight: "260px" }}>

                    <EditableImageUpload
                      classes="track-icon"
                      content={ content["track-img-2"] ? content["track-img-2"] : { imageSrc: defaultImage2, title: "Image placeholder" } }
                      onSave={this.onSave('track-img-2')}
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
                    <EditableText content={introSlides["who"]["question"]} onSave={this.onSaveQuestion(introSlides, "who", "question")} />
                  </h3>
                  <div className="underline">
                    <div className={`shape blue`} />
                  </div>
                  <div className="indented">
                    <EditableParagraph content={introSlides["who"]["answer"]} onSave={this.onSaveQuestion(introSlides, "who", "answer")} />
                  </div>
                </Grid>
              </Grid>
            </div>
          }

          {
            introSlides["why"] &&
            <div className="question pb-40 pt-40">
              <Grid container justify="center">

                <Grid item xs={12} md={7}>
                  <h3>
                    <EditableText content={introSlides["why"]["question"]} onSave={this.onSaveQuestion(introSlides, "why", "question")} />
                  </h3>
                  <div className="underline">
                    <div className={`shape gray`} />
                  </div>
                  <div className="indented">
                    <EditableParagraph content={introSlides["why"]["answer"]} onSave={this.onSaveQuestion(introSlides, "why", "answer")} />
                  </div>
                </Grid>

              </Grid>
            </div>
          }

        </Section>

        { (year === 2020) &&

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
              <Grid item xs={12} sm={6} md={3} className="journey-container mt-40" data-aos="fade-in" data-aos-delay="50">
                <TrackRecord className="mt-100" content={content["journey-step-1"]} onSave={this.onSave('journey-step-1')} shape="arrow" />
              </Grid>
              <Grid item xs={12} sm={6} md={3} className="journey-container mt-80" data-aos="fade-in" data-aos-delay="250">
                <TrackRecord className="mt-80" content={content["journey-step-2"]} onSave={this.onSave('journey-step-2')} shape="arrow" />
              </Grid>
              <Grid item xs={12} sm={6} md={3} className="journey-container mt-60" data-aos="fade-in" data-aos-delay="450">
                <TrackRecord className="mt-60" content={content["journey-step-3"]} onSave={this.onSave('journey-step-3')} shape="arrow" />
              </Grid>
              <Grid item xs={12} sm={6} md={3} className="journey-container" data-aos="fade-in" data-aos-delay="850">
                <TrackRecord content={content["journey-step-5"]} onSave={this.onSave('journey-step-5')} shape="arrow" />
              </Grid>
            </Grid>

          </Section>
        }


          { (trackLeads.length > 0 || this.props.isEditingPage) &&
            <Section id="track-lead" className="bg-light">
              <Grid container>
                <Grid item xs={12} md={5}>
                  <h2 className="mb-40">
                    <EditableText content={ content["track-lead-title"] } onSave={this.onSave('track-lead-title')} />
                  </h2>
                </Grid>
              </Grid>

              {
                trackLeads.map((lead, index) => {
                  return (
                    <div className="track-lead" key={`track-lead-${index}`}>
                      <Grid container spacing={6}>
                        <Grid item xs={12} md={5}>
                          <div className="image-container">
                            <img src={bgImg4} alt=""  />
                            <img src={bgImg3} alt=""  />
                            <EditableImageUpload
                              content={lead["track-lead-image"]}
                              className="pure-img"
                              onSave={this.editTrackLead(index, "track-lead-image")}
                              uploadImage={uploadImage}
                              styles={{ image: { borderRadius: "50%", height: "260px", width: "260px", left: "calc(50% - 130px)", top: "calc(50% - 130px)", boxShadow: "4px 4px 20px 0px rgba(64, 64, 64, 0.75)"  }}}
                            />
                          </div>
                        </Grid>
                        <Grid item xs={12} md={7} className="vert-center">
                          <div className="text">
                            <h3 className="mb-20">
                              <EditableText content={lead["track-lead-name"]} onSave={this.editTrackLead(index, "track-lead-name")} />
                            </h3>
                            <div className="quote">
                              <EditableParagraph content={lead["track-lead-quote"]} onSave={this.editTrackLead(index, "track-lead-quote")} />
                            </div>
                            {
                              this.props.isEditingPage &&
                              <div className="">
                                <Button onClick={this.deleteTrackLead(index)}>Delete implementation partner</Button>
                              </div>
                            }
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  )
                })
              }

              { this.props.isEditingPage && <Button onClick={this.addTrackLead}>Add implementation partner</Button> }
            </Section>
          }

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

