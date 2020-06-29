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
import bgImg1 from "../assets/images/shapes/triangle-blue.svg"
import bgImg2 from "../assets/images/shapes/header-triangle-orange.svg"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PAGE_ID = "home"

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

class HomePage extends React.Component {
  constructor(props) {
    super(props)
    const initialPageData = {
      ...this.props.data.pages,
      content: JSON.parse(this.props.data.pages.content)
    };
    this.parallaxRef = createRef()

    this.props.onLoadPageData(initialPageData);
  }

  componentDidMount() {
    new Parallax(this.parallaxRef.current, { pointerEvents: true })
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
                <div data-depth={"0.5"} className="header-image">
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
          </div>
          <div className="background">
            <img src={bgImg1} alt="" className="rotateme" />
            <img src={bgImg2} alt="" className="rotateme-reverse" />
          </div>
        </Section>

        <Section id="overview" className="bg-dark">
          <div data-aos="fade-in">
            <Grid container>
              <Grid item xs={12} md={5} >
                <h2><EditableText content={content["overview-title"]} onSave={this.onSave('overview-title')} /></h2>
                <div className="underline" />
              </Grid>
            </Grid>
            <Grid container justify="flex-end">
              <Grid item xs={12} md={7}>
                <EditableParagraph content={content["overview-description"]} onSave={this.onSave('overview-description')} />
                <EditableLink content={content["overview-link"]} onSave={this.onSave('overview-link')} classes="btn white mt-20" />
              </Grid>
            </Grid>
          </div>
        </Section>

        <Section id="overview" >
          <div className="" data-aos="fade-in">
            <Grid container>
              <Grid item xs={12} md={5} >
                <h2><EditableText content={content["special-edition-title"]} onSave={this.onSave('special-edition-title')} /></h2>
                <div className="underline" />
              </Grid>
            </Grid>
            <Grid container justify="flex-end">
              <Grid item xs={12} md={7}>
                <EditableParagraph content={content["special-edition-description"]} onSave={this.onSave('special-edition-description')} />
              </Grid>
            </Grid>
          </div>
        </Section>

        <Section id="journey" className="bg-light">
          <Grid container>
            <Grid item xs={12} md={5}>
              <h2><EditableText content={content["journey-title"]} onSave={this.onSave('journey-title')} /></h2>
              <div className="underline" />
            </Grid>
          </Grid>
          <Grid container justify="flex-end" className="mb-40">
            <Grid item xs={12} md={7}>
              <EditableParagraph content={content["journey-description"]} onSave={this.onSave('journey-description')} />
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12} md={3} className="journey-container mt-40" data-aos="fade-in" data-aos-delay="50">
              <TrackRecord className="mt-100" content={content["journey-step-1"]} onSave={this.onSave('journey-step-1')} shape="arrow" />
            </Grid>
            <Grid item xs={12} md={3} className="journey-container mt-80" data-aos="fade-in" data-aos-delay="200">
              <TrackRecord className="mt-70" content={content["journey-step-2"]} onSave={this.onSave('journey-step-2')} shape="arrow" />
            </Grid>
            <Grid item xs={12} md={3} className="journey-container mt-60" data-aos="fade-in" data-aos-delay="350">
              <TrackRecord className="mt-40" content={content["journey-step-3"]} onSave={this.onSave('journey-step-3')} shape="arrow" />
            </Grid>
            <Grid item xs={12} md={3} className="journey-container" data-aos="fade-in" data-aos-delay="450">
              <TrackRecord content={content["journey-step-4"]} onSave={this.onSave('journey-step-4')} shape="arrow" />
            </Grid>
          </Grid>

        </Section>

        <Section id="track-list" className="">
          <Grid container>
            <Grid item xs={12} md={5}>
              <h2><EditableText content={content["tracklist-title"]} onSave={this.onSave('tracklist-title')} /></h2>
              <div className="underline" />
            </Grid>
          </Grid>
          <Grid container justify="flex-end">
            <Grid item xs={12} md={7}>
              <EditableParagraph content={content["tracklist-description"]} onSave={this.onSave('tracklist-description')} />
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

        <Section id="partners" className="">
          <div className="mb-60" data-aos="fade-in">
            <Grid container>
              <Grid item xs={12} md={5} >
                <h2><EditableText content={content["partners-title"]} onSave={this.onSave('partners-title')} /></h2>
                <div className="underline" />
              </Grid>
            </Grid>
            <Grid container justify="flex-end">
              <Grid item xs={12} md={7}>
                <EditableParagraph content={content["partners-description"]} onSave={this.onSave('partners-description')} />
              </Grid>
            </Grid>
          </div>

        </Section>

      </Layout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

export const query = graphql`
  query {
    pages(id: {eq: "home"}) {
      id
      content
      title
      slug
    }
    allTracks(filter: { year: { eq: 2019 }}) {
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


