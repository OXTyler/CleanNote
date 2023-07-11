"use client"
import React, { useState} from 'react';
import {Editor} from "react-draft-wysiwyg"
import {EditorState, convertFromRaw, convertToRaw, ContentState} from "draft-js"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

class NotePage extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {editorState: EditorState.createEmpty(), curr_file: props.curr_file}
        const content = window.localStorage.getItem(props.curr_file);

        if (content) {
          this.state.editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(content)))
        } else {
          this.state.editorState = EditorState.createEmpty();
        }
    }

    componentWillReceiveProps(nextProps) {
      console.log("this page gets loaded: " + nextProps.data)
      this.saveContent(this.state.editorState.getCurrentContent());
      this.setState({curr_file: nextProps.data})
      const content = window.localStorage.getItem(nextProps.data);
      if (content) {
        const editorState = EditorState.push(this.state.editorState, convertFromRaw(JSON.parse(content)), 'remove-range');
        this.setState({ editorState });
      }  else {
        const editorState = EditorState.push(this.state.editorState, ContentState.createFromText(''), 'remove-range');
        window.localStorage.setItem(this.state.curr_file, "")
        this.setState({ editorState });

      }
    }

    saveContent = (content) => {
      window.localStorage.setItem(this.state.curr_file, JSON.stringify(convertToRaw(content)))
    }

    onEditorStateChange = (editorState: EditorState) => {
        const contentState = editorState.getCurrentContent();
        this.saveContent(contentState)
        this.setState({
            editorState,
        });
    };

    render() {
        return (
            <div className='flex-end p-2'>
                <Editor
                editorState={this.state.editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onChange={this.onChange}
                onEditorStateChange={this.onEditorStateChange}
                />
            </div>
        );
    }
}
export default NotePage