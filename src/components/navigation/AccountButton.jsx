import React from "react";
import { push, Link } from "gatsby";
import firebase, { stagingFirebase } from "../../firebase/init";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button"

import {
  userLoggedIn,
  userLoggedOut,
  toggleNewPageModal,
  deploy,
  toggleEditing,
  deployWithStagingContent
} from "../../redux/actions";

import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";

const styles = {
  container: {
    position: "fixed",
    left: "10px",
    bottom: "10px",
    zIndex: "1000",
  },
  iconLabel: {
    display: "flex",
    alignItems: "center"
  }
};

class AccountButton extends React.Component {
  state = {
    anchorEl: null
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const ref = firebase
          .app()
          .database()
          .ref(`users/${user.uid}`);
        ref.once("value").then(snapshot => {
          const userData = snapshot.val();
          if (userData) {
            this.props.userLoggedIn(userData);
          } else {
            const newUser = {
              uid: user.uid,
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL
            };
            ref.set(newUser);
            this.props.userLoggedIn(newUser);
          }
        });
      } else {
        this.props.userLoggedOut();
      }
    });
  }

  logout = e => {
    firebase.auth().signOut();
    this.props.userLoggedOut();
    push("/");
  };

  login = e => {
    this.props.onToggleRegistrationModal();
  };

  openMenu = e => {
    this.setState({ anchorEl: e.currentTarget });
  };

  closeMenu = e => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { props, openMenu, closeMenu, logout } = this;
    const { anchorEl } = this.state;

    if (props.isLoggedIn) {
      const accountName = props.user.displayName
        ? props.user.displayName
        : "Account";
      const toggleText = props.isEditingPage ? "Done editing" : "Edit page";
      return (
        <div style={styles.container}>
          <Button
            variant="contained"
            onClick={openMenu}
            aria-owns={anchorEl ? "account-menu" : null}
            aria-haspopup="true"
          >
            <span style={styles.iconLabel}>
              {accountName}
              <ArrowDropDown style={{ height: "14px" }} />
            </span>
          </Button>
          <Menu
            id="account-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={closeMenu}
          >
            {props.allowEditing && (
              <MenuItem
                onClick={() => {
                  props.onToggleEditing();
                  closeMenu();
                }}
              >
                <ListItemText>{toggleText}</ListItemText>
              </MenuItem>
            )}

            {props.allowEditing && (
              <MenuItem
                onClick={() => {
                  props.onToggleNewPageModal({ new: true });
                  closeMenu();
                }}
              >
                <ListItemText>Add new track</ListItemText>
              </MenuItem>
            )}

            {props.allowEditing && (
              <MenuItem
                onClick={() => {
                  closeMenu();
                }}
                component={Link}
                to={'/admin'}
              >
                <ListItemText>Website configuration</ListItemText>
              </MenuItem>
            )}

            {props.allowEditing && (
              <MenuItem
                onClick={() => {
                  props.deploy();
                  closeMenu();
                }}
              >
                <ListItemText>Publish changes</ListItemText>
              </MenuItem>
            )}

            {props.allowEditing && stagingFirebase && (
              <MenuItem
                divider
                disabled={process.env.GATSBY_FIREBASE_ENVIRONMENT !== 'production'}
                onClick={() => {
                  props.deployWithStagingContent();
                  closeMenu();
                }}
              >
                <ListItemText>Publish from staging</ListItemText>
              </MenuItem>
            )}

            <MenuItem
              onClick={() => {
                logout();
                closeMenu();
              }}
              divider
            >
              <ListItemText>Log out</ListItemText>
            </MenuItem>
          </Menu>
        </div>
      );
    }

    return null
  }
}

const mapStateToProps = state => {
  const allowEditing = state.adminTools.user && state.adminTools.user.isEditor;
  const allowDuplicate = state.page.data && state.page.data.template;

  return {
    isLoggedIn: state.adminTools.isLoggedIn,
    user: state.adminTools.user,
    isEditingPage: state.adminTools.isEditingPage,
    allowEditing: allowEditing,
    allowDuplicate: allowDuplicate,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userLoggedIn: user => {
      dispatch(userLoggedIn(user));
    },
    userLoggedOut: () => {
      dispatch(userLoggedOut());
    },
    onToggleNewPageModal: (options={}) => {
      dispatch(toggleNewPageModal(options));
    },
    onToggleEditing: () => {
      dispatch(toggleEditing());
    },
    deploy: () => {
      dispatch(deploy());
    },
    deployWithStagingContent: () => {
      dispatch(deployWithStagingContent());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountButton);
