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

    this.handleFetch()
  }

  adoptPet = (id) => {
    this.setState(prevState => {
      return {
        ...prevState,
      pets: prevState.pets.map(pet => {
        if (pet.id === id) {
          return {...pet, isAdopted: true} 
        } else {
          return pet
        }
      })
    }
    })
  }

  onChangeType = (event) => {
    this.setState({
      filters: {
        type: event.target.value
      }
    })
  }

  handleFetch = () => {
    const {type} = this.state.filters
    let url
    type != "all" ? url = `/api/pets?type=${type}` : url = '/api/pets'
    fetch(url)
      .then(resp => resp.json())
      .then(json => {
        this.setState({
          pets: json
        })
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
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.handleFetch} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.adoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
