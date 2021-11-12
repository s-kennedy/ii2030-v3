import React, { Fragment } from "react";
import { StaticQuery, graphql } from "gatsby"
import { Link } from "gatsby";
import { sortBy } from 'lodash';

import Button from "@material-ui/core/Button"
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import List from "@material-ui/core/List";
import Collapse from "@material-ui/core/Collapse";
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import MenuIcon from "@material-ui/icons/Menu";


const styles = {
  menuHeader: {
    fontFamily: 'Roboto Slab',
    fontWeight: 100,
  },
  menuItem: {
    fontWeight: 100,
    fontSize: '16px',
    paddingLeft: '40px',
    whiteSpace: 'normal',
  },
  currentMenuItem: {
    fontWeight: 100,
    fontSize: '16px',
    whiteSpace: 'normal',
  },
  grow: {
    flexGrow: 1,
  },
  menu: {
    backgroundColor: "#fff",
    color: "rgba(0, 0, 0, 0.87)",
    padding: "10px 20px",
    display: "flex",
    position: "fixed",
    width: "100%",
    borderBottom: "1px solid rgba(80, 143, 184, 0.2)",
    zIndex: "999",
    justifyContent: "space-between",
  },
  mobileMenu: { width: '95vw' }
}

class CurrentTracksDropdown extends React.Component {
  state = {
    anchorEl: null
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  orderTracks = tracks => {
    return sortBy(tracks, ['node.navigation.order', 'node.tech'])
  }

  render() {
    const { anchorEl } = this.state;
    const { tracks } = this.props;
    const open = Boolean(anchorEl);

    return(
      <Fragment>
        <button
          style={{ display: 'inline-flex', alignItems: 'center', background: 'none', border: 'none' }}
          className="link nav-link"
          aria-owns={open ? 'menu-appbar' : undefined}
          aria-haspopup="true"
          onClick={this.handleMenu}
          color="inherit"
        >
          <>
            { this.props.anchorText }
            { open ? <ExpandLessIcon style={{ marginLeft: '2px' }} /> : <ExpandMoreIcon style={{ marginLeft: '2px' }} />}
          </>
        </button>
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
          {tracks.map(track => <MenuItem onClick={this.handleClose} key={track.slug} component={Link} to={track.slug} style={styles.currentMenuItem}>{track.title}</MenuItem>)}
        </Menu>
      </Fragment>
    )
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

  orderTracks = tracks => {
    return sortBy(tracks, ['node.navigation.order', 'node.tech'])
  }

  render() {
    const { anchorEl } = this.state;
    const { tracks } = this.props;
    const open = Boolean(anchorEl);
    const tracks2017 = this.orderTracks(tracks.filter(t => t.year === 2017))
    const tracks2019 = this.orderTracks(tracks.filter(t => t.year === 2019))
    const tracks2020 = this.orderTracks(tracks.filter(t => t.year === 2020))
    const tracks2021 = this.orderTracks(tracks.filter(t => t.year === 2021))

    return(
      <Fragment>
        <button
          style={{ display: 'inline-flex', alignItems: 'center', background: 'none', border: 'none' }}
          className="link nav-link"
          aria-owns={open ? 'menu-appbar' : undefined}
          aria-haspopup="true"
          onClick={this.handleMenu}
          color="inherit"
        >
          <>
            { this.props.anchorText }
            { open ? <ExpandLessIcon style={{ marginLeft: '2px' }} /> : <ExpandMoreIcon style={{ marginLeft: '2px' }} />}
          </>
        </button>
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
          <MenuItem disabled={true} key={"2021-tracks"} style={styles.menuHeader}>2021 Tracks</MenuItem>
          {
            tracks2021 && tracks2021.map(track => <MenuItem onClick={this.handleClose} key={track.slug} component={Link} to={track.slug} style={styles.menuItem}>{track.title}</MenuItem>)
          }
          <MenuItem disabled={true} key={"2020-tracks"} style={styles.menuHeader}>2020 Tracks</MenuItem>
          {
            tracks2020 && tracks2020.map(track => <MenuItem onClick={this.handleClose} key={track.slug} component={Link} to={track.slug} style={styles.menuItem}>{track.title}</MenuItem>)
          }
          <MenuItem disabled={true} key={"2019-tracks"} style={styles.menuHeader}>2019 Tracks</MenuItem>
          {
            tracks2019 && tracks2019.map(track => <MenuItem onClick={this.handleClose} key={track.slug} component={Link} to={track.slug} style={styles.menuItem}>{track.title}</MenuItem>)
          }
          <MenuItem disabled={true} key={"2017-tracks"} style={styles.menuHeader}>2017 Tracks</MenuItem>
          {
            tracks2017 && tracks2017.map(track => <MenuItem onClick={this.handleClose} key={track.slug} component={Link} to={track.slug} style={styles.menuItem}>{track.title}</MenuItem>)
          }
        </Menu>
      </Fragment>
    )
  }
}


class Navigation extends React.Component {
  state = {
    anchorEl: null,
    openTracks: false,
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleOpenTracks = () => {
    this.setState({ openTracks: !this.state.openTracks })
  }

  orderTracks = tracks => {
    return sortBy(tracks, ['node.navigation.order', 'node.tech'])
  }

  render() {
    const tracks = this.props.data.allTracks.edges.map(t => t.node)
    const selected = this.props.location ? this.props.location.pathname : ""
    const { anchorEl, openTracks } = this.state;
    const open = Boolean(anchorEl);

    const tracks2017 = this.orderTracks(tracks.filter(t => t.year === 2017))
    const tracks2019 = this.orderTracks(tracks.filter(t => t.year === 2019))
    const tracks2020 = this.orderTracks(tracks.filter(t => t.year === 2020))
    const tracks2021 = this.orderTracks(tracks.filter(t => t.year === 2021))

    return (
      <div style={styles.menu} id="main-menu">
        <Hidden smDown>
          <Grid container justify="space-between" alignItems="center">
            <Grid item style={styles.grow}>
              <div className="menu-left">
                <Link to={'/'} className={`menu-heading ${selected === '/' ? 'selected' : ""}`}>ii2030</Link>
                <CurrentTracksDropdown anchorText={"Current Tracks"} tracks={tracks2021} />
                <Link to={'/past-events'} className={`${selected === '/past-events' ? 'selected' : ""}`}>Past Editions</Link>
                <TracksDropdown anchorText={"Tracks"} tracks={tracks} />
              </div>
            </Grid>
{/*            <Grid item>
              <Link to="/apply" className="btn red">Apply now!</Link>
            </Grid>*/}
          </Grid>
        </Hidden>

        <Hidden mdUp>
          <Grid container justify="space-between" alignItems="center">
            <Grid item style={styles.grow}>
              <Link to={'/'} className={`menu-heading ${selected === '/' ? 'selected' : ""}`}>ii2030</Link>
            </Grid>
            <Grid item>
              <Button
                aria-owns={open ? 'menu-appbar-mobile' : undefined}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                <>
                  menu
                  <MenuIcon style={{ marginLeft: '4px' }}/>
                </>
              </Button>
              <Menu
                id="menu-appbar-mobile"
                MenuListProps={{ style: {width: "100%", flexGrow: "1"} }}
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
                <MenuItem onClick={this.handleClose} component={Link} to={"/"}>Home</MenuItem>
                <MenuItem onClick={this.handleClose} component={Link} to={"/current-tracks"}>Current tracks</MenuItem>
                <MenuItem onClick={this.handleClose} component={Link} to={"/past-events"}>Past Editions</MenuItem>
                <MenuItem button onClick={this.handleOpenTracks} style={{ display: "flex", justifyContent: "space-between" }} className="link nav-link">
                  Tracks
                  {openTracks ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </MenuItem>
                <Collapse in={openTracks} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <MenuItem disabled={true} key={"2021-tracks"} style={styles.menuHeader}>2021 Tracks</MenuItem>
                    {
                      tracks2021 && tracks2021.map(track => <MenuItem onClick={this.handleClose} key={track.slug} component={Link} to={track.slug} style={styles.menuItem}>{track.title}</MenuItem>)
                    }
                    <MenuItem disabled={true} key={"2020-tracks"} style={styles.menuHeader}>2020 Tracks</MenuItem>
                    {
                      tracks2020 && tracks2020.map(track => <MenuItem onClick={this.handleClose} key={track.slug} component={Link} to={track.slug} style={styles.menuItem}>{track.title}</MenuItem>)
                    }
                    <MenuItem disabled={true} key={"2019-tracks"} style={styles.menuHeader}>2019 Tracks</MenuItem>
                    {
                      tracks2019 && tracks2019.map(track => <MenuItem onClick={this.handleClose} key={track.slug} component={Link} to={track.slug} style={styles.menuItem}>{track.title}</MenuItem>)
                    }
                    <MenuItem disabled={true} key={"2017-tracks"} style={styles.menuHeader}>2017 Tracks</MenuItem>
                    {
                      tracks2017 && tracks2017.map(track => <MenuItem onClick={this.handleClose} key={track.slug} component={Link} to={track.slug} style={styles.menuItem}>{track.title}</MenuItem>)
                    }
                  </List>
                </Collapse>
                <MenuItem onClick={this.handleClose} component={Link} to={"/faq"}>FAQ</MenuItem>
                <MenuItem onClick={this.handleClose} className="btn blue" component={Link} to={"/apply"}>Apply now!</MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </Hidden>
      </div>
    );
  }
}

export default (props) => (
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
      <Navigation {...props} data={data} />
    )}
  />
)

