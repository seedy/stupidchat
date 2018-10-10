import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import red from '@material-ui/core/colors/red';
import {AuthorModel} from "./author.model";


const styles = {
  avatar: {
    height: '30px',
    width: '30px',
    backgroundColor: red[500],
    margin: '5px'
  }
};

class AuthorAvatar extends Component {
  constructor(props) {
    super(props)
  }


  render() {
    const {classes} = this.props;
    return (
      <Avatar aria-label={this.props.author.toString()} className={classes.avatar}>
        {this.props.author !== '' ? this.props.author.getInitial() : ''}
      </Avatar>
    )
  }
}

AuthorAvatar.propTypes = {
  author: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(AuthorModel)])
};
AuthorAvatar.defaultProps = {
  author: ''
};
export default withStyles(styles)(AuthorAvatar);