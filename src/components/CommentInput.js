import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CommentInput extends Component {
  static propTypes = {
    username: PropTypes.string,
    onSubmit: PropTypes.func,
    onUsernameInputBlur: PropTypes.func
  }

  static defaultProps = {
    username: ''
  }

  constructor(props) {
    super(props);
    this.state = {
      username: props.username,
      content: ''
    };
  }

  componentDidMount() {
    this.textarea.focus();
  }

  handleUsernameChange(event) {
    this.setState({
      username: event.target.value
    });
  }

  handleUsernameBlur(event) {
    if(this.props.onUsernameInputBlur) {
      this.props.onUsernameInputBlur(event.target.value);
    }
  }

  handleContentChange(event) {
    this.setState({
      content: event.target.value
    });
  }

  handleSubmit() {
    if(this.props.onSubmit) {
      const { username, content } = this.state;
      this.props.onSubmit({ 
        username, 
        content,
        createdTime: +new Date()
      });
    }
    this.setState({
      content: ''
    });
  }

  render() {
    return (
      <div className="comment-input">
        <div className="comment-field">
          <span className="comment-field-name">Name: </span>
          <div className="comment-field-input">
            <input 
              value={this.state.username} 
              onBlur={this.handleUsernameBlur.bind(this)}
              onChange={this.handleUsernameChange.bind(this)} />
          </div>
        </div>
        <div className="comment-field">
          <span className="comment-field-name">Comment: </span>
          <div className="comment-field-input">
            <textarea 
            ref={textarea => this.textarea = textarea}
            value={this.state.content} 
            onChange={this.handleContentChange.bind(this)} />
          </div>
        </div>
        <div className="comment-field-button">
          <button onClick={this.handleSubmit.bind(this)}>Submit</button>
        </div>
      </div>
    );
  }
}

export default CommentInput;