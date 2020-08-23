import React, { Component} from 'react';

class App extends Component {

    constructor() {
        super();
        this.state ={
            NodeFiscalia:'',
            NombreFiscalia:'',
            DireccionFiscalia: '',
            TelefonoFiscalia: '',
            tasks:[],
            _id:''

        };
        this.handleChange =this.handleChange.bind(this);
        this.addTask =this.addTask.bind(this);
        
    }

    addTask(e){
        //console.log("adding task");
        console.log(this.state);
        if(this.state._id){
            fetch(`/api/tasks/${this.state._id}`,{
                method:'PUT',
                body:JSON.stringify(this.state),
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                M.toast({html:"Fiscalia Actualizada con Exito"});
                console.log(data);
                this.setState({NodeFiscalia:'', NombreFiscalia:'',DireccionFiscalia: '',TelefonoFiscalia:''});
            } );
            this.fetchTasks();


        }else{
            fetch('/api/tasks', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
    
            })
                .then (res => res.json())
                .then(data => {
                    console.log(data)
                    M.toast({html: 'Fiscalia Guardada'});
                    this.setState({NodeFiscalia:'', NombreFiscalia:'',DireccionFiscalia: '',TelefonoFiscalia:''});
                    this.fetchTasks();
                    
                })
                .catch(err => console.log(err));
                
        }
        
            e.preventDefault();
        
    }

    componentDidMount(){
        console.log('el componente fue montado');
        this.fetchTasks();
    }
    fetchTasks(){
        fetch('api/tasks')
        .then(res => res.json())
        .then(data =>{
            this.setState({tasks:data});
            console.log(this.state.tasks)});
      
    }

    editTask(id){
        console.log("Editando")
        fetch(`/api/tasks/${id}` )
            .then(res => res.json())
            .then(data =>{
                console.log(data);
                this.setState({
                    NodeFiscalia: data.NodeFiscalia,
                    NombreFiscalia: data.NombreFiscalia,
                    DireccionFiscalia:data.DireccionFiscalia,
                    TelefonoFiscalia:data.TelefonoFiscalia,
                    _id:data._id
                })



            });
            
            
    }
   
    deleteTask(id) {
        if (confirm('¿Esta seguro de Borra la Fiscalia?')) {
            console.log("eliminando", id);
        fetch(`/api/tasks/${id}`, {
            method: 'DELETE',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            M.toast({html: 'Fiscalia Eliminada'});
            console.log(data);
            this.fetchTasks();
        })
        }
        
    }

    handleChange(e){
        //console.log('escribiendo');
        //console.log(e.target.name);
        const {name,value}=e.target;
        this.setState({
            [name]: value
        });
    }

    render() {
        return (

            <div>{/* Navigation*/ }
                <nav className="light-blue darken-4">
                <image src="/imagen/jes.jpg" alt=""/>
                    <div className="container">
                    
                        <a className="brand-logo" href="/"  >Project MP/JES</a>
                        
                        <ul className="left hide-on-med-and-down">
                        

                        </ul>
                    </div>
                </nav>

                <div className="container">
                    <div className="row ">

                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                    <div className="row">
                                            <div className="input-field col s12">
                                                <input name="NodeFiscalia" onChange={this.handleChange} type="text" placeholder="Numero de la Fiscalia" value={this.state.NodeFiscalia}></input>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="NombreFiscalia" onChange={this.handleChange} type="text" placeholder="Nombre de la Fiscalia" value={this.state.NombreFiscalia}></input>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="DireccionFiscalia" onChange={this.handleChange} type="text" placeholder="Direccion de la Fiscalia" value={this.state.DireccionFiscalia}></input>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="TelefonoFiscalia" onChange={this.handleChange} type="text" placeholder="Telefono de la Fiscalia" value={this.state.TelefonoFiscalia}></input>
                                            </div>
                                        </div>
                                        
                                        <button type="submit" className="btn light-blue darken-4">Guardar</button>
                                    </form>

                                </div>
                    

                            </div>

                        
                        </div>

                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>No. de la Fiscalia</th>
                                        <th>Nombre de la Fiscalia</th>
                                        <th>Direccion de la Fiscalia</th>
                                        <th>Numero de Telefono de la Fiscalia</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map(task => {
                                            return(
                                                <tr key={task._id}>
                                                    <td>{task.NodeFiscalia}</td>
                                                    <td>{task.NombreFiscalia}</td>
                                                    <td>{task.DireccionFiscalia}</td>
                                                    <td>{task.TelefonoFiscalia}</td>
                                                    <td>
                                                    <button onClick={() => this.editTask(task._id)} className="btn light-blue darken-4" style={{margin: '4px'}}> <i className="material-icons">edit</i></button>
                                                    <button className="btn light-blue darken-4" onClick={()=> this.deleteTask(task._id)}> <i className="material-icons">delete</i></button>
                                                        
                                                        
                                                    </td>
                                                </tr>
                                            )
                                        })

                                    }
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