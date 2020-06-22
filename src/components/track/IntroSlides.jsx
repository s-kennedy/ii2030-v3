import React from 'react';

import { EditableText, EditableParagraph } from "react-easy-editables"

export default class IntroSlides extends React.Component {
  state = {
    slideIndex: 0
  }

  questions = [ 'what', 'why', 'who', 'how' ]

  goToSlide = slideIndex => {
    this.slider.slickGoTo(slideIndex)
    this.setState({ slideIndex })
  }

  onSavePassthrough = (key, fieldId) => content => {
    const slides = {
      ...this.props.slides,
      [key]: {
        ...this.props.slides[key],
        [fieldId]: content
      }
    }

    this.props.onSave(slides)
  }

  render() {
    const sliderSettings = {
      dots: true,
      infinite: true,
      arrows: false,
      swipe: true
    }

    const questions = Object.keys(this.props.slides)

    return(
      <div className="intro-slides-container">
        <Slider {...sliderSettings} infinite={false} ref={slider => (this.slider = slider)}>
          {
            questions.map((question) => {
              const slide = this.props.slides[question];

              return(
                <div className="slide" key={`intro-slide-${question}`}>
                  <div className="text horiz-spacing">
                    <div className="headline vert-spacing">
                      <h2>
                        <EditableText content={slide["question"]} onSave={this.onSavePassthrough(question, "question")} />
                      </h2>
                    </div>
                    <EditableParagraph content={slide["answer"]} onSave={this.onSavePassthrough(question, "answer")} />
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

