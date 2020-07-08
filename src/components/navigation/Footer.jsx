import React from "react";
import { Link, StaticQuery, graphql } from "gatsby";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

const Footer = props => {
  const tracks = props.data.allTracks.edges.map(t => t.node)

  return (
    <footer className="pt-20 pb-20">
      <Container maxWidth={"lg"}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={5}>
            <p className="column-header">ii2030</p>
            <p className="contact">For more information:</p>
            <p className="contact">Email: <a href="mailto:ii2030@endeva.org">ii2030@endeva.org</a></p>
          </Grid>
          <Grid item xs={12} md={7}>
            <Grid container spacing={2}>

              <Grid item xs={12} md={4}>
                <p className="column-header">Pages</p>
                <ul>
                  <li><Link to={"/"}>ii2030 Home</Link></li>
                  <li><Link to={"/africa-for-the-future"}>#Africa4Future</Link></li>
                  <li><Link to={"/past-events"}>Past Editions</Link></li>
                  <li><Link to={"/faq"}>FAQ</Link></li>
                  <li><Link to={"/impressum"}>Impressum</Link></li>
                </ul>
              </Grid>

              <Grid item xs={12} md={4}>
                <p className="column-header">#Africa4Future Tracks</p>
                <ul>
                {
                  tracks.map(track => <li key={track.slug}><Link to={track.slug} className="titlecase">{track.tech}</Link></li>)
                }
                </ul>
              </Grid>

              <Grid item xs={12} md={4}>
                <Link to={"/apply"} className="btn blue mt-10">Apply now!</Link>
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
        allTracks(filter: { year: { eq: 2020 } }) {
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

