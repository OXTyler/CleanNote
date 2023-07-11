"use client"
import React from "react"
import DynamicInput from "./dynamic_input";

class NoteTab extends React.Component {

    constructor(props){
        super(props);
        this.state = { }
        console.log(props.update_page)
        this.state.update_page = props.update_page
        this.state.curr_page = props.curr_page
    }

    change_page = (old_page) => {
        this.props.update_page(this.state.curr_page, old_page)
    }

    update_page_name(new_name) {
    var old_name = this.state.curr_page
     //localStorage.setItem(this.state.curr_page, new_name)
     this.setState({curr_page: new_name}, () => {
        this.change_page(old_name)
     }) 
    }

    render(): React.ReactNode {
        return (
            <a onClick={this.change_page.bind(this)} href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <DynamicInput className="ml-3" text={this.state.curr_page} update_page={this.update_page_name.bind(this)}/>
            </a>

        )
    }
}

export default NoteTab