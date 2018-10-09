import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {MessageModel} from "../message/message.model";
import Chip from '@material-ui/core/Chip';
import {AuthorModel} from "../author/author.model";

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  unread: {
    fontWeight: 'bold'
  },
  paragraph: {
    wordBreak: 'break-all'
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
        <Chip label={this.props.message.getDate(this.props.reader.locale) + ' - ' + this.props.message.author.toString()} />
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