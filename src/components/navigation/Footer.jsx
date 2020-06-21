import React from "react";
import { Link, StaticQuery, graphql } from "gatsby";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

const Footer = props => {

  return (
    <footer>
      <Container maxWidth="lg">
      <Grid container>
        <Grid item xs={12} md={6}>
          <p className="column-header">ii2030</p>
          <p className="contact">For more information:</p>
          <p className="contact">Email: <a href="mailto:ii2030@endeva.org">ii2030@endeva.org</a></p>
          <p className="contact">LinkedIn: <a href="https://www.linkedin.com/company/endeva/">Endeva</a></p>
        </Grid>
        <Grid item xs={12} md={6}>
          <p className="column-header">Site map</p>
          <Grid container>

            <Grid item xs={12} md={4}>
              <p>Overview</p>
              <ul>
                <li><Link to={"/#overview"}>ii2030 Overview</Link></li>
                <li><Link to={"/#timeline"}>Timeline</Link></li>
                <li><Link to={"/#tracks"}>Tracks</Link></li>
                <li><Link to={"/#agenda"}>Program</Link></li>
                <li><Link to={"/#cocreation_process"}>Process</Link></li>
                <li><Link to={"/#partners"}>Partners</Link></li>
              </ul>
            </Grid>

            <Grid item xs={12} md={4}>
              <ul>
                <li><Link to={"/faqs"}>FAQs</Link></li>
                <li><Link to={"/impressum"}>Impressum</Link></li>
              </ul>
            </Grid>

          </Grid>
        </Grid>
      </Grid>
      </Container>
    </footer>
  );
};

export default () => (
  <StaticQuery
    query={graphql`
      query {
        allPages {
          edges {
            node {
              id
              title
              slug
            }
          }
        }
        allTracks(filter: { year: { eq: 2019 } }) {
          edges {
            node {
              id
              title
              slug
              tech
              navigation {
                order
                displayTitle
              }
            }
          }
        }
      }
    `}
    render={data => (
      <Footer data={data} />
    )}
  />
)

