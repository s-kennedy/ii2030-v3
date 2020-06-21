import React from 'react';
import Slider from 'react-slick'
import Title from "../../components/editables/Title";
import Paragraph from "../../components/editables/Paragraph";

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

    return(
      <div className="intro-slides-container">
        <Slider {...sliderSettings} infinite={false} ref={slider => (this.slider = slider)}>
          {
            this.questions.map((question) => {
              const slide = this.props.slides[question];
              if (!slide) return null;

              return(
                <div className="slide" key={`intro-slide-${question}`}>
                  <div className="text horiz-spacing">
                    <div className="headline vert-spacing">
                      <Title level="h2" content={slide["question"]} onSave={this.onSavePassthrough(question, "question")} />
                    </div>
                    <Paragraph content={slide["answer"]} onSave={this.onSavePassthrough(question, "answer")} />
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

