import React from 'react';
import * as apiCalls from '../../api/apiCalls';

class Rank extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      emoji: ''
    }
  }

  componentDidMount() {
    this.generateEmoji(this.props.entries);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.entries === this.props.entries && prevProps.name === this.props.name) {
      return null;
    }
    this.generateEmoji(this.props.entries);
  }

  generateEmoji = (entries) => {
    apiCalls.getBadge(entries, window.sessionStorage.getItem('token'))
      .then(data => {
        this.setState({ emoji: data.badge })
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <div className='white f3'>
          {`${this.props.name}, your current entry count is...`}
        </div>
        <div className='white f1'>
          {this.props.entries}
        </div>
        <div className='white f3'>
          {`Rank Badge: ${this.state.emoji}`}
        </div>
      </div>
    );
  }
}

export default Rank;
