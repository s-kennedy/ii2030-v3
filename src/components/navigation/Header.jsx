import React from "react";
import { StaticQuery, graphql } from "gatsby"
import { Link } from "gatsby";
import { sortBy } from 'lodash';

import Button from "@material-ui/core/Button"
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Grid from '@material-ui/core/Grid';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";


const styles = {
  menuItem: {
    fontWeight: 100,
    fontSize: '16px',
  },
  grow: {
    flexGrow: 1,
  },
  menu: {
    backgroundColor: "#fff",
    color: "rgba(0, 0, 0, 0.87)",
    padding: "20px",
    display: "flex",
    position: "fixed",
    width: "100%",
    borderBottom: "1px solid rgba(80, 143, 184, 0.2)",
    zIndex: "99999",
    justifyContent: "space-between"
  }
}

class TracksDropdown extends React.Component {
  state = {
    anchorEl: null
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const orderedTracks = sortBy(this.props.tracks, ['node.navigation.order', 'node.tech'])
    return(
      <div>
        <Button
          aria-owns={open ? 'menu-appbar' : undefined}
          aria-haspopup="true"
          onClick={this.handleMenu}
          color="inherit"
        >
          <>
            { this.props.anchorText }
            <ExpandMoreIcon />
          </>
        </Button>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={open}
          onClose={this.handleClose}
        >
          {
            orderedTracks.map(track => <MenuItem onClick={this.handleClose} key={track.node.slug} component={Link} to={track.node.slug} style={styles.menuItem}>{track.node.title}</MenuItem>)
          }
        </Menu>
      </div>
    )
  }
}

class OverviewDropdown extends React.Component {
  state = {
    anchorEl: null
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return(
      <div>
        <Button
          aria-owns={open ? 'menu-appbar' : undefined}
          aria-haspopup="true"
          onClick={this.handleMenu}
          color="inherit"
        >
          <>
            Overview
            <ExpandMoreIcon />
          </>
        </Button>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={open}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose} style={styles.menuItem} component={Link} to={"/#overview"}>ii2030 Overview</MenuItem>
          <MenuItem onClick={this.handleClose} style={styles.menuItem} component={Link} to={"/#testimonials"}>Testimonials</MenuItem>
          <MenuItem onClick={this.handleClose} style={styles.menuItem} component={Link} to={"/#tracks"}>Tracks</MenuItem>
          <MenuItem onClick={this.handleClose} style={styles.menuItem} component={Link} to={"/#cocreation_process"}>Process</MenuItem>
          <MenuItem onClick={this.handleClose} style={styles.menuItem} component={Link} to={"/#agenda"}>Program</MenuItem>
          <MenuItem onClick={this.handleClose} style={styles.menuItem} component={Link} to={"/#partners"}>Partners</MenuItem>
        </Menu>
      </div>
    )
  }
}



class Navigation extends React.Component {

  render() {
    const tracks = this.props.data.allTracks.edges
    const tracks2017 = tracks.filter(track => track.node.year === 2017)
    const tracks2019 = tracks.filter(track => track.node.year === 2019)

    return (
      <div style={styles.menu} id="main-menu">
          <Grid container justify="space-between">
            <Grid item style={styles.grow}>
              <div className="menu-left">
                <Link to={'/'} className="menu-heading">ii2030</Link>
                <Link to={'/africa-for-the-future'} className="">#Africa4Future</Link>
                <Link to={'/past-events'} className="">past events</Link>
                <Link to={'/faqs'} className="">faq</Link>
              </div>
            </Grid>
            <Grid item>
              <Link to="/" className="btn blue">register now!</Link>
            </Grid>
          </Grid>
      </div>
    );
  }
}

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
        allTracks {
          edges {
            node {
              id
              title
              slug
              tech
              year
              navigation {
                order
              }
            }
          }
        }
      }
    `}
    render={data => (
      <Navigation data={data} />
    )}
  />
)

