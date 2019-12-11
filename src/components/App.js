import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
    this.handleFindPetsClick();
  }

  handleChangeType = (event) => {
    this.setState({
      filters: {
        type: event.target.value
      }
    })
  }

  handleFindPetsClick = () => {
    const {type} = this.state.filters;
    fetch(type === 'all' 
    ? '/api/pets' 
    : `/api/pets?type=${type}`)
    .then(resp => resp.json())
    .then(json => {
      this.setState({
        pets: json
      })
    })
  }

  handleAdoptPet = (id) => {
    const isAdopted = this.state.pets.map(pet => {
      if (pet.id === id){
        return Object.assign({}, pet, {isAdopted: true});
      } else {
        return pet;
      }
    });
    this.setState({
      pets: isAdopted
    });
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.handleChangeType}
              onFindPetsClick={this.handleFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets}
              onAdoptPet={this.handleAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
