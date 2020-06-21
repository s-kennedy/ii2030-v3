import React from "react";
import Grid from "@material-ui/core/Grid";
import Slider from "react-slick";
import { map } from 'lodash';

import { EditableImageUpload, EditableText, EditableParagraph } from "react-easy-editables"

const OverviewSlides = ({ slides, onSave }) => {
  const onSavePassthrough = (index, fieldId) => content => {
    const newSlides = [...slides]
    newSlides[index][fieldId] = content
    onSave(newSlides)
  }

  const collection = slides || [];

  return (
    <Slider>
      {map(collection, (slide, i) => {
        return (
          <div className="slide" key={`overview-slide-${i}`}>
            <Grid container>
              <Grid item xs={12} md={6} className="vert-center horiz-center">
                <div className="image oversize">
                  <EditableImageUpload
                    content={slide["image"]}
                    onSave={onSavePassthrough(i, "image")}
                  />
                </div>
              </Grid>
              <Grid item xs={12} md={6} className="vert-center">
                <div className="text horiz-spacing vert-spacing-lg">
                  <EditableText
                    content={slide["heading"]}
                    onSave={onSavePassthrough(i, "heading")}
                  />
                  <EditableParagraph
                    content={slide["description"]}
                    onSave={onSavePassthrough(i, "description")}
                  />
                </div>
              </Grid>
            </Grid>
          </div>
        );
      })}
    </Slider>
  );
};

export default OverviewSlides;
