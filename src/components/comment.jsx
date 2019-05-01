import React, { Component } from 'react';

class Comment extends Component {
    state = { 
        // showCommentsEditButtons: false
        showEditCommentForm: false,
        valueCommentText: ""
     }


//      "id": "171",
//   "posterId": 50,
//   "body": "moja musica",
//   "title": "naslov"

     handleCommentChange = (event) => {
      event.preventDefault();
      this.setState({valueCommentText: event.target.value});
      console.log(event.target.value, "Target");
     }

     showCommentModal = () => {
        this.setState({showEditCommentForm: true}); 
     }

     editOneComment = (posterId, commentId, commentBody, articleId) => {
        console.log(posterId, commentId, commentBody, articleId ,"EDIT one COMMENT Function");

        console.log(this.props.Requests + 'article/' + articleId + '/comment');

        let data = {
            "id": commentId,
            "posterId": posterId,
            "body": commentBody,
            "title": "Title"
        }

        let options = {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")          
            }
        }

        fetch(this.props.Requests + 'article/' + articleId + '/comment', options)
        .then((response) => console.log(response))
        .catch((error) => console.log(error));

        this.setState({showEditCommentForm: false});

    }

    cancelEditComment = () => {
        this.setState({showEditCommentForm: false});
    }

    render() { 
        //console.log(this.props.commentPosterId, "is right poster Id");
        //console.log(Number(localStorage.getItem("id"), "value in "));
        console.log(this.props.articleComments, "JUST SHOW ALL of them");

        // let tempy = this.props.articleComments.filter(ac => ac.id === 177)
        // console.log("tempy is this:", tempy[0].body);
        // console.log((this.props.articleComments.filter(ac => ac.id === 177))[0].body);
        
        return (
        <div className="comment_container" id = {this.props.commentId}>
            <div className="comment_poster_name">{this.props.commentPosterFirstName + " " + this.props.commentPosterLastName + " " + this.props.commentPosterId}</div>
            <div ref="commentBody" className="comment_body">{this.props.commentBody}</div>
            {
                (this.props.showCommentsEditButtons && this.props.commentPosterId ===  Number(localStorage.getItem("id"))) ?
                (<div className="comment_edit_buttons">
                    <button className="btn btn-info comment_edit_comment" onClick={() => this.showCommentModal()}
>                        Edit Comment
                        </button> 


                    <button className="btn btn-danger comment_delete_comment" onClick={() => this.props.deleteOneComment(this.props.id, this.props.commentId)}>Delete Comment</button>
                    {(this.state.showEditCommentForm) ? 
                    (<div className="comment_modal">Edit your comment
                        <textarea className="comment_edit_comment_textarea" onChange={this.handleCommentChange} defaultValue={(this.props.articleComments.filter(ac => ac.id === this.props.commentId))[0].body}></textarea>
                        <div className="comment_edit_buttons_wrapper">
                            <button className="btn btn-info comment_confirm_edit_comment" onClick=
                            {
                                () => this.editOneComment(
                                
                                    localStorage.getItem('id'), 
                                    this.props.commentId,
                                    this.state.valueCommentText, 
                                    this.props.id
                                )
                            }>
                                Confirm Edit
                            </button>
                            <button className="btn btn-danger comment_cancel_edit_comment" onClick={() => this.cancelEditComment()}>Cancel Edit</button>
                        </div>
                    </div>) : null}
                </div>) : null
            }
        </div>
        );
    }
}
 
export default Comment;