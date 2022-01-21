import React, { createRef } from "react";
import { graphql } from "gatsby";
import { connect } from "react-redux";
import Parallax from 'parallax-js'
import { EditableText, EditableParagraph, EditableLink, EditableImageUpload } from "react-easy-editables"
import { uploadImage } from "../firebase/operations"

import {
  updatePage,
  loadPageData,
  pushContentItem,
  removeContentItem,
} from "../redux/actions";

import Grid from "@material-ui/core/Grid"

import Layout from "../layouts/default.js";
import Section from "../components/common/Section";
import TrackList from "../components/common/TrackList"
import TrackRecord from "../components/common/TrackRecord"
import Collection from "../components/common/Collection";
import ParticipantLogo from "../components/common/ParticipantLogo"

import bgImg1 from "../assets/images/shapes/triangle-blue.svg"
import bgImg2 from "../assets/images/shapes/header-triangle-orange.svg"
import bgImg3 from "../assets/images/shapes/polygon-orange.svg"
import robot from "../assets/images/head.png"

import { DEFAULT_COMPONENT_CONTENT } from "../utils/constants"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PAGE_ID = "rwanda-smart-city-edition"

const mapDispatchToProps = dispatch => {
  return {
    onUpdatePageData: (page, id, data) => {
      dispatch(updatePage(page, id, data));
    },
    onLoadPageData: data => {
      dispatch(loadPageData(data));
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
    isLoggedIn: state.adminTools.isLoggedIn,
    isEditingPage: state.adminTools.isEditingPage,
  };
};

class CustomPage extends React.Component {
  constructor(props) {
    super(props)
    const initialPageData = {
      ...this.props.data.pages,
      content: JSON.parse(this.props.data.pages.content)
    };
    this.parallaxRef = createRef()
    this.parallaxRefRobot = createRef()

    this.props.onLoadPageData(initialPageData);
  }

  componentDidMount() {
    new Parallax(this.parallaxRef.current, { pointerEvents: true })
    new Parallax(this.parallaxRefRobot.current)
  }

  onSave = id => content => {
    this.props.onUpdatePageData(PAGE_ID, id, content);
  };

  onAddItem = id => content => {
    this.props.onPushContentItem(id, content);
  }

  onDeleteItem = id => itemId => {
    this.props.onRemoveContentItem(id, itemId)
  }

  render() {
    const content = this.props.pageData ? this.props.pageData.content : JSON.parse(this.props.data.pages.content);

    return (
      <Layout location={this.props.location}>
        <Section id="header" data-aos="fade-in">
          <div className="content">
            <Grid container>
              <Grid item xs={12} md={6}>
                <h1><EditableText content={content["landing-title"]} onSave={this.onSave('landing-title')} /></h1>
              </Grid>
              <Grid item xs={12} md={6} ref={this.parallaxRef}>
                <div data-depth={"0.5"} className="header-image p-40">
                  <EditableImageUpload content={content["landing-image"]} onSave={this.onSave('landing-image')} uploadImage={uploadImage} />
                </div>
              </Grid>
            </Grid>

            <Grid container>
              <Grid item xs={12} md={6}>
                <div className="subtitle">
                  <EditableParagraph content={content["landing-subtitle"]} onSave={this.onSave('landing-subtitle')} />
                </div>
              </Grid>
            </Grid>
            <div className="background">
              <img src={bgImg1} alt="" className="rotateme" />
              <img src={bgImg2} alt="" className="rotateme-reverse" />
            </div>
          </div>
        </Section>

        <Section id="ii2030" className="bg-dark">
          <div className="" data-aos="fade-in">
            <Grid container>
              <Grid item xs={12} md={5} >
              </Grid>
            </Grid>
            <Grid container justify="space-around" alignItems="center" className="mt-20 mb-40">
              <Grid item xs={12} md={5}>
                <div className="collage" ref={this.parallaxRefRobot}>
                  <img data-depth={"0.2"} src={robot} alt="" className="bg-img p-absolute" style={{ height: '260px', width: 'auto', zIndex: 1, marginTop: '-20px' }} />
                  <img data-depth={"0.5"} src={bgImg3} alt="" className="bg-img" style={{ height: '400px' }} />
                </div>
              </Grid>
              <Grid item xs={12} md={7}>
                <div className="">
                  <EditableParagraph content={content["overview-description"]} onSave={this.onSave('overview-description')} />
                  <EditableLink content={content["overview-link"]} onSave={this.onSave('overview-link')} classes="btn white mt-20" />
                </div>
              </Grid>
            </Grid>
          </div>
        </Section>

        <Section id="track-list" className="">
          <Grid container>
            <Grid item xs={12} md={7}>
              <h2 className="mb-40"><EditableText content={content["tracklist-title"]} onSave={this.onSave('tracklist-title')} /></h2>
              <div className="indented">
                <EditableParagraph content={content["tracklist-description"]} onSave={this.onSave('tracklist-description')} />
              </div>
            </Grid>
          </Grid>
          <Grid container justify="center">
            <Grid item xs={12}>
              <TrackList
                content={content["track-list"]}
                onSave={this.onSave('track-list')}
                onAddItem={this.onAddItem('track-list')}
                onDeleteItem={this.onDeleteItem('track-list')}
                isEditingPage={this.props.isEditingPage}
              />
            </Grid>
          </Grid>
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
            <Grid item xs={12} sm={6} md={3} className="journey-container mt-80" data-aos="fade-in" data-aos-delay="50">
              <TrackRecord className="mt-100" content={content["journey-step-1"]} onSave={this.onSave('journey-step-1')} shape="arrow" />
            </Grid>
            <Grid item xs={12} sm={6} md={3} className="journey-container mt-40" data-aos="fade-in" data-aos-delay="250">
              <TrackRecord className="mt-80" content={content["journey-step-2"]} onSave={this.onSave('journey-step-2')} shape="arrow" />
            </Grid>
            <Grid item xs={12} sm={6} md={3} className="journey-container" data-aos="fade-in" data-aos-delay="450">
              <TrackRecord className="mt-60" content={content["journey-step-3"]} onSave={this.onSave('journey-step-3')} shape="arrow" />
            </Grid>
          </Grid>

        </Section>


        <Section id="partners-2022" className="bg-white">
          <Grid container>
            <Grid item xs={12} sm={12} md={9}>
              <h2 className="mb-40"><EditableText content={content["partners-logos-title"]} onSave={this.onSave('partners-logos-title')} /></h2>
              <Collection
                items={content["partner-logos-2022"]}
                Component={ParticipantLogo}
                onSave={this.onSave('partner-logos-2022')}
                onAddItem={this.onAddItem('partner-logos-2022')}
                onDeleteItem={this.onDeleteItem('partner-logos-2022')}
                isEditingPage={this.props.isEditingPage}
                defaultContent={DEFAULT_COMPONENT_CONTENT['partner-logos']}
                classes="partner-logos indented"
              />
              <div className="indented">
                <EditableParagraph content={content["2022-description"]} onSave={this.onSave('2022-description')} />
              </div>
            </Grid>
          </Grid>
        </Section>

        <Section id="cta" className="bg-dark" data-aos="fade-in">
          <Grid container>
            <Grid item xs={12}>
              <div className="cta">
                <h2 className="text">
                  <EditableText content={content["cta-text"]} onSave={this.onSave('cta-text')} />
                </h2>
                <div className="line" />
                <EditableLink classes="btn white" content={content["cta-link"]} onSave={this.onSave('cta-link')} />
              </div>
            </Grid>
          </Grid>
        </Section>

      </Layout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomPage);

export const query = graphql`
  query {
    pages(id: {eq: "rwanda-smart-city-edition"}) {
      id
      content
      title
      slug
    }
    allTracks(filter: { year: { eq: 2022 }}) {
      edges {
        node {
          id
          title
          slug
          tech
          content
        }
      }
    }
  }
`;


