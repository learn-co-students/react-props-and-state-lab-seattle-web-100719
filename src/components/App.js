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
    this.fetchPets();
  }
  changeType =(newType) =>{
    this.setState({
      filters: {
        type: newType
      }
    })
  }


  fetchPets = () => {
    let petType = this.state.filters.type

    fetch(petType==="all" ? "/api/pets" : `/api/pets?type=${petType}`)
    .then(resp => resp.json())
    .then(json => {
      this.setState({
         pets: json
      })
    })
  }

  changeToAdoptedPet = (adoptedPet) =>{
    adoptedPet.isAdopted = true
    const newPets = this.state.pets.map(pet => pet.id === adoptedPet.id ? adoptedPet : pet )
    this.setState({
        pets: newPets
    })
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
              <Filters onChangeType={this.changeType} onFindPetsClick={this.fetchPets} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets = {this.state.pets} onAdoptPet={this.changeToAdoptedPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
