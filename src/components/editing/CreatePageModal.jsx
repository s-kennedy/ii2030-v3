import React from "react";
import slugify from "slugify";

import { connect } from "react-redux";
import { toggleNewPageModal, createTrack } from "../../redux/actions";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import defaultContentJSON from "../../fixtures/trackContent.json";

const mapStateToProps = state => {
  return {
    showNewPageModal: state.adminTools.showNewPageModal,
    pages: state.pages.pages,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleNewPageModal: () => {
      dispatch(toggleNewPageModal());
    },
    createTrack: trackData => {
      dispatch(createTrack(trackData));
    }
  };
};

const emptyPage = {
  title: "",
  tech: "",
  order: 0,
  year: 2021,
}

class CreatePageModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: this.props.page,
      errors: {},
    };
    this.updatePage = (field, value) => {
      this._updatePage(field, value);
    };
    this.onSubmit = () => {
      this._onSubmit();
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.options !== this.props.options) {
      this.setState({ page: this.props.options.new ? emptyPage : {
        ...this.props.page
      } })
    }
  }

  _updatePage(field, value) {
    this.setState({
      page: {
        ...this.state.page,
        [field]: value
      }
    });
  }

  isUniqueSlug = slug => {
    return !Boolean(this.props.pages[slug])
  }

  _onSubmit() {
    if (!this.state.page.title) {
      return this.setState({
        errors: {
          ...this.state.errors,
          title: "The page must have a title"
        }
      })
    }

    const pageId = slugify(this.state.page.title, {
      lower: true,
      remove: /[$*_+~.,()'"!\-:@%^&?=]/g
    })

    if (!this.isUniqueSlug(pageId)) {
      return this.setState({
        errors: {
          ...this.state.errors,
          title: "The page title must be unique."
        }
      })
    }

    let templateFile = 'track.js'
    if (this.state.page.year === 2021) {
      templateFile = 'track-2021.js'
    }

    const trackData = {
      title: this.state.page.title,
      tech: this.state.page.tech,
      slug: `/tracks/${this.state.page.year}/${pageId}`,
      year: this.state.page.year,
      page_type: "track",
      template: templateFile,
      navigation: {
        order: parseInt(this.state.page.order),
        displayTitle: this.state.page.title,
      },
      content: defaultContentJSON
    };
    this.props.createTrack(trackData);
  }

  render() {
    const open = Boolean(this.props.showNewPageModal);

    return (
      <Dialog open={open} aria-labelledby="create-page-dialogue">
        <DialogTitle id="create-page-dialogue">Add new track</DialogTitle>

        <DialogContent>
          <FormControl fullWidth margin="normal">
            <TextField
              className="form-control"
              type="text"
              label={"Track title"}
              value={this.state.page.title}
              onChange={e => this.updatePage("title", e.target.value)}
              required
              error={Boolean(this.state.errors.title)}
              helperText={this.state.errors.title}
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <TextField
              className="form-control"
              type="text"
              label={"Track technology"}
              value={this.state.page.tech}
              onChange={e => this.updatePage("tech", e.target.value)}
              error={Boolean(this.state.errors.tech)}
              helperText={this.state.errors.tech}
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <Select
              value={this.state.page.year}
              onChange={e => this.updatePage("year", e.target.value)}
              input={<Input name="year" id="year" />}
              name="year"
              error={Boolean(this.state.errors.year)}
              helperText={this.state.errors.year}
            >
              <MenuItem value={2021}>2021</MenuItem>
              <MenuItem value={2020}>2020</MenuItem>
              <MenuItem value={2019}>2019</MenuItem>
              <MenuItem value={2017}>2017</MenuItem>
            </Select>
          </FormControl>

        </DialogContent>

        <DialogActions>
          <Button color="default" onClick={this.props.toggleNewPageModal}>
            Close
          </Button>
          <Button color="primary" onClick={this.onSubmit}>
            Create Track
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

CreatePageModal.defaultProps = {
  page: emptyPage
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePageModal);
