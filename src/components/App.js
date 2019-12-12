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

    this.fetchPets()
  }

  fetchPets = () => {
    fetch("/api/pets")
    .then(resp => resp.json())
    .then(json => this.setState({
      pets: json
    }))
  }

  handleChangeType = (event) => {
    this.setState({
      filters: {type: event.target.value}
    })
  }

  handlePetsClick = (event) => {
    let url = "/api/pets"
    if (this.state.filters.type != "all") {
      url = `/api/pets?type=${this.state.filters.type}`
    }
    fetch(url)
      .then(resp => resp.json())
      .then(json => this.setState({
        pets: json
      }))
  }

  handleAdopt = (id) => {
    let pets = this.state.pets.map(pet => {
      if (pet.id === id) {
        return {...pet, isAdopted: true}
      } else {
        return pet
      }
    })
    this.setState({
      pets: pets
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
              <Filters onChangeType={this.handleChangeType}
              onFindPetsClick = {this.handlePetsClick}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets}
              onAdoptPet = {this.handleAdopt}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
