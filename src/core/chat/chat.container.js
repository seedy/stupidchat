import React, { Component } from 'react';
import { connect } from 'react-redux';
import {compose} from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {AuthorModel} from "../author/author.model";
import {isRead, isSent, isTyping} from "../message/message.actions";
import Counter from './counter';
import Textbox from './textbox';
import {MessageModel} from "../message/message.model";

const styles = {
  content: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    height: '100%'
  },
  counterBlock: {
    display: 'flex'
  },
  mainBlock: {
    display: 'flex',
    flex: 1,
  },
  textBlock: {
    display: 'flex',

  }
};

class ChatContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.content}>
        <Counter className={classes.counterBlock}
           unread={this.props.unread}
           author={this.props.author}
        />
        <div className={classes.mainBlock}>{this.props.children}</div>
        <Textbox className={classes.textBlock} typing={this.props.typing} focus={() => this.props.onRead()} type={(text) => this.props.onType(text)} send={(message) => this.props.onSend(message)}/>
      </div>
    )
  }
}
ChatContainer.propTypes = {
  author: PropTypes.instanceOf(AuthorModel),
  unread: PropTypes.arrayOf(PropTypes.number),
  typing: PropTypes.string,
  onRead: PropTypes.func.isRequired,
  onType: PropTypes.func.isRequired,
  onSend: PropTypes.func.isRequired
};


const mapStateToProps = (state, props) => {
  return {
    unread: props.author ? state['unread' + props.author.id] : [],
    typing: props.author ? state['typing' + props.author.id] : ''
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onRead: () => dispatch(isRead(props.author)),
    onType: (text) => dispatch(isTyping(props.author, text)),
    onSend: (message) => dispatch(isSent(new MessageModel(message, props.author)))
  };
};

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhance(ChatContainer);