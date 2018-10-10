import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import Icon from '@material-ui/core/Icon';
import {AuthorModel} from "../author/author.model";
import AuthorAvatar from "../author/authorAvatar";

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontWeight: 'bold',
    padding: '5px'
  },
  badge: {
    marginRight: '12px'
  },
};

export class Counter extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.container}>
        <AuthorAvatar className={classes.avatar} author={this.props.author}/>
        <span className={classes.title}>
          {this.props.author.toString()}
        </span>
        <Badge className={classes.badge} badgeContent={this.props.unread.length} color="secondary">
          <Icon>email</Icon>
        </Badge>
      </div>
    );
  }
}

Counter.propTypes = {
  unread: PropTypes.arrayOf(PropTypes.number),
  author: PropTypes.oneOfType([PropTypes.instanceOf(AuthorModel), PropTypes.string])
};
Counter.defaultProps = {
  author: ''
};

export default withStyles(styles)(Counter);