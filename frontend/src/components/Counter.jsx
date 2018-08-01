import React,{Component} from 'react';
import {connect} from 'react-redux';

class Counter extends Component {

  increment = () => {
  this.props.dispatch({type:'INCREMENT'})
  }

  decrement = () => {
  this.props.dispatch({type:'DECREMENT'})
  }

  render() {
    return (
      <div>
        <h2>Counter</h2>
        <div>
          <button onClick={this.decrement}>-</button>
          <span>{this.props.count}</span>
          <button onClick={this.increment}>+</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    count: state.reducer.count,
    Mynotes:state.owner
  };
}

export default connect(mapStateToProps)(Counter);