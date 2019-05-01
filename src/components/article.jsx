import React, { Component } from 'react';
import Comments from './comments'; 
import PostComment from './postComment'; 

class Article extends Component {
    state = {
        commentTitle: "",
        commentBody: "",
        articleComments: "",
        commentIsLoaded: false,
        commentVisible:false,
        showCommentButtonText: "Show Comments",
        showPostCommentForm: false,
        showPostButtonText: "Post Comment",
    }

        getLocalKeyValue = () => {
            console.log("key");
            console.log(this.props.title);
            console.log(this.props.body);
        }

        showComments = (id) => {
            console.log("Showing Comments");
            if (!this.state.commentVisible)
            {
              this.setState({commentVisible: true})
              let options = {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
              fetch("http://www.scripttic.com:8000/api/v1/article/" + id + "/comment", options) 
              .then((response) => 
                {
                    //console.log(response.json());
                    // this.setState({comments: response.json()});
                    //console.log(this.state.comments);
                    return response.json();
                }
              )
              .then((data) => {
                console.log(this.state.articleComments, "first log");
                console.log(data);
                
                if (data.length === 0)
                {
                    console.log(data.length, "array size");
                    this.setState({showCommentButtonText: "No Comments"});
                }
                else
                {
                    this.setState({showCommentButtonText: "Hide Comments"});
                }

                this.setState({articleComments: data, commentIsLoaded: true});
                console.log(this.state.articleComments, "second log");
              })
              .catch((error) => console.log(error));
             
            }
            else
            {
                this.setState({commentVisible: false});
                this.setState({showCommentButtonText: "Show Comments"});
            }
          }

          postCommentForm = () => {
              console.log("code" ,"Post Comment Form function");
              if (!this.state.showPostCommentForm)
              {
                this.setState({showPostCommentForm: true, showPostButtonText: "Hide Comment Form"});
              }
              else
              {
                this.setState({showPostCommentForm: false, showPostButtonText: "Post Comment"});
              }
          }


        //   addNewComment = () => {
        //       console.log("variable"," add New Comment function");
        //   }


        editOneComment = (posterId, commentId, commentBody, articleId) => {
            console.log(posterId, commentId, commentBody, articleId,"EDIT one COMMENT Function");
            this.setState({showEditCommentForm: true})

        }

        deleteOneComment = (aid, cid) => {
            console.log(aid, cid, "DELETE one COMMENT Function");

            let data = {
                id: aid,
                cid: cid
            }


            let options = {
                method: 'DELETE',
                body: data,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            }

            fetch(this.props.Requests + 'article/' + aid +'/comment/' + cid, options)
            .then((response) => console.log(response))
            .catch((error) => console.log(error));



            let articleComments = this.state.articleComments.filter(ac => ac.id !== Number(cid))
            console.log(articleComments, "test new Comment state");
            this.setState({articleComments: articleComments});
        }

       render() { 
        //console.log(Number(this.props.posterId), this.props.currentPosterId, "values");
        //console.log(this.props.posterId, "in article.jsx");
        return (  
                <div  id={this.props.id} posterid={this.props.posterId} className="article_container">
                    <h3 className="article_title">{this.props.title}</h3>
                    <div ref="articleBody" className="article_body">{this.props.body}</div>
                    
                    <div className="article_edit_buttons">
                        <button className="btn btn-warning article_load_comments_button" id={this.props.id} onClick={() => this.showComments(this.props.id)}>{this.state.showCommentButtonText}</button>
                        {(this.props.showPostCommentButton) ? (<button className="btn btn-success article_post_comment_button" onClick={() => this.postCommentForm()}>{this.state.showPostButtonText}</button>) : null}
                        {
                        (Number(this.props.posterId) === this.props.currentPosterId) ?
                        <React.Fragment>
                            <button className="btn btn-info article_edit_button" onClick={() => this.props.getTitleBody(this.props.title, this.props.body, this.props.id, this.props.posterId)}>Edit Article</button>
                            <button className="btn btn-danger article_delete_button" onClick={() => this.props.deleteArticle(this.props.title, this.props.body, this.props.id, this.props.posterId)}>Delete Article</button>
                        </React.Fragment> : null  
                        }
                    </div>
                        {(this.state.showPostCommentForm) ? (
                        <PostComment
                            Requests = {this.props.Requests}
                            articleId = {this.props.id}
                        >
                        </PostComment>
                        ):  null}
                    {(this.state.commentVisible) ?
                        (
                            <Comments
                                id = {this.props.id}
                                //commentTitle = {this.state.commentTitle}
                                articleComments = {this.state.articleComments}
                                commentIsLoaded = {this.state.commentIsLoaded}
                                showCommentsEditButtons = {this.props.showCommentsEditButtons}
                                deleteOneComment = {this.deleteOneComment}
                                editOneComment = {this.editOneComment}
                                showEditCommentForm = {this.state.showEditCommentForm}
                                Requests = {this.props.Requests}
                            >   
                            </Comments>   
                        ) : null
                    }
                    {/* {
                    (Number(this.props.posterId) === this.props.currentPosterId) ?
                        (<button className="btn btn-danger article_delete_button">Delete Article</button>) : null
                    } */}
                </div>
        );
    }
}
 
export default Article;