import React from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: [],
      filters: {
        type: "all"
      }
    };

    this.fetchPets("all");
  }

  setFilter = filterType => {
    this.setState({
      filters: {
        type: filterType
      }
    });
  };

  fetchPets = () => {
    fetch(
      this.state.filters.type === "all"
        ? `/api/pets`
        : `/api/pets?type=${this.state.filters.type}`
    )
      .then(resp => resp.json())
      .then(json => this.setState({ pets: json }));
  };

  adoptPet = id => {
    this.setState(prevState => {
      return prevState.pets.map(pet => {
        return pet.id === id ? pet.isAdopted = true: pet     
      })
    });
  };

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                setFilter={this.setFilter}
                fetchOnClick={this.fetchPets}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} adoptPet={this.adoptPet} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
