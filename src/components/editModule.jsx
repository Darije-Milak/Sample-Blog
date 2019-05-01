import React, { Component } from 'react';

class EditModule extends Component {
    state = {  }

    render() {

        return (
        <div id ="eac" className="edit_article_container">
            <div className="edit_article_title_label">Title:</div>
                <input ref="editModuleTitle" type="text" 
                    value = {this.props.valueTitle}
                    onChange={this.props.handleEditTitleChange}
                    className="edit_article_title_input"
                >
                </input>
                <div>{this.props.currentEditTitle}</div>
                <textarea 
                    type="text"
                    ref="editModuleBody"
                    className="edit_article_textarea"
                    value = {this.props.valueBody}
                    onChange={this.props.handleEditBodyChange} 
                >
                </textarea>
            
            <button 
                className="btn m-1 edit_article_submit_button" 
                onClick={() => this.props.addNewArticle(this.refs.editModuleTitle.value, this.refs.editModuleBody.value)}
            >
                Submit Article
            </button>

            <button
                className="btn m-1 edit_article_change_button"
                onClick={() => this.props.changeArticle(this.refs.editModuleTitle.value, this.refs.editModuleBody.value, this.props.valueId, this.props.valuePosterId)}
            >
                Change Article
            </button>
        </div> );
    }
}
 
export default EditModule;
