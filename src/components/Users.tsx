import * as React from 'react'

class UserCard extends React.Component<any, any> {
  render() {
    return <div>
      <img src={this.props.userJSON.picture.medium} />
      <div>
        <div>like it</div>
        <div>add to friends</div>
      </div>
    </div>
  }
}

export class Users extends React.Component<any, any> {

  state = {
    users: []
  }

  componentWillMount() {
    fetch('https://randomuser.me/api/?results=8')
      .then(response => response.json())
      .then(responseJSON => {
        this.setState({
          users: responseJSON.results
        })
      })
  }

  render() {
    return (
      <div>
        {this.state.users.map((userJSON, index) => {
          return <UserCard
            key={index}
            userJSON={userJSON}
          />
        })}
      </div>
    )
  }
}
