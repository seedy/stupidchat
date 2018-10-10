import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '21px'
  },
  textField: {
    display: 'flex',
    flex: 1
  }
};

export class TextBox extends Component {

  constructor(props) {
    super(props);
  }

  _onType(event) {
    this.props.type(event.target.value);
  }

  _onSend() {
    if (this.props.typing.length > 0) {
      this.props.send(this.props.typing);
    }
  }

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.container}>
        <TextField
          id="textbox-multiline"
          label="Type your message here!"
          multiline
          rows="4"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          value={this.props.typing}
          onFocus={() => this.props.focus()}
          onChange={(e) => this._onType(e)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => this._onSend()} color="secondary" aria-label="Send message">
                  <Icon>send</Icon>
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
    );
  }
}

TextBox.propTypes = {
  typing: PropTypes.string,
  type: PropTypes.func.isRequired,
  send: PropTypes.func.isRequired,
  focus: PropTypes.func.isRequired
};

export default withStyles(styles)(TextBox);