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
  }

  findPetsClick = () => {
    let { type } = this.state.filters;
    fetch(type === "all" ? "/api/pets" : `/api/pets?type=${type}`)
      .then(resp => resp.json())
      .then(json => {
        console.log(json);
        this.setState({ pets: json });
      });
  };

  changeType = (newType) => {
    this.setState({ filters: { type: newType } });
  };

  adoptPet = (petId) => {
    const pets = this.state.pets.map((pet) => {
      return pet.id === petId ? { ...pet, isAdopted: true } : pet;
      // if (pet.id === petId) {
      //   return {...pet, isAdopted: true}
      // }else {
      //   return pet
      // }
    });
    this.setState({ pets: pets });
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
              <Filters
                onFindPetsClick={this.findPetsClick}
                onChangeType={this.changeType}
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
