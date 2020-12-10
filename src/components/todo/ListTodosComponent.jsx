
import React, { Component } from 'react'
import TodoDataService from '../../api/todo/TodoDataService.js'
import AuthenticationService from './AuthenticationService.js'

class ListTodosComponent extends Component {
    constructor(props) {
        console.log('constructor')
        super(props)
        this.state = {
            todos : [],
            message: null
        }
        this.deleteTodoClicked = this.deleteTodoClicked.bind(this)
        this.refreshTodos = this.refreshTodos.bind(this)
    }

    componentDidMount() {
        console.log('componentDidMount')
        this.refreshTodos();
        console.log(this.state)
    }

    refreshTodos() {
        let username = AuthenticationService.getLoggedInUserName()
        TodoDataService.retrieveAllTodos(username)
            .then(
                response=>{
                    this.setState({todos : response.data})
                }
            )
    }

    deleteTodoClicked(id){
        let username = AuthenticationService.getLoggedInUserName()
        console.log(id + " "+ username)
        TodoDataService.deleteTodo(username,id)
            .then (
                response => {
                    this.setState({message : `Delete of todo ${id} Sucessful`})
                    this.refreshTodos()
                }
            )
    }

    componentWillUnmount() {
        console.log('componentWillUnmount')
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate')
        console.log(nextProps)
        console.log(nextState)
        return true
    }

    render() {
        console.log('render')
        return (
            <div>
                <h1>List Todos</h1>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Target Date</th>
                                <th>Is Completed?</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                /*
                                    Retrieve all Todos for a user
                                    GET /users/{username}/todos

                                    Delete a Todo of a user
                                    DELETE /users/{username}/todos/{id}

                                    Edit/Update a Todo
                                    PUT /users/{username}/todos/{todo_id}

                                    Create a new Todo
                                    POST /users/{username}/todos/
                                */
                                this.state.todos.map(
                                    todo =>
                                        <tr key={todo.id}>
                                            <td>{todo.description}</td>
                                            <td>{todo.targetData.toString()}</td>
                                            <td>{todo.done.toString()}</td>
                                            <td><button className="btn btn-warning" onClick={() => this.deleteTodoClicked(todo.id)}>Delete</button></td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div >
        )
    }
}

export default ListTodosComponent;