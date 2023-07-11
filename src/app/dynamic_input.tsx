"use client"
import React from "react"

class DynamicInput extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            text: props.text,
            editing: false,
            change_page: props.update_page
        }
    }

    changeEdit() {
        if (this.state.editing){
            this.setState({editing: false})
        } else{
            this.setState({editing: true})
        }
    }

    handleChange = (event) => {
        this.setState({text: event.target.value})
    }

    handleKeyDown = (event) => {
        if(event.key == 'Enter'){
            localStorage.setItem(event.target.value, localStorage.getItem(this.state.old_name))
            this.setState({text: event.target.value, editing: false})
            this.state.change_page(this.state.text)
        }
    }

    setOld = () => {
        this.setState({old_name: this.state.text})
    }

    render(): React.ReactNode  {
        return(
            <div >
                {this.state.editing ? (
                    <input
                     className="text-black"
                     type="text" 
                     value={this.state.text} 
                     onChange={this.handleChange.bind(this)}
                     onClick={this.setOld.bind(this)}
                     onKeyDown={this.handleKeyDown.bind(this)}
                     onBlur={this.changeEdit.bind(this)} 
                    />
                ) : (
                    <p className="hover:italic" onClick={this.changeEdit.bind(this)}>{this.state.text}</p>
                )}
                
            </div>
        )
    }

}

export default DynamicInput