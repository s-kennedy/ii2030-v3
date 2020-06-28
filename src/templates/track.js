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
import { EditableText, EditableParagraph, EditableImageUpload } from "react-easy-editables"
import { uploadImage } from "../firebase/operations"

import bgImg1 from "../assets/images/shapes/polygon-lg-white.svg"
import bgImg2 from "../assets/images/shapes/triangle-orange.svg"
import bgImg3 from "../assets/images/shapes/circuit-board-white.svg"
import bgImg4 from "../assets/images/shapes/polygon-red.svg"

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
  componentDidMount() {
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
    console.log(`Saving ${fieldId}`)
    console.log(content)
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

  onSavePassthrough = (key, fieldId) => content => {
    const slides = {
      ...this.props.slides,
      [key]: {
        ...this.props.slides[key],
        [fieldId]: content
      }
    }

    this.onSave(slides)
  }

  render() {
    const title = this.props.pageData ? this.props.pageData.title : "";
    const content = this.props.pageData ? this.props.pageData.content : {};
    const introSlides = content["intro-slides"] || [];
    const trackLeads = content["track-leads"] || [];
    const questions = Object.keys(introSlides)

    return (
      <Layout className="track-page">
        <Section id="header" className="bg-light" data-aos="fade-in">
          <div className="content">
            <Grid container spacing={7}>
              <Grid item xs={12} md={7}>
                <h1 className="mb-40"><EditableText content={ { text: title } } onSave={this.onSaveTitle} /></h1>
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
            questions.map(question => {
              const sectionContent = introSlides[question]
              return (
                <div className="question mb-20" key={question}>
                  <Grid container>
                    <Grid item xs={12} md={5}>
                      <div className="oversize">
                        <EditableText content={sectionContent["question"]} onSave={this.onSavePassthrough(question, "question")} />
                      </div>
                      <div className="underline" />
                    </Grid>
                  </Grid>
                  <Grid container justify="flex-end">
                    <Grid item xs={12} md={7}>
                      <EditableParagraph content={sectionContent["answer"]} onSave={this.onSavePassthrough(question, "answer")} />
                    </Grid>
                  </Grid>
                </div>
              )
            })
          }
        </Section>

          { (trackLeads.length > 0) &&
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
                              styles={{ image: { borderRadius: "50%", height: "260px", width: "260px", left: "calc(50% - 130px)", top: "calc(50% - 130px)"  }}}
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
                          </div>
                          {
                            this.props.isEditingPage &&
                            <div className="text vert-spacing horiz-spacing">
                              <Button onClick={this.deleteTrackLead(index)}>Delete implementation partner</Button>
                            </div>
                          }
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
      navigation {
        order
        displayTitle
      }
    }
  }
`;

