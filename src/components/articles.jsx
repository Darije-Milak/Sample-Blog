import React, { Component } from 'react';
import Article from './article';

class Articles extends Component {
    state = { 
        articles: [
        {
            "id": 91,
            "posterFirstName": "Nenad",
            "posterLastName": "Curcic",
            "posterEmail": "nenad1@test.com",
            "posterId": 16,
            "body": "test body",
            "title": "test",
            "datetime": "2018-10-06T12:34"
        },
        {
            "id": 90,
            "posterFirstName": "Ze",
            "posterLastName": "Cu",
            "posterEmail": "zcurcic@gmail.com",
            "posterId": 44,
            "body": "...light, but there was none",
            "title": "Lorem Ipsum",
            "datetime": "2018-09-17T07:57"
        }
        ]
    }

    
   

    render() { 
        //console.log(this.props.articles, "articles");
        return (
            this.props.loaded ? ( 
            <div className="all_articles"> 
            {this.props.articles.map(articles => (
            <Article 
                //id={this.props.articles.map(articles => articles.id)}
                id={`${articles.id}`}
                key = {articles.id}
                posterId = {`${articles.posterId}`}
                title = {articles.title}
                body = {articles.body}
                showArticleEditButton = {this.props.showArticleEditButton}
                showArticleDeleteButton = {this.props.showArticleDeleteButton}
                currentPosterId = {this.props.currentPosterId}
                getTitleBody = {this.props.getTitleBody}
                deleteArticle = {this.props.deleteArticle}
                showComments = {this.props.showComments}
                commentVisible = {this.props.commentVisible}
                showCommentsEditButtons = {this.props.showCommentsEditButtons}
                showPostCommentButton = {this.props.showPostCommentButton}
                Requests = {this.props.Requests}
            >
            </Article>
            )
            )}
            
            </div>): null
          );
    }
}
 
export default Articles;
