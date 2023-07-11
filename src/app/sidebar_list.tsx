"use client"
import React from 'react';
import NoteTab from './note_tab';

class SidebarList extends React.Component{

    constructor(props) {
      super(props)
      this.state = { 
        items: [],
        pages: [],
      }
      const notes = localStorage.getItem("notes")
      
      function change_page(new_page, old_page) {
        for (let i = 0; i < this.state.pages.length; i++) {
          if (this.state.pages[i].localeCompare(old_page) == 0){
            this.state.pages[i] = new_page
          }
        }
        const items_array = JSON.stringify(this.state.pages)
        localStorage.setItem("notes", items_array)
        this.props.update_page(new_page)
      }

      if (notes){
          this.state.pages = JSON.parse(notes)
          for(let i = 0; i < this.state.pages.length; i++){
            const newItem = <NoteTab curr_page={this.state.pages[i]} update_page={change_page.bind(this)} />;
            this.state.items.push(newItem);
          }
        }
    }

    change_page = (new_page, old_page) => {
      this.setState({ pages : this.state.pages.map((value) => (value == old_page ? new_page : value))})
      const items_array = JSON.stringify(this.state.pages)
      localStorage.setItem("notes", items_array)
      this.props.update_page(new_page)
    }
  
    addItemToList() {
      const title:string = `Note ${this.state.items.length + 1}`; 
      const newItem = <NoteTab curr_page={title} update_page={this.change_page.bind(this)}/>;

      this.state.items.push(newItem);
      this.state.pages.push(title);

      console.log(this.state.items)
      const items_array = JSON.stringify(this.state.pages)
      localStorage.setItem("notes", items_array)
      this.props.update_page(title);
    };
    
    render(): React.ReactNode {
      return (
        <div id="sidebar"  className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <button onClick={this.addItemToList.bind(this)}>+</button>
            <ul className="space-y-2 font-medium">
                {this.state.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
      );
    }
    
  };

export default SidebarList;