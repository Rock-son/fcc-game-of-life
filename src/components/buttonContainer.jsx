import React from 'react';
import ReactDOM from 'react-dom';
import {Button, FormGroup, ControlLabel, FormControl, Radio} from 'react-bootstrap';

export const Cell = (props) => <div {...props} />;

export default class BtnContainer extends React.Component {
  constructor(props) {
      super(props);
      this.speed = this.props.speed;
      this.slow = 600, this.medium = 350, this.fast = 100;
      this.size = this.props.size[0] + 'x' + this.props.size[1];
      this.state = {option: this.size, speed: this.props.speed};
      this._onInputChange = this._onInputChange.bind(this);
      this.onInputClick = this.onInputClick.bind(this);
  }
  componentDidMount() {
      this.setState({option: this.size, speed: this.props.speed});
  }
  _onInputChange(event) {
      if (event.target.id === 'ctrlSelect'){
          document.getElementById('clear').click();
          this.setState({ option: event.target.value});
          this.props.selectMenuChange(event.target.value);
      }
      else if (event.target.type === 'radio') {
          this.speed = parseInt(event.target.value);
          this.props.changeSpeed(this.speed);
          this.setState({speed: this.speed});
      }
  } 
  onInputClick(event) {
    document.getElementById('pause').click();
  }
  
  render() {
    let {size, gen, handleBtnClick, change,...props} = this.props;
    return (
    <div id='btnRow'>
        <div className='btnBorder'>
            <Button id='run' bsStyle='primary' bsSize='xsmall' onClick={handleBtnClick}>Run</Button>
            <Button id='pause' bsStyle='warning' bsSize='xsmall' onClick={handleBtnClick}>Pause</Button>
            <Button id='clear' bsStyle='danger' bsSize='xsmall' onClick={handleBtnClick}>Clear</Button>   
        </div>      
        <FormGroup controlId="ctrlSelect" onChange={this._onInputChange} onClick={this.onInputClick}>        
            <ControlLabel>Select size:</ControlLabel>
            <FormControl componentClass="select" placeholder="Select" value={this.state.option}>
               <option value='45x60'>45 x 60</option>
               <option value='55x75'>55 x 75</option>
            </FormControl>
        </FormGroup>
        <div className='generation'>{'Generation: ' + gen}</div>
        <FormGroup id='radioGroup' onChange={this._onInputChange}>
                <Radio name='radio' value={this.slow} inline checked={this.slow === this.speed}>Slow</Radio>{' '}
                <Radio name='radio' value={this.medium} inline checked={this.medium === this.speed}>Medium</Radio>{' '}
                <Radio name='radio' value={this.fast} inline checked={this.fast === this.speed}>Fast</Radio>
        </FormGroup>
    </div>
    );
  }
}