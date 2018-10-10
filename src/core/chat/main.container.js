import React, { Component } from 'react';
import { connect } from 'react-redux';
import {compose} from 'redux';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import ChatBar from './chatBar';
import ChatContainer from './chat.container';
import {AuthorModel} from "../author/author.model";
import {login} from "../author/author.actions";
import HistoryContainer from "./history.container";

const leftId = 1;
const rightId = 2;

const styles = {
  content: {
    padding: '20px'
  },
  fullPage: {
    height: 'calc(100vh - 64px)'
  }
};

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this._onInit(); // only here because data is not called from api
  }

  _onInit() {
    const leftCity = 'paris';
    const left = new AuthorModel(leftId, 'Jean', 'Poldeux', leftCity, AuthorModel.cityToLocale(leftCity));

    const rightCity = 'chicago';
    const right = new AuthorModel(rightId, 'Schwarz', 'Eneger', rightCity, AuthorModel.cityToLocale(rightCity));

    this.props.dispatch(login(left));
    this.props.dispatch(login(right));
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <header>
          <ChatBar left={this.props.left} right={this.props.right}/>
        </header>
        <Grid className={classes.fullPage} container>
          <Grid item xs={6} className={classes.content}>
            <ChatContainer author={this.props.left}>
              <HistoryContainer author={this.props.left}/>
            </ChatContainer>
          </Grid>
          <Grid item xs={6} className={classes.content}>
            <ChatContainer author={this.props.right}>
              <HistoryContainer author={this.props.right}/>
            </ChatContainer>
          </Grid>
        </Grid>
      </div>
    )
  }
}
MainContainer.propTypes = {
  left: PropTypes.instanceOf(AuthorModel),
  right: PropTypes.instanceOf(AuthorModel)
};

const mapStateToProps = (state) => {
  return {
    left: state.authorById[leftId],
    right: state.authorById[rightId]
  }
};

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps)
);

export default enhance(MainContainer);