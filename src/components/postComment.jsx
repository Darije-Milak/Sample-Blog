import React, { Component } from 'react';

class PostComment extends Component {
    state = { 
        
     }
    
    addNewComment = (body, posterId) => {
        console.log(body, posterId ," add New Comment function");
        
        let data = {
            posterId: posterId,
            body:body,
            title: "Naslov"
        }

        let options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }

        fetch(this.props.Requests + "article/" + this.props.articleId + "/comment", options)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => console.log(error))

       


        // this.setState({comment: response})
    }

    render() { 
        return ( 
        <div className="post_commnet_container">
            <div className="post_comment_body_label">Leave a Comment</div>
            <textarea ref="newCommentBody" className="post_comment_body" defaultValue="New comment here..."></textarea>
            <button className="btn btn-success post_comment_button" onClick={() => this.addNewComment(this.refs.newCommentBody.value, localStorage.getItem("id"))}>Post it!</button>
        </div> );
    }
}
 
export default PostComment;