import React, { Component } from 'react';
import { connect } from 'react-redux';
import {compose} from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

import {MessageModel} from "../message/message.model";
import {AuthorModel} from "../author/author.model";
import Message from '../message/message';


import './history.container.css';
const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    border: '1px solid rgba(0, 0, 0, 0.23)'
  },
  content: {
    padding: '0 5px',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    maxHeight: '100%',
    minHeight: '100%',
    overflowY: 'auto'
  },
  bottomText: {
    alignSelf: 'flex-end',
    justifySelf: 'flex-end'
  }
};

class HistoryContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <div className={classes.content}>
          <TransitionGroup>
            {this.props.history.map((message) => {
              const isMsgUnread = this.props.unread.indexOf(message.id) !== -1;
              return (
                <CSSTransition key={message.id} classNames='slide' timeout={500}>
                  <Message className={classes.child} key={message.id} message={message} unread={isMsgUnread} reader={this.props.author}/>
                </CSSTransition>
              )
            })}
          </TransitionGroup>
        </div>
        {this.props.typing.length > 0 && <span className={classes.bottomText}>Someone else is typing...</span>}
      </div>
    )
  }
}
HistoryContainer.propTypes = {
  history: PropTypes.arrayOf(PropTypes.instanceOf(MessageModel)),
  unread: PropTypes.arrayOf(PropTypes.number),
  typing: PropTypes.string,
  author: PropTypes.instanceOf(AuthorModel)
};

HistoryContainer.defaultProps = {
  typing: ''
};

const isOtherTyping = (state, selfId) => {
  const otherId = Object.keys(state.authorById).filter((key) => parseInt(key, 10) !== selfId);
  return state['typing' + otherId];
};

const mapStateToProps = (state, props) => {
  return {
    history: state.history,
    unread: props.author ? state['unread' + props.author.id] : [],
    typing: props.author ? isOtherTyping(state, props.author.id) : ''
  };
};

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps)
);

export default enhance(HistoryContainer);