import React, { Component } from 'react';

class App extends Component {

    constructor(){
        super();
        this.state ={
            title: '',
            description: '',
            tasks: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.addTask = this.addTask.bind(this);
    }
    addTask(e){
        fetch('/api/tasks', {
            method:'POST',
            body: JSON.stringify(this.state),
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'

            }
        })
        .then(res=> res.json())
        .then(data=> {
            console.log(data)
            M.toast({html: 'Task Guardad'});
            this.setState({title:'', description:''});
        })
        .catch(err =>console.log(err));
        e.preventDefault()
    }
    componentDidMount(){
        this.fetchTasks();
    }



    fetchTasks(){
        fetch('/api/tasks')
        .then(res => res.json())
        .then(data => {
           
            this.setState({tasks: data})
            console.log(this.state.tasks)
        })
    }


    handleChange(e){
        const {name,value} = e.target;
        this.setState({
            [name]: value
        });

    }
    render() {
        return ( 
            <div>
                {/* parte de la navegacion*/}
                <nav className = "light-blue darken-4">
                    <div className = "container">
                        <a className ="brand-logo" href="/">MERN JES</a>    

                    </div>

                </nav>
                <div className = "container">
                    <div className = "row">
                        <div className = "col s5">
                            <div className = "card">
                                <div className = "card-content">
                                    <form onSubmit={this.addTask}>
                                        <div className = "row">
                                            <div className ="input-field col s12">
                                            <input name="title" onChange={this.handleChange} type ="text" placeholder="Titulo de la Tarea" value={this.state.title}></input>

                                            </div>
                                        </div>
                                        <div className = "row">
                                            <div className ="input-field col s12">
                                            <textarea name="description" onChange={this.handleChange} className="materialize-textarea" placeholder ="Descripcion" value={this.state.description}></textarea>

                                            </div>
                                        </div>
                                        <button type="submit" className = "btn light-blue darken-4">Enviar</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className = "col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Titulo</th>
                                        <th>Descripcion</th>
                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default App;