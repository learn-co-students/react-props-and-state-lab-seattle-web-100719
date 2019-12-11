import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {

  mapPets = () =>{
      return this.props.pets.map(onePet => <Pet pet = {onePet} key ={onePet.id} onAdoptPet={this.props.onAdoptPet}/>)      
  }

  render() {
    return <div className="ui cards">{this.mapPets()}</div>
  }
}

export default PetBrowser
