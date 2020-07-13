import React, { createRef } from "react";
import { graphql } from "gatsby";
import { connect } from "react-redux";
import { EditableText, EditableParagraph, EditableLink, EditableImageUpload, EditableFileUpload } from "react-easy-editables"
import { uploadImage, uploadFile } from "../firebase/operations"
import Parallax from 'parallax-js'
import AOS from 'aos';

import {
  updatePage,
  loadPageData,
  pushContentItem,
  removeContentItem,
} from "../redux/actions";

import Grid from "@material-ui/core/Grid"
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Layout from "../layouts/default.js";
import Section from "../components/common/Section";
import Testimonial from "../components/common/Testimonial"
import PopoutVideo from "../components/common/PopoutVideo"
import PartnerLogo from "../components/common/PartnerLogo"
import Collection from "../components/common/Collection";

import headIcon from "../assets/images/head-icon-standardized.png"
import tourIcon from "../assets/images/tour-icon-standardized.png"
import factoryIcon from "../assets/images/factory-icon-standardized.png"
import bgImg1 from "../assets/images/shapes/header-triangle-red.svg"
import bgImg2 from "../assets/images/shapes/polygon-lg-blue.svg"
import bgImg4 from "../assets/images/shapes/header-triangle-light-blue.svg"
import bgImg5 from "../assets/images/shapes/triangle-blue.svg"
import endevaLogo from "../assets/images/logos/endeva.png"
import ddgThumbnail from "../assets/images/ddgThumbnail.jpg"

