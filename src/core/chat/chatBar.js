import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import {AuthorIcon} from "../author/authorIcon";
import {AuthorModel} from "../author/author.model";

const styles = {
  root: {
    flexGrow: 1,
  },
  spacedBar: {
    display: 'flex',
    justifyContent: 'space-between',
  }
};

class ChatBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar className={classes.spacedBar}>
            <AuthorIcon author={this.props.left}/>
            <AuthorIcon author={this.props.right}/>
          </Toolbar>
        </AppBar>
      </div>
    );
  }

}

ChatBar.propTypes = {
  left: PropTypes.instanceOf(AuthorModel),
  right: PropTypes.instanceOf(AuthorModel)
};

export default withStyles(styles)(ChatBar);