import React, { Component } from 'react';
import CommentInput from './CommentInput';
import CommentList from './CommentList';

class CommentApp extends Component {
  constructor() {
    super();
    this.state = {
      comments: []
    };
  }

  componentDidMount() {
    this._loadComments();
  }

  handleSubmit(comment) {
    if(!comment) return;
    if(!comment.username) return alert('please input user name');
    if(!comment.content) return alert('please input content');
    const comments = this.state.comments;
    comments.push(comment);
    this.setState({
      comments
    });
    this._saveComments(comments);
  }

  _saveComments(comments) {
    localStorage.setItem('comments', JSON.stringify(comments));
  }

  _loadComments() {
    let comments = localStorage.getItem('comments');
    if(comments) {
      comments = JSON.parse(comments);
      this.setState({
        comments
      });
    }
  }

  handleDeleteComment(index) {
    const comments = this.state.comments;
    comments.splice(index, 1);
    this.setState({ comments });  //update UI
    this._saveComments(comments); //data persistence
  }

  render() {
    return (
      <div className="wrapper">
        <CommentInput onSubmit={this.handleSubmit.bind(this)} />
        <CommentList comments={this.state.comments} onDeleteComment={this.handleDeleteComment.bind(this)} />
      </div>
    );
  }
}

export default CommentApp;