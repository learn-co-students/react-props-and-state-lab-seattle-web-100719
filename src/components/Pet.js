import React from 'react'

class Pet extends React.Component {

  getAdoption = (event) => {
    this.props.onAdoptPet(this.props.pet.id)
  }


  render() {
    const {age, gender, name, weight, isAdopted, type} = this.props.pet
    return (
      <div className="card">
        <div className="content">
          <a className="header">
            {gender === "female" ? '♀' : '♂' }
            {name}
          </a>
          <div className="meta">
            <span className="date">{type}</span>
          </div>
          <div className="description">
            <p>Age: {age}</p>
            <p>Weight: {weight}</p>
          </div>
        </div>
        <div className="extra content">
          {isAdopted ? <button className="ui disabled button">Already adopted</button> : <button className="ui primary button" onClick={this.getAdoption}>Adopt pet</button>}
        </div>
      </div>
    )
  }
}

export default Pet
