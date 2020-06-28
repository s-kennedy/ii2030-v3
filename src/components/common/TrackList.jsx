import React from "react";
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"

import TrackItem from "./TrackItem"


class TrackList extends React.Component {
  onSaveItem = itemId => itemContent => {
    const newContent = {
      ...this.props.content,
      [itemId]: itemContent
    }

    this.props.onSave(newContent)
  }

  onDeleteItem = itemId => () => {
    this.props.onDeleteItem(itemId)
  }

  onAddItem = () => {
    const content = {
      "track-item-image": { "imageSrc": "" },
      "track-item-title": { "text": "Title" },
      "track-item-description": { "text": "Description" },
      "track-item-link": { "link": "/", "anchor": "Learn more" },
    }
    this.props.onAddItem(content)
  }

  render() {
    const itemsKeys = Object.keys(this.props.content);

    return (
      <Grid container spacing={4} className={`collection ${this.props.classes}`}>
          {itemsKeys.map((key,index) => {
            const content = this.props.content[key];
            return(
              <Grid item xs={12} md={4} key={`track-item-${key}`} className="track-item">
                <TrackItem
                  index={index}
                  content={content}
                  onSave={this.onSaveItem(key)}
                  onDelete={this.onDeleteItem(key)}
                />
              </Grid>
            )
          })}
        {
          this.props.isEditingPage &&
          <Grid item xs={12} md={4}>
            <Button onClick={this.onAddItem}>Add item</Button>
          </Grid>
        }
      </Grid>
    );
  }
}

TrackList.defaultProps = {
  content: {},
  classes: "",
  onSave: () => { console.log('Implement a function to save changes') }
}

export default TrackList

