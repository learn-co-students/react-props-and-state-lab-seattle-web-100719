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
    this.fetchPets();
  }

  fetchPets = () => {
    const { type } = this.state.filters;
    let url = "";
    type === "all" ? (url = "/api/pets") : (url = `/api/pets?type=${type}`);
    fetch(url)
      .then(resp => resp.json())
      .then(json =>
        this.setState({
          pets: json
        })
      );
  };

  changeType = type => {
    this.setState({
      filters: {
        type: type
      }
    });
  };

  findPets = () => {
    this.fetchPets();
  };

  adoptPet = id => {
    this.setState(prevState => {
      return prevState.pets.map(pet => {
        if (pet.id === id) {
          return (pet.isAdopted = true);
        } else {
          return pet;
        }
      });
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
                onChangeType={this.changeType}
                onFindPetsClick={this.findPets}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.adoptPet} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
