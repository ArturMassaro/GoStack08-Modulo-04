import React, { Component } from 'react';

import TechItem  from './TechItem';

class TechList extends Component {
  state = {
    newTech: '',
    techs: []
  };

  // Executado assim que o componente é iniciado 
  componentDidMount(){
    const techs = localStorage.getItem('techs');

    if(techs){
      this.setState({ techs: JSON.parse(techs)})
    }
  }

  // Executado assim que o componente houver alteracao nas props ou estado 
  componentDidUpdate(_, prevState){
    // this.props, this.state

    if(prevState.techs !== this.state.techs){
      localStorage.setItem('techs', JSON.stringify(this.state.techs))
    }
  }

  // Executado assim que o componente deixa de existir
  componentWillUnmount(){

  }

  handleInputChange = e => {
    this.setState({ newTech: e.target.value })
  }

  handleSubmit = e => {

    e.preventDefault();
    
    this.setState({
      techs: [...this.state.techs, this.state.newTech],
      newTech: ''
    })
  }

  handleRemove = (tech) => {
    this.setState({ techs: this.state.techs.filter(t => t!== tech) })
  }

  render(){
    return (
      <>
      <form onSubmit={this.handleSubmit}>
          <ul>
            {this.state.techs.map(tech => <TechItem 
              key={tech} 
              tech={tech} 
              onDelete={() => this.handleRemove(tech)} 
            />)}
            
          </ul>
          <input type="text" onChange={this.handleInputChange} value={this.state.newTech}/>
          <button type="submit">Salvar</button>
        </form>
      </>

    )
  }
}

export default TechList;