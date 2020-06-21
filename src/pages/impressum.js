import React from "react";
import { graphql } from "gatsby";
import { connect } from "react-redux";
import {
  updatePage,
  loadPageData,
} from "../redux/actions";

import Layout from "../layouts/default.js";
import Section from "../components/common/Section";

import { EditableParagraph, EditableText } from "react-easy-editables"


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
    pageData: state.page.data
  };
};

class Impressum extends React.Component {
  componentDidMount() {
    const initialPageData = {
      ...this.props.data.pages,
      content: JSON.parse(this.props.data.pages.content)
    };

    this.props.onLoadPageData(initialPageData);
  }

  saveHandler = id => content => {
    this.props.onUpdatePageData("impressum", id, content);
  };

  render() {
    const content = this.props.pageData ? this.props.pageData.content : {};

    return (
      <Layout>

        <main>
          <Section id="basic-page">
            <header className="text-center">
              <EditableText content={ content["impressum-title"] } onSave={this.saveHandler('impressum-title')} />
            </header>
            <div>
              <EditableParagraph content={ content["impressum-body"] } onSave={this.saveHandler('impressum-body')} />
            </div>
          </Section>
        </main>

      </Layout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Impressum);

export const query = graphql`
  query {
    pages(id: {eq: "impressum"}) {
      id
      content
      title
      slug
    }
  }
`;


