import React,  { Component } from 'react';
import PropTypes from 'prop-types';

class Comment extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired,
    onDeleteComment: PropTypes.func,
    index: PropTypes.number
  }

  constructor() {
    super();
    this.state = {
      timeString: ''
    };
  }

  componentDidMount() {
    this._updateTimeString();
    this._timer = setInterval(
      this._updateTimeString.bind(this), 
      600000
    );
  }

  componentWillUnmount() {
    clearInterval(this._timer);
  }

  _updateTimeString() {
    const createdTime = this.props.comment.createdTime;
    const duration = (+Date.now() - createdTime) / 1000;
    this.setState({
      timeString: duration > 60
        ? `${Math.round(duration / 60)} minutes ago`
        : `${Math.round(Math.max(duration, 1))}  seconds ago`
    });
  }

  handleDeletComment() {
    if(this.props.onDeleteComment) {
      this.props.onDeleteComment(this.props.index);
    }
  }

  //escape and anti-XSS attack
  _getProcessedContent(content) {
    return content
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
      .replace(/`([\S\s]+?)`/g, '<code>$1</code>');
  }

  render() {
    return (
      <div className="comment">
        <div className="comment-user">
          <span className="comment-username">{ this.props.comment.username }</span>: 
        </div>
        <p dangerouslySetInnerHTML={{
          __html: this._getProcessedContent(this.props.comment.content)
        }} />
        <span className="comment-createdtime">{ this.state.timeString }</span>
        <span className='comment-delete' onClick={this.handleDeletComment.bind(this)}>Delete</span>
      </div>
    );
  }
}

export default Comment;