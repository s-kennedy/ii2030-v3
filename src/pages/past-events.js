import React, { createRef } from "react";
import { graphql, Link } from "gatsby";
import { connect } from "react-redux";
import { EditableText, EditableParagraph } from "react-easy-editables"
import Parallax from 'parallax-js'

import {
  updatePage,
  loadPageData,
  pushContentItem,
  removeContentItem,
} from "../redux/actions";

import Grid from "@material-ui/core/Grid"
import ArrowIcon from "@material-ui/icons/ArrowRightAlt"


import Layout from "../layouts/default.js";
import Section from "../components/common/Section";
import PopoutVideo from "../components/common/PopoutVideo"
import ImageCarousel from "../components/common/ImageCarousel"
import Collection from "../components/common/Collection";
import ParticipantLogo from "../components/common/ParticipantLogo"

import bgPolygonRed from "../assets/images/shapes/polygon-lg-white.svg"
import bgPolygonBlue from "../assets/images/shapes/polygon-lg-blue.svg"

import bgImg1 from "../assets/images/shapes/header-triangle-orange.svg"
import thumbnail from "../assets/images/thumbnail-a4f.jpg"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { DEFAULT_COMPONENT_CONTENT } from "../utils/constants"

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
    const tracks = this.props.data.allTracks.edges.map(e => {
      let node = e.node;
      return node
    })

    const tracks2017 = tracks.filter(t => t.year === 2017)
    const tracks2019 = tracks.filter(t => t.year === 2019)
    const tracks2020 = tracks.filter(t => t.year === 2020)

    const metadata = {
      title: content["landing-title"]["text"],
      url: this.props.location.href
    }

    return (
      <Layout location={this.props.location} className="past-events-page" metadata={metadata}>
        <Section id="header" data-aos="fade-in">
          <div className="content">
            <Grid container>
              <Grid item xs={12} md={7}>
                <h1><EditableText content={content["landing-title"]} onSave={this.onSave('landing-title')} /></h1>
              </Grid>
              <Grid item xs={12} md={5} ref={this.parallaxRef}>
                <div data-depth={"0.5"} className="header-video mt--60 mb--100">
                  <PopoutVideo
                    content={content["landing-video"]}
                    onSave={this.onSave('landing-video')}
                    bgImg={null}
                    thumbnail={thumbnail}
                  />
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
              <img src={bgImg1} alt="" className="rotateme" style={{ width: "70%", left: "15%"}} />
            </div>
          </div>
        </Section>

        <Section id="2020" className="bg-light">
          <Grid container>
            <Grid item xs={12} sm={12} md={9}>
              <h2 className="mb-40"><EditableText content={content["2020-title"]} onSave={this.onSave('2020-title')} /></h2>
              <Collection
                items={content["a4f-partner-logos"]}
                Component={ParticipantLogo}
                onSave={this.onSave('a4f-partner-logos')}
                onAddItem={this.onAddItem('a4f-partner-logos')}
                onDeleteItem={this.onDeleteItem('a4f-partner-logos')}
                isEditingPage={this.props.isEditingPage}
                defaultContent={DEFAULT_COMPONENT_CONTENT['partner-logos']}
                classes="partner-logos indented"
              />
              <div className="indented">
                <EditableParagraph content={content["2020-description"]} onSave={this.onSave('2020-description')} />
              </div>
            </Grid>
          </Grid>


          <Grid container data-aos="fade-in">
            <Grid item xs={12}>
              <div className="image-slides">
                <div className="bg-img">
                  <img src={bgPolygonRed} alt="" />
                </div>
                <ImageCarousel
                  content={content["photos-2020"]}
                  onSave={this.onSave('photos-2020')}
                  onAddItem={this.onAddItem('photos-2020')}
                  onDeleteItem={this.onDeleteItem('photos-2020')}
                  isEditingPage={this.props.isEditingPage}
                />
              </div>
            </Grid>
          </Grid>

          <Grid container justify="center">
            <Grid item xs={12} md={7}>
              {
                tracks2020.map(track => {
                  let content = {}
                  try {
                    content = JSON.parse(track.content)
                  } catch(err) {
                    console.log(err)
                  }
                  return(
                    <div key={track.slug} className={`track-item mb-60 mt-60`} data-aos="fade-in">
                      <Grid container spacing={6}>
                        <Grid item xs={12} sm={3}>
                          <div className="image-container">
                            <div className="bg-circle"></div>
                            <div className="icon">
                            {
                              content["icon-small"] &&
                              <img
                                className="image"
                                src={content["icon-small"]["imageSrc"]}
                                alt={content["icon-small"]["caption"]}
                              />
                            }
                            </div>
                          </div>
                        </Grid>

                        <Grid item xs={12} sm={9}>
                          <div className="text">
                            <h4 className="mb-20">
                              { track.title }
                            </h4>

                            {
                              content["topic"] &&
                              <div className="description mb-20">
                                { content["topic"]["text"] }
                              </div>
                            }
                            <Link className="link red" to={track.slug}>Visit the track <ArrowIcon /></Link>
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  )
                })
              }
            </Grid>
          </Grid>
        </Section>

        <Section id="2019" className="">
          <Grid container>
            <Grid item xs={12} md={7}>
              <h2 className="mb-40"><EditableText content={content["2019-title"]} onSave={this.onSave('2019-title')} /></h2>
              <div className="indented">
                <EditableParagraph content={content["2019-description"]} onSave={this.onSave('2019-description')} />
              </div>
            </Grid>
          </Grid>


          <Grid container data-aos="fade-in">
            <Grid item xs={12}>
              <div className="image-slides">
                <div className="bg-img">
                  <img src={bgPolygonRed} alt="" />
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

          <Grid container justify="center">
            <Grid item xs={12} md={7}>
              {
                tracks2019.map(track => {
                  let content = {}
                  try {
                    content = JSON.parse(track.content)
                  } catch(err) {
                    console.log(err)
                  }
                  return(
                    <div key={track.slug} className={`track-item mb-60 mt-60`} data-aos="fade-in">
                      <Grid container spacing={6}>
                        <Grid item xs={12} sm={3}>
                          <div className="image-container">
                            <div className="bg-circle"></div>
                            <div className="icon">
                            {
                              content["icon-small"] &&
                              <img
                                className="image"
                                src={content["icon-small"]["imageSrc"]}
                                alt={content["icon-small"]["caption"]}
                              />
                            }
                            </div>
                          </div>
                        </Grid>

                        <Grid item xs={12} sm={9}>
                          <div className="text">
                            <h4 className="mb-20">
                              { track.title }
                            </h4>

                            {
                              content["topic"] &&
                              <div className="description mb-20">
                                { content["topic"]["text"] }
                              </div>
                            }
                            <Link className="link red" to={track.slug}>Visit the track <ArrowIcon /></Link>
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  )
                })
              }
            </Grid>
          </Grid>
        </Section>

        <Section id="2017" className="bg-light">
          <Grid container>
            <Grid item xs={12} md={7}>
              <h2 className="mb-40"><EditableText content={content["2017-title"]} onSave={this.onSave('2017-title')} /></h2>
              <div className="indented">
                <EditableParagraph content={content["2017-description"]} onSave={this.onSave('2017-description')} />
              </div>
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


          <Grid container justify="center">
            <Grid item xs={12} md={7}>
              {
                tracks2017.map(track => {
                  let content = {}
                  try {
                    content = JSON.parse(track.content)
                  } catch(err) {
                    console.log(err)
                  }
                  return(
                    <div key={track.slug} className={`track-item mb-60 mt-60`} data-aos="fade-in">
                      <Grid container spacing={6}>
                        <Grid item xs={12} sm={3}>
                          <div className="image-container">
                            <div className="bg-circle"></div>
                            <div className="icon">
                            {
                              content["icon-small"] &&
                              <img
                                className="image"
                                src={content["icon-small"]["imageSrc"]}
                                alt={content["icon-small"]["caption"]}
                              />
                            }
                            </div>
                          </div>
                        </Grid>

                        <Grid item xs={12} sm={9}>
                          <div className="text">
                            <h4 className="mb-20">
                              { track.title }
                            </h4>

                            {
                              content["topic"] &&
                              <div className="description mb-20">
                                { content["topic"]["text"] }
                              </div>
                            }
                            <Link className="link red" to={track.slug}>Visit the track <ArrowIcon /></Link>
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  )
                })
              }
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
    allTracks {
      edges {
        node {
          id
          title
          slug
          tech
          year
          content
        }
      }
    }
  }
`;


