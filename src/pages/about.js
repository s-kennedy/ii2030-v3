import React from "react";
import { graphql } from "gatsby";
import { connect } from "react-redux";
import { EditableText, EditableParagraph, EditableLink } from "react-easy-editables"

import {
  updatePage,
  loadPageData,
} from "../redux/actions";

import Grid from "@material-ui/core/Grid"

import Layout from "../layouts/default.js";
import Section from "../components/common/Section";
import Testimonial from "../components/common/Testimonial"
import PopoutVideo from "../components/common/PopoutVideo"

import headIcon from "../assets/images/head-icon.png"
import tourIcon from "../assets/images/tour-icon.png"
import factoryIcon from "../assets/images/factory-icon.png"
import bgImg1 from "../assets/images/shapes/header-triangle-red.svg"
import bgImg2 from "../assets/images/shapes/polygon-lg-blue.svg"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PAGE_ID = "about"

const mapDispatchToProps = dispatch => {
  return {
    onUpdatePageData: (page, id, data) => {
      dispatch(updatePage(page, id, data));
    },
    onLoadPageData: data => {
      dispatch(loadPageData(data));
    },
  };
};

const mapStateToProps = state => {
  return {
    pageData: state.page.data,
    isLoggedIn: state.adminTools.isLoggedIn,
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

  render() {
    const content = this.props.pageData ? this.props.pageData.content : JSON.parse(this.props.data.pages.content);

    return (
      <Layout>
        <Section id="header" data-aos="fade-in">
          <div className="background">
            <img src={bgImg1} alt="" className="rotateme" />
            <img src={bgImg2} alt="" className="rotateme-reverse" />
          </div>
          <div className="content">
            <Grid container>
              <Grid item xs={12} md={7}>
                <h1><EditableText content={content["landing-title"]} onSave={this.onSave('landing-title')} /></h1>
              </Grid>
            </Grid>
            <Grid container spacing={6}>
              <Grid item xs={12} md={7}>
                <div className="video">
                  <PopoutVideo content={content["landing-video"]} onSave={this.onSave('landing-video')} />
                </div>
              </Grid>
              <Grid item xs={12} md={5}>
                <h1 className="oversize"><EditableText content={content["landing-secondary-title"]} onSave={this.onSave('landing-secondary-title')} /></h1>
              </Grid>
            </Grid>
          </div>
        </Section>

        <Section id="overview" className="bg-light bg-circuit-white">
          <div className="mb-60" data-aos="fade-in">
            <Grid container>
              <Grid item xs={12} md={5} >
                <h2><EditableText content={content["overview-title"]} onSave={this.onSave('overview-title')} /></h2>
              </Grid>
              <Grid item xs={12} md={7}>
                <EditableParagraph content={content["overview-description"]} onSave={this.onSave('overview-description')} />
                <EditableLink content={content["overview-link"]} onSave={this.onSave('overview-link')} />
              </Grid>
            </Grid>
          </div>

          <div className="mb-60" data-aos="fade-in">
            <Grid container>
              <Grid item xs={12} md={5}>
                <h2><EditableText content={content["challenge-title"]} onSave={this.onSave('challenge-title')} /></h2>
              </Grid>
              <Grid item xs={12} md={7}>
                <EditableParagraph content={content["challenge-description"]} onSave={this.onSave('challenge-description')} />
              </Grid>
            </Grid>
          </div>

          <div className="mb-60" data-aos="fade-in">
            <Grid container>
              <Grid item xs={12} md={5}>
                <h2><EditableText content={content["solution-title"]} onSave={this.onSave('solution-title')} /></h2>
              </Grid>
              <Grid item xs={12} md={7}>
                <EditableParagraph content={content["solution-description"]} onSave={this.onSave('solution-description')} />
              </Grid>
            </Grid>
          </div>

          <div className="mb-60" data-aos="fade-in">
            <Grid container>
              <Grid item xs={12} md={5}>
                <h2><EditableText content={content["join-title"]} onSave={this.onSave('join-title')} /></h2>
              </Grid>
              <Grid item xs={12} md={7}>
                <EditableParagraph content={content["join-description"]} onSave={this.onSave('join-description')} />
                <EditableLink classes="link" content={content["join-link"]} onSave={this.onSave('join-link')} />
              </Grid>
            </Grid>
          </div>
        </Section>

        <Section id="testimonials" className="">
          <Grid container>
            <Grid item xs={12}>
              <h2 className="mb-40"><EditableText content={content["testimonials-title"]} onSave={this.onSave('testimonials-title')} /></h2>
            </Grid>
          </Grid>
          <Grid container spacing={6}>
            <Grid item xs={12} md={4} className="testimonial-container" data-aos="fade-in" data-aos-delay="50">
              <Testimonial content={content["testimonial1"]} onSave={this.onSave('testimonial1')} />
            </Grid>
            <Grid item xs={12} md={4} className="testimonial-container" data-aos="fade-in" data-aos-delay="200">
              <Testimonial content={content["testimonial2"]} onSave={this.onSave('testimonial2')} />
            </Grid>
            <Grid item xs={12} md={4} className="testimonial-container" data-aos="fade-in" data-aos-delay="450">
              <Testimonial content={content["testimonial3"]} onSave={this.onSave('testimonial3')} />
            </Grid>
          </Grid>
        </Section>

        <Section id="process" className="bg-light">
          <Grid container>
            <Grid item xs={12} md={5}>
              <h2 className="mb-40"><EditableText content={content["process-title"]} onSave={this.onSave('process-title')} /></h2>
            </Grid>
          </Grid>

          <Grid container alignItems="center" data-aos="fade-in">
            <Grid item xs={12} md={5}>
              <div className="horiz-center">
                <div className="process-collage">
                  <div className="bg-circle"></div>
                  <div className="robot-icon">
                    <img src={headIcon} alt="friendly robot head" />
                  </div>
                  <div className="number oversize">1</div>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} md={7} >
              <h3><EditableText content={content["step1-title"]} onSave={this.onSave('step1-title')} /></h3>
              <EditableParagraph content={content["step1-description"]} onSave={this.onSave('step1-description')} />
            </Grid>
          </Grid>

          <Grid container alignItems="center" data-aos="fade-in">
            <Grid item xs={12} md={5}>
              <div className="horiz-center">
                <div className="process-collage">
                  <div className="bg-circle"></div>
                  <div className="robot-icon">
                    <img src={tourIcon} alt="friendly rocket" />
                  </div>
                  <div className="number oversize">2</div>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} md={7}>
              <h3><EditableText content={content["step2-title"]} onSave={this.onSave('step2-title')} /></h3>
              <EditableParagraph content={content["step2-description"]} onSave={this.onSave('step2-description')} />
            </Grid>
          </Grid>

          <Grid container alignItems="center" data-aos="fade-in">
            <Grid item xs={12} md={5}>
              <div className="horiz-center">
                <div className="process-collage">
                  <div className="bg-circle"></div>
                  <div className="robot-icon">
                    <img src={factoryIcon} alt="friendly factory" />
                  </div>
                  <div className="number oversize">3</div>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} md={7}>
              <h3><EditableText content={content["step3-title"]} onSave={this.onSave('step3-title')} /></h3>
              <EditableParagraph content={content["step3-description"]} onSave={this.onSave('step3-description')} />
            </Grid>
          </Grid>
        </Section>

        <Section id="track-record" className="">
          <Grid container>
            <Grid item xs={12} md={5}>
              <h2 className="mb-40"><EditableText content={content["track-record-title-title"]} onSave={this.onSave('track-record-title-title')} /></h2>
            </Grid>
            <Grid item xs={12} md={7}>
              <EditableParagraph content={content["track-record-description"]} onSave={this.onSave('track-record-description')} />
            </Grid>
          </Grid>
          <Grid container spacing={6}>
            <Grid item xs={12} md={4} className="testimonial-container" data-aos="fade-in" data-aos-delay="50">
              <Testimonial content={content["track-record-1"]} onSave={this.onSave('track-record-1')} shape="polygon" />
            </Grid>
            <Grid item xs={12} md={4} className="testimonial-container" data-aos="fade-in" data-aos-delay="200">
              <Testimonial content={content["track-record-2"]} onSave={this.onSave('track-record-2')} shape="polygon" />
            </Grid>
            <Grid item xs={12} md={4} className="testimonial-container" data-aos="fade-in" data-aos-delay="450">
              <Testimonial content={content["track-record-3"]} onSave={this.onSave('track-record-3')} shape="polygon" />
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
    pages(id: {eq: "about"}) {
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


