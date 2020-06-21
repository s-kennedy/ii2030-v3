import React from 'react';
import Slider from 'react-slick'
import Grid from "@material-ui/core/Grid"
import { map } from 'lodash';

import Image from "../editables/Image";
import Title from "../editables/Title";
import Paragraph from "../editables/Paragraph";

export default class TimelineSlider extends React.Component {
  state = {
    slideIndex: 0
  }

  goToSlide = slideIndex => {
    this.slider.slickGoTo(slideIndex)
    this.setState({ slideIndex })
  }


  render() {
    const settings = {
      dots: true,
      infinite: true,
      arrows: false,
      swipe: true,
    }

    const onSavePassthrough = (index, fieldId) => content => {
      const newSlides = [...this.props.slides]
      newSlides[index][fieldId] = content
      this.props.onSave(newSlides)
    }

    const slides = this.props.slides || [];

    return(
      <div className="tour-stops-container">
        <Grid container justify="center" spacing={24}>
          {
            map(slides, (slide, i) => {
              return(
                <Grid item xs={12} md={4} key={`timeline-slide-${i}`}>
                  <div className="content-container">
                    { slide["image"] &&
                      <div className="image">
                        <Image content={ slide["image"] } onSave={ onSavePassthrough(i, "image") } />
                      </div>
                    }
                    <Title content={ slide["heading"] } onSave={ onSavePassthrough(i, "heading") } />
                    <Paragraph content={ slide["description"] } onSave={ onSavePassthrough(i, "description") } />
                  </div>
                </Grid>
              )
            })
          }
        </Grid>
      </div>
    )
  }
}