import { DEFAULT_COMPONENT_CONTENT } from "../utils/constants"

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
    this.parallaxRef = createRef()
    this.parallaxRefSteps = createRef()
    const initialPageData = {
      ...this.props.data.pages,
      content: JSON.parse(this.props.data.pages.content)
    };

    this.props.onLoadPageData(initialPageData);
  }

  componentDidMount() {
    new Parallax(this.parallaxRef.current, { pointerEvents: true })
    new Parallax(this.parallaxRefSteps.current, { selector: '.parallax-it', pointerEvents: true })
    AOS.init({ delay: 50, duration: 400 })
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
      <Layout location={this.props.location} className="home-page">
        <Section id="header" data-aos="fade-in">
          <div className="content">
            <Grid container>
              <Grid item xs={12} md={6}>
                <h1>
                  <span className="highlight-text">i</span>nclusive<br/>
                  <span className="highlight-text">i</span>nnovation<br/>
                  <span className="highlight-text">2030</span>
                </h1>
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
            <div className="background">
              <img src={bgImg1} alt="" className="rotateme" />
              <img src={bgImg2} alt="" className="rotateme-reverse" />
            </div>
          </div>
        </Section>

        <Section id="highlight" className="bg-blue pt-10 pb-10" data-aos="fade-up">
          <Grid container justify="center">
            <Grid item>
              <EditableLink content={content["apply-now-text"]} onSave={this.onSave('apply-now-text')} />
            </Grid>
          </Grid>
        </Section>

        <Section id="overview" className="bg-dark">
          <div className="" data-aos="fade-in">
            <Grid container justify="space-around" alignItems="center" className="mt-50 mb-30">
              <Grid item xs={12} md={5}>
                <div className="video" data-depth="0.5">
                  <PopoutVideo
                    content={content["landing-video"]}
                    onSave={this.onSave('landing-video')}
                    bgImg={bgImg4}
                  />
                </div>
              </Grid>
              <Grid item xs={12} md={5}>
                <h2 className="mb-40"><EditableText content={content["overview-title"]} onSave={this.onSave('overview-title')} /></h2>
                <div className="indented">
                  <EditableParagraph content={content["overview-description"]} onSave={this.onSave('overview-description')} />
                  <EditableLink content={content["overview-link"]} onSave={this.onSave('overview-link')} classes="btn white mt-20" />
                </div>
              </Grid>
            </Grid>
          </div>
        </Section>

        <Section id="overview" className="bg-light">
          <div className="mb-20" data-aos="fade-in">
            <Grid container>
              <Grid item xs={12} md={7}>
                <h2><EditableText content={content["challenge-title"]} onSave={this.onSave('challenge-title')} /></h2>
                <div className="underline"><div className="shape orange" /></div>
                <div className="indented">
                  <EditableParagraph content={content["challenge-description"]} onSave={this.onSave('challenge-description')} />
                </div>
              </Grid>
            </Grid>
          </div>

          <div className="mb-20" data-aos="fade-in">
            <Grid container justify="center">
              <Grid item xs={12} md={7}>
                <h2><EditableText content={content["solution-title"]} onSave={this.onSave('solution-title')} /></h2>
                <div className="underline"><div className="shape gray" /></div>
                <div className="indented">
                  <EditableParagraph content={content["solution-description"]} onSave={this.onSave('solution-description')} />
                </div>
              </Grid>
            </Grid>
          </div>

          <div className="mb-20 mt-40" data-aos="fade-in">
            <Grid container justify="flex-end">
              <Grid item xs={12} md={7}>
                <h2><EditableText content={content["join-title"]} onSave={this.onSave('join-title')} /></h2>
                <div className="underline"><div className="shape red" /></div>
                <div className="indented">
                  <EditableParagraph content={content["join-description"]} onSave={this.onSave('join-description')} />
                  <EditableLink content={content["join-link"]} onSave={this.onSave('join-link')} classes="btn red mt-20" />
                </div>
              </Grid>
            </Grid>
          </div>
        </Section>

        <Section id="testimonials" className="">
          <Grid container>
            <Grid item xs={12}>
              <h2 className="mb-40"><EditableText content={content["testimonials-title"]} onSave={this.onSave('testimonials-title')} /></h2>
              <EditableParagraph content={content["testimonials-description"]} onSave={this.onSave('testimonials-description')} />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} md={4} className="testimonial-container stagger" data-aos="fade-in" data-aos-delay="50">
              <Testimonial content={content["testimonial1"]} onSave={this.onSave('testimonial1')} quote={true} />
            </Grid>
            <Grid item xs={12} md={4} className="testimonial-container stagger" data-aos="fade-in" data-aos-delay="200">
              <Testimonial content={content["testimonial2"]} onSave={this.onSave('testimonial2')} quote={true} />
            </Grid>
            <Grid item xs={12} md={4} className="testimonial-container stagger" data-aos="fade-in" data-aos-delay="450">
              <Testimonial content={content["testimonial3"]} onSave={this.onSave('testimonial3')}quote={true}  />
            </Grid>
          </Grid>
        </Section>

        <Section id="process" className="bg-light">
          <Grid container>
            <Grid item xs={12} md={7} >
              <h2 className="mb-40"><EditableText content={content["process-title"]} onSave={this.onSave('process-title')} /></h2>
              <div className="indented">
                <EditableParagraph content={content["process-description"]} onSave={this.onSave('process-description')} />
              </div>
            </Grid>
          </Grid>

          <div className="process-steps mt-20" ref={this.parallaxRefSteps}>
            <Grid container alignItems="center" data-aos="fade-in" data-aos-delay={250}>
              <Grid item xs={12} md={5}>
                <div className="horiz-center">
                  <div className="process-collage">
                    <div className="robot-icon">
                      <img className="parallax-it" data-depth="0.2" src={headIcon} alt="friendly robot head" />
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} md={7}>
                <div className="step-description">
                  <ExpansionPanel square elevation={0} style={{ backgroundColor: 'transparent' }}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon style={{ color: "#AB3911"}} />} style={{ alignItems: 'baseline'}}>
                      <div>
                        <h3>Consultation</h3>
                        <div className="underline"><div className="shape arrow orange" style={{ height: "200%", top: "-50%" }} /></div>
                        <div className="indented text-italic">
                          <EditableText content={content["step1-title"]} onSave={this.onSave('step1-title')} />
                        </div>
                      </div>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <EditableParagraph content={content["step1-description"]} onSave={this.onSave('step1-description')} />
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                </div>
              </Grid>
            </Grid>

            <Grid container alignItems="center" data-aos="fade-in" data-aos-delay={200}>
              <Grid item xs={12} md={5}>
                <div className="horiz-center">
                  <div className="process-collage">
                    <div className="robot-icon">
                      <img className="parallax-it" data-depth="0.4" src={factoryIcon} alt="friendly factory" />
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} md={7}>
                <div className="step-description">
                  <ExpansionPanel square elevation={0} style={{ backgroundColor: 'transparent' }}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon style={{ color: "#AB3911"}} />} style={{ alignItems: 'baseline'}}>
                      <div>
                        <h3>Co-Creation</h3>
                        <div className="underline"><div className="shape arrow blue" style={{ height: "200%", top: "-50%" }} /></div>
                        <div className="indented text-italic">
                          <EditableText content={content["step2-title"]} onSave={this.onSave('step2-title')} />
                        </div>
                      </div>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <EditableParagraph content={content["step2-description"]} onSave={this.onSave('step2-description')} />
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                </div>
              </Grid>
            </Grid>

            <Grid container alignItems="center" data-aos="fade-in" data-aos-delay={200}>
              <Grid item xs={12} md={5}>
                <div className="horiz-center">
                  <div className="process-collage">
                    <div className="robot-icon">
                      <img className="parallax-it" data-depth="0.6" src={tourIcon} alt="friendly rocket" />
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} md={7}>
                <div className="step-description">
                  <ExpansionPanel square elevation={0} style={{ backgroundColor: 'transparent' }}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon style={{ color: "#AB3911"}} />} style={{ alignItems: 'baseline'}}>
                      <div>
                        <h3>Implementation</h3>
                        <div className="underline"><div className="shape arrow red" style={{ height: "200%", top: "-50%" }} /></div>
                        <div className="indented text-italic">
                          <EditableText content={content["step3-title"]} onSave={this.onSave('step3-title')} />
                        </div>
                      </div>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <EditableParagraph content={content["step3-description"]} onSave={this.onSave('step3-description')} />
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                </div>
              </Grid>
            </Grid>
          </div>
        </Section>

        <Section id="results" className="">
          <Grid container>
            <Grid item xs={12} md={7} >
              <h2 className="mb-40"><EditableText content={content["track-record-title"]} onSave={this.onSave('track-record-title')} /></h2>
              <div className="indented">
                <EditableParagraph content={content["track-record-description"]} onSave={this.onSave('track-record-description')} />
              </div>
            </Grid>
          </Grid>

          <div className="mt-40 mb-40" data-aos="fade-in">
            <Grid container justify="space-around" alignItems="center">
              <Grid item xs={12} md={5}>
                <div className="video">
                  <PopoutVideo
                    content={content["case1-video"]}
                    onSave={this.onSave('case1-video')}
                    thumbnail={ddgThumbnail}
                  />
                </div>
              </Grid>
              <Grid item xs={12} md={5}>
                <div className="track-icon mb-10">
                  <EditableImageUpload
                    content={content["case1-icon"]}
                    onSave={this.onSave('case1-icon')}
                    uploadImage={uploadImage}
                  />
                </div>
                <h3 className="mb-20"><EditableText content={content["case1-title"]} onSave={this.onSave('case1-title')} /></h3>
                <EditableParagraph content={content["case1-description"]} onSave={this.onSave('case1-description')} />
                <EditableFileUpload
                  content={content["case1-file"]}
                  onSave={this.onSave('case1-file')}
                  uploadFile={uploadFile}
                  maxSize={1024 * 1024 * 5}
                  linkText="Download the report"
                  classes="btn red"
                />
              </Grid>
            </Grid>
          </div>

          <Grid container justify="space-around">
            <Grid item xs={12} md={5}>
              <div className="mt-30 mb-30">
                <div className="circuit-collage">
                  <img src={bgImg5} alt="" className="bg-img" style={{ transform: "rotate(200deg)" }}/>
                  <EditableImageUpload
                    content={content["case2-image"]}
                    onSave={this.onSave('case2-image')}
                    uploadImage={uploadImage}
                    classes="main-image"
                    styles={{
                      container: {
                        width: "70%"
                      }
                    }}
                  />
                </div>
                <div className="track-icon mb-10">
                  <EditableImageUpload
                    content={content["case2-icon"]}
                    onSave={this.onSave('case2-icon')}
                    uploadImage={uploadImage}
                  />
                </div>
                <h3 className="mb-20"><EditableText content={content["case2-title"]} onSave={this.onSave('case2-title')} /></h3>
                <EditableParagraph content={content["case2-description"]} onSave={this.onSave('case2-description')} />
              </div>
            </Grid>

            <Grid item xs={12} md={5}>
              <div className="mt-30 mb-30">
                <div className="circuit-collage">
                  <img src={bgImg5} alt="" className="bg-img" style={{ transform: "rotate(-120deg)" }} />
                  <EditableImageUpload
                    content={content["case3-image"]}
                    onSave={this.onSave('case3-image')}
                    uploadImage={uploadImage}
                    classes="main-image"
                    styles={{
                      container: {
                        width: "70%"
                      }
                    }}
                  />
                </div>
                <div className="track-icon mb-10">
                  <EditableImageUpload
                    content={content["case3-icon"]}
                    onSave={this.onSave('case3-icon')}
                    uploadImage={uploadImage}
                  />
                </div>
                <h3 className="mb-20"><EditableText content={content["case3-title"]} onSave={this.onSave('case3-title')} /></h3>
                <EditableParagraph content={content["case3-description"]} onSave={this.onSave('case3-description')} />
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

        <Section id="partners" className="">
          <Grid container data-aos="fade-in">
            <Grid item xs={12} md={5} >
              <h2 className="mb-20 mt-20"><EditableText content={content["partners-title"]} onSave={this.onSave('partners-title')} /></h2>
            </Grid>
          </Grid>

          <Grid container data-aos="fade-in" justify="center">
            <Grid item xs={12} md={5}>
              <div className="endeva-line">An <a href="http://www.endeva.org/" target="_blank" rel="noopener noreferrer"><img id="endeva-logo" src={endevaLogo} alt="Endeva logo" /></a> initiative</div>
            </Grid>
            <Grid item xs={12} md={12}>
              <EditableParagraph content={content["partners-description"]} onSave={this.onSave('partners-description')} classes="text-center mb-20" />
            </Grid>
          </Grid>

          <Grid container data-aos="fade-in">
            <Grid item xs={12}>
            </Grid>
            <Collection
              items={content["partner-logos"]}
              Component={PartnerLogo}
              onSave={this.onSave('partner-logos')}
              onAddItem={this.onAddItem('partner-logos')}
              onDeleteItem={this.onDeleteItem('partner-logos')}
              isEditingPage={this.props.isEditingPage}
              defaultContent={DEFAULT_COMPONENT_CONTENT['partner-logos']}
              classes="partner-logos"
            />
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


