import React from "react";
import { graphql } from "gatsby";
import { connect } from "react-redux";
import { EditableText, EditableParagraph, EditableLink } from "react-easy-editables"

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
import PopoutVideo from "../components/common/PopoutVideo"
import ImageCarousel from "../components/common/ImageCarousel"

import bgPolygonWhite from "../assets/images/shapes/polygon-white.svg"
import bgPolygonBlue from "../assets/images/shapes/polygon-lg-blue.svg"

import bgImg1 from "../assets/images/shapes/header-triangle-orange.svg"
import bgImg2 from "../assets/images/shapes/polygon-lg-blue.svg"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PAGE_ID = "past_events"

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

    this.props.onLoadPageData(initialPageData);
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
      <Layout>
        <Section id="header" data-aos="fade-in">

          <div className="content">
            <Grid container>
              <Grid item xs={12} md={7}>
                <h1><EditableText content={content["landing-title"]} onSave={this.onSave('landing-title')} /></h1>
              </Grid>
            </Grid>

            <Grid container justify="flex-end">
              <Grid item xs={12} md={5}>
                <PopoutVideo content={content["landing-video"]} onSave={this.onSave('landing-video')} />
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

        <Section id="2019" className="bg-light">
          <Grid container data-aos="fade-in">
            <Grid item xs={12} md={5}>
              <h2 className="mb-40"><EditableText content={content["2019-title"]} onSave={this.onSave('2019-title')} /></h2>
              <EditableParagraph content={content["2019-details"]} onSave={this.onSave('2019-details')} />
            </Grid>
            <Grid item xs={12} md={7}>
              <EditableParagraph content={content["2019-description"]} onSave={this.onSave('2019-description')} />
            </Grid>
          </Grid>

          <Grid container data-aos="fade-in">
            <Grid item xs={12}>
              <div className="image-slides">
                <div className="bg-img">
                  <img src={bgPolygonWhite} alt="" />
                </div>
                <ImageCarousel
                  content={content["photos-2019"]}
                  onSave={this.onSave('photos-2019')}
                  onAddItem={this.onAddItem('photos-2019')}
                  onDeleteItem={this.onDeleteItem('photos-2019')}
                  isEditingPage={this.props.isEditingPage}
                />
              </div>
            </Grid>
          </Grid>

          <Grid container justify="flex-end">
            <Grid item xs={12} md={7}>
              <TrackList
                content={content["track-list-2019"]}
                onSave={this.onSave('track-list-2019')}
                onAddItem={this.onAddItem('track-list-2019')}
                onDeleteItem={this.onDeleteItem('track-list-2019')}
                isEditingPage={this.props.isEditingPage}
              />
            </Grid>
          </Grid>
        </Section>

        <Section id="2017" className="">
          <Grid container data-aos="fade-in">
            <Grid item xs={12} md={5}>
              <h2 className="mb-40"><EditableText content={content["2017-title"]} onSave={this.onSave('2017-title')} /></h2>
              <EditableParagraph content={content["2017-details"]} onSave={this.onSave('2017-details')} />
            </Grid>
            <Grid item xs={12} md={7}>
              <EditableParagraph content={content["2017-description"]} onSave={this.onSave('2017-description')} />
            </Grid>
          </Grid>

          <Grid container data-aos="fade-in">
            <Grid item xs={12}>
              <div className="image-slides">
                <div className="bg-img">
                  <img src={bgPolygonBlue} alt="" />
                </div>
                <ImageCarousel
                  content={content["photos-2017"]}
                  onSave={this.onSave('photos-2017')}
                  onAddItem={this.onAddItem('photos-2017')}
                  onDeleteItem={this.onDeleteItem('photos-2017')}
                  isEditingPage={this.props.isEditingPage}
                />
              </div>
            </Grid>
          </Grid>


          <Grid container justify="flex-end">
            <Grid item xs={12} md={7}>
              <TrackList
                content={content["track-list-2017"]}
                onSave={this.onSave('track-list-2017')}
                onAddItem={this.onAddItem('track-list-2017')}
                onDeleteItem={this.onDeleteItem('track-list-2017')}
                isEditingPage={this.props.isEditingPage}
              />
            </Grid>
          </Grid>
        </Section>

        <Section id="cta" className="bg-light bg-circuit-white-right" data-aos="fade-in">
          <Grid container>
            <Grid item xs={12}>
              <div className="cta">
                <h2 className="text">
                  <EditableText content={content["cta-text"]} onSave={this.onSave('cta-text')} />
                </h2>
                <div className="line" />
                <EditableLink classes="btn" content={content["cta-link"]} onSave={this.onSave('cta-link')} />
              </div>
            </Grid>
          </Grid>
        </Section>

      </Layout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

export const query = graphql`
  query {
    pages(id: {eq: "past_events"}) {
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


