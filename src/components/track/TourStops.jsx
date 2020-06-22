import React from 'react';
import Slider from 'react-slick'

import { EditableText, EditableParagraph, EditableImageUpload } from "react-easy-editables"

export default class TourStops extends React.Component {
  state = {
    slideIndex: 0
  }

  goToSlide = slideIndex => {
    this.slider.slickGoTo(slideIndex)
    this.setState({ slideIndex })
  }

  onSavePassthrough = (index, fieldId) => content => {
    const newSlides = [...this.props.slides]
    newSlides[index][fieldId] = content
    this.props.onSave(newSlides)
  }

  render() {
    const sliderSettings = {
      dots: true,
      infinite: true,
      arrows: false,
      swipe: true
    }

    return(
      <div className="tour-stops-container">
        <Slider {...sliderSettings} infinite={false} ref={slider => (this.slider = slider)}>
          {
            this.props.slides.map((slide, i) => {
              return(
                <div className="slide" key={`tour-stop-${i}`}>
                  <div className="content-container pure-g centered">
                    <div className="pure-u-1">

                      <div className="image">
                        <EditableImageUpload content={ slide["image"] } onSave={this.onSavePassthrough(i, "image")} />
                      </div>
                      <h3>
                        <EditableText content={ slide["organization"] } onSave={this.onSavePassthrough(i, "organization")} />
                      </h3>
                      <EditableParagraph content={ slide["description"] } onSave={this.onSavePassthrough(i, "description")} />

                    </div>
                  </div>
                </div>
              )
            })
          }
        </Slider>
      </div>
    )
  }
}