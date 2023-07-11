"use client"
import React from "react";
import NotePage from "./note_page";
import SidebarList from "./sidebar_list";

class HomePage extends React.Component{
    state = {
        curr_page: "",
    }

    change_page = (new_page: string) => {
        console.log("home changes to page: " + new_page)
        this.setState({curr_page: new_page})
    }

    render(): React.ReactNode {
        return (
        <main className="bg-gray-100 flex min-h-screen items-left justify-start p-0">
            <div className="grid grid-cols-5 grid-rows-6 gap-0 ">
            <div className="fixed w-full bg-gray-50 dark:bg-gray-900 text-white bg-gray-200 w-full h-20">
                <img src="CleanNote.png"></img>
            </div>
                <div className="p-0">
                    <aside id="default-sidebar" className="fixed pt-20 top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                        <div id="sidebar"  className="h-full px-0 py-0 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                            <SidebarList update_page={this.change_page.bind(this)} />
                        </div>
                    </aside>
                </div>
                <div className="fixed top-20 left-64 pt-0 row-span-6 p-0 bg-gray-100 text-black col-span-4">
                    <NotePage data={this.state.curr_page} />
                </div>
            </div>
            
        </main>)
    }
}

export default HomePage