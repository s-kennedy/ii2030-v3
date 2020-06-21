import React from "react";
import { Link } from "gatsby";
import Grid from "@material-ui/core/Grid";


class TrackCard extends React.Component {
  state = {
    active: false
  }

  toggleActive = () => {
    this.setState({ active: !this.state.active })
  }

  render() {
    const { track } = this.props;
    const trackData = track ? track.node : {};
    const content = trackData.content ? JSON.parse(trackData.content) : {};

    return(
      <Grid item xs={12} sm={6} md={3} onMouseEnter={this.toggleActive} onMouseLeave={this.toggleActive}>
        <div className={`track text-center ${this.state.active && 'active'}`}>
          <img src={ content["icon-small"] ? content["icon-small"]["imageSrc"] : "" } alt="" />
          <h4>{ trackData["title"] }</h4>
          <p>{ content["topic"]["text"] }</p>
          <Link to={ trackData["slug"] }><button className="btn white animate hide-unless-active">Learn more</button></Link>
        </div>
      </Grid>
    )
  }
}

export default TrackCard;
