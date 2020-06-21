import React from 'react';
import Slider from 'react-slick'
import Grid from "@material-ui/core/Grid"

import Title from "../editables/Title";
import Paragraph from "../editables/Paragraph";
import PlainText from "../editables/PlainText";

import headIcon from "../../assets/images/head-icon-standardized.png"
import tourIcon from "../../assets/images/tour-icon-standardized.png"
import tourIconLabelled from "../../assets/images/tour-icon-standardized-labelled.png"
import factoryIcon from "../../assets/images/factory-icon-standardized.png"
import factoryIconLabelled from "../../assets/images/factory-icon-standardized-labelled.png"
import factory from "../../assets/images/factory-icon.png"
import tour from "../../assets/images/tour-icon.png"

export default class ProgramSlider extends React.Component {
  state = {
    slideIndex: 0
  }

  goToSlide = slideIndex => {
    this.slider.slickGoTo(slideIndex)
    this.setState({ slideIndex })
  }

  render() {
    const sliderSettings = {
      arrows: false,
      infinite: false,
      draggable: false,
    }

    return(
      <div>
        <div className="day-selector">
          <button data-day="day-1" className={`btn btn-day1 white day-1 ${(this.state.slideIndex === 0) && 'active'}`} onClick={() => this.goToSlide(0)}>
            <img src={tour} alt="" />Day 1: Tour
          </button>
          <button data-day="day-2" className={`btn btn-day2 white day-2 ${(this.state.slideIndex === 1) && 'active'}`} onClick={() => this.goToSlide(1)}>
            Day 2: Factory<img src={factory} alt="" />
          </button>
        </div>

        <Slider { ...sliderSettings } ref={slider => (this.slider = slider)}>

          <div className="tour-agenda vert-spacing">
            <Grid container>
              <Grid item xs={12} md={6}>
                <div className="image oversize">
                  <img src={headIcon} alt="Robot head" className="pure-img robot-head" />
                  <img src={tourIconLabelled} alt="Robot body" className="pure-img animate-move-right active robot-body" />
                  <img src={factoryIcon} alt="Robot feet" className="pure-img animate-move-right robot-feet" />
                </div>
              </Grid>
              <Grid item xs={12} md={6} className="agenda-item vert-center">
                <div className="text vert-spacing horiz-spacing">
                  <div className="text">
                    <div className="vert-spacing">
                      <Title level="h3" content={ this.props.content["agenda-tour-title"] } onSave={this.props.saveHandler("agenda-tour-title")} />
                      <small className="agenda-date bold">
                        <PlainText content={ this.props.content["agenda-tour-dates"] } onSave={this.props.saveHandler("agenda-tour-dates")} />
                      </small>
                      <div className="vert-spacing">
                        <Paragraph content={ this.props.content["agenda-tour-description"] } onSave={this.props.saveHandler("agenda-tour-description")} />
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>

          <div className="factory-agenda">
             <Grid container>
              <Grid item xs={12} md={6}>
                <div className="image oversize">
                  <img src={headIcon} alt="Robot head" className="pure-img" />
                  <img src={tourIcon} alt="Robot body" className="pure-img animate-move-right" />
                  <img src={factoryIconLabelled} alt="Robot feet" className="pure-img animate-move-right active" />
                </div>
              </Grid>
              <Grid item xs={12} md={6} className="agenda-item vert-center">
                <div className="text vert-spacing horiz-spacing">
                  <div className="text">
                    <div className="vert-spacing">
                      <Title level="h3" content={ this.props.content["agenda-factory-title"] } onSave={this.props.saveHandler("agenda-factory-title")} />
                      <small className="agenda-date bold">
                        <PlainText content={ this.props.content["agenda-factory-dates"] } onSave={this.props.saveHandler("agenda-factory-dates")} />
                      </small>
                      <div className="vert-spacing">
                        <Paragraph content={ this.props.content["agenda-factory-description"] }  onSave={this.props.saveHandler("agenda-factory-description")} />
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>

          </div>
        </Slider>
      </div>
    )
  }
}