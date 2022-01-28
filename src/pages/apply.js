import React, { createRef } from "react";
import { graphql } from "gatsby";
import { connect } from "react-redux";
import Parallax from 'parallax-js'
import { EditableText, EditableImageUpload } from "react-easy-editables"
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

import bgImg1 from "../assets/images/shapes/polygon-lg-blue.svg"
import bgImg2 from "../assets/images/shapes/header-triangle-orange.svg"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PAGE_ID = "apply"

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
    const metadata = {
      title: content["landing-title"] ? content["landing-title"]["text"] : "Apply",
      url: this.props.location.href
    }

    return (
      <Layout location={this.props.location} className="apply-page" metadata={metadata}>
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
            <div className="background">
              <img src={bgImg1} alt="" className="rotateme" />
              <img src={bgImg2} alt="" className="rotateme-reverse" />
            </div>
          </div>
        </Section>

        <iframe
          className="airtable-embed"
          title="Webinar Application Form"
          src="https://airtable.com/embed/shrOhT60muF57KGJb?backgroundColor=purple"
          frameBorder="0"
          onWheel={()=>false}
          width="100%"
          height="1745"
          style={{ background: "transparent", border: "none" }}>
        </iframe>

      </Layout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

export const query = graphql`
  query {
    pages(id: {eq: "apply"}) {
      id
      content
      title
      slug
    }
  }
`;


