import React, { Component } from 'react';
import Comment from './comment'; 

class Comments extends Component {
    state = {  }
    render() { 


        console.log(this.props.articleComments, this.props.commentIsLoaded ,"at Comments Module");
//      setTimeout(() => {this.props.articleComments.map(ac => (<Comment>{ac.title}</Comment>),2000);
        return (
            this.props.commentIsLoaded ? (
            <div className="all_article_comments">
                {this.props.articleComments.map(articleComments => 
                    <Comment
                        key = {articleComments.id}
                        articleComments = {this.props.articleComments}
                        commentPosterFirstName = {articleComments.posterFirstName}
                        commentPosterLastName = {articleComments.posterLastName}
                        commentPosterId = {articleComments.posterId}
                        commentBody = {articleComments.body}
                        showCommentsEditButtons = {this.props.showCommentsEditButtons}
                        commentId = {articleComments.id}
                        editOneComment = {this.props.editOneComment}
                        deleteOneComment = {this.props.deleteOneComment}
                        id = {this.props.id}
                        showEditCommentForm = {this.props.showEditCommentForm}
                        Requests = {this.props.Requests}

                    >
                    </Comment>
                )}
            </div>): null
        )
    }
}
 
export default Comments;