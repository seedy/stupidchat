import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {MessageModel} from "../message/message.model";
import Chip from '@material-ui/core/Chip';
import {AuthorModel} from "../author/author.model";
import AuthorAvatar from "../author/authorAvatar";

const styles = {
  container: {
    display: 'flex',
    flexShrink: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  unread: {
    fontWeight: 'bold'
  },
  paragraph: {
    wordBreak: 'break-all',
    margin: '0 0 0 5px'
  }
};

export class Message extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.container}>
        <AuthorAvatar author={this.props.message.author}/>
        <Chip label={this.props.message.getDate(this.props.reader.locale)} />
        <p className={classes.paragraph + ' ' + (this.props.unread ? classes.unread : undefined)}>{this.props.message.text}</p>
      </div>
    );
  }


}

Message.propTypes = {
  message: PropTypes.instanceOf(MessageModel),
  unread: PropTypes.bool,
  reader: PropTypes.instanceOf(AuthorModel)
};

export default withStyles(styles)(Message);