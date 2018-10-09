import React, {Component} from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import {AuthorModel} from "./author.model";

export class AuthorIcon extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Tooltip title={this.props.author.toString()}>
        <IconButton
          aria-label={this.props.author.toString()}
          color="inherit"
        >
          <Icon>account_circle</Icon>
        </IconButton>
      </Tooltip>
    )
  }
}

AuthorIcon.propTypes = {
  author: PropTypes.oneOfType([PropTypes.instanceOf(AuthorModel), PropTypes.string])
};
AuthorIcon.defaultProps = {
  author: ''
};
