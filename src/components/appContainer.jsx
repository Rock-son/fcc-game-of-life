import React from 'react';
import ReactDOM from 'react-dom';
import BtnContainer, {Cell} from './buttonContainer';


export default class Container extends React.Component {
  constructor(props) {
      super(props);
      this.ROWS = 45, this.COLS = 60;
      this.NR_CELLS = this.ROWS * this.COLS;
      this.GAME_INITIALIZED = false;
      this.isGo = false;
      this.speed = 600;
      this.CELL_ARRAY = Array.apply(null, Array(this.NR_CELLS)).map(Number.prototype.valueOf,0);
      this.state = {cellArr: this.CELL_ARRAY.slice(0), generation: 0};      
      this._generateCellArray = this._generateCellArray.bind(this);
      this._runGameOfLife = this._runGameOfLife.bind(this);
      this._handleBtnClick = this._handleBtnClick.bind(this);
      this._activateCell = this._activateCell.bind(this);
      this._handleChange = this._handleChange.bind(this);
      this._changeSpeed = this._changeSpeed.bind(this);
  }
  componentWillUnmount() {
      clearInterval(this.interval);
  }
  _clearInterval() {
      clearInterval(this.interval);
  }
  // randomize starting cell array (only if no user input)
  _generateCellArray() {
    const min = 2, max = 7;
    this.CELL_ARRAY.length = 0;  // most efficient way to reset array to []!
    let arrSpan = Math.floor((Math.random() * (max - min)) + min);
    for (let i = 0; i < this.NR_CELLS; i++) {       
       if (i !== arrSpan)  {
         this.CELL_ARRAY.push(0);
       } else {
         this.CELL_ARRAY.push(1);      
         let rand = Math.floor((Math.random() * (max - min)) + min);
         rand === 0 ? arrSpan++ : arrSpan += rand;
       }
    }
}
  // main function: checks for sum of active neighbouring cells
  _runGameOfLife() {
      const self = this;
      let change = false;
      self.tempArr = this.CELL_ARRAY.slice(0);      
    
      // for each cell in vicinity, make neighbours query
      for (let i = 0; i < this.NR_CELLS; i++) {
         const neighbours = countNeighbours(i);
          const cellValue = self.tempArr[i];
         // IF MAKING A QUERY ON A LIVE ONE
         // 1.) 2.) 3.) Any live cell with fewer than two or more than 3 live neighbours dies, cells with 2 or 3 neighbours live on
         // 4.) Any dead cell with exactly three live neighbours becomes a live cell
          if (cellValue === 1 & (neighbours < 2 || neighbours > 3 )) {
                  (function() {self.CELL_ARRAY.splice(i, 1, 0);})();
                  change = true;
          } else if (cellValue === 0 && neighbours === 3 ) {
                  (function() {self.CELL_ARRAY.splice(i, 1, 1);})();
                  change = true;              
          }
          // check if it's last row and if any changes continue counting - if not, stop immediatelly
          if (i+1 === this.NR_CELLS) {
              if (self.tempArr.length === self.CELL_ARRAY.length && !change) {
                  return;
              } else {
                  self.setState({cellArr: self.CELL_ARRAY.slice(0), generation: self.state.generation + 1});                 
              }  
          }
      }
      function countNeighbours(index) {
          let val = 0;
          /* safeCheck every CELL
            1. before and after 
            2. 3 cells adjacent in the top: -81, -80, -79       -> not valid for first row!
            3. 3 cells adjacent in the bottom: +79, +80, +81    -> not valid for last row!
          */
          // count for the left edge, seeping into the right one
          if (index % self.COLS === 0) {
              val = safeCheck(index - 1 + self.COLS) + safeCheck(index + 1) + safeCheck(index + (self.COLS - 1) + self.COLS) +
                    safeCheck(index + self.COLS) + safeCheck(index + self.COLS + 1) + safeCheck(index - self.COLS + 1) + 
                    safeCheck(index - self.COLS) + safeCheck(index - (self.COLS + 1) + self.COLS);          
              return val;
          } 
          // count for the right edge, seeping into the left one
          else if (index % (self.COLS) === self.COLS - 1) {
              val = safeCheck(index - 1) + safeCheck(index + 1 - self.COLS) + safeCheck(index + self.COLS - 1) +
                    safeCheck(index + self.COLS) + safeCheck(index + (self.COLS + 1) - self.COLS) + safeCheck(index - (self.COLS + 1)) + 
                    safeCheck(index - self.COLS) + safeCheck(index - (self.COLS - 1) - self.COLS);          
              return val;
          }
          // count for any cells in between
          val = safeCheck(index - 1) + safeCheck(index + 1) + safeCheck(index + self.COLS - 1) +
                safeCheck(index + self.COLS) + safeCheck(index + self.COLS + 1) + safeCheck(index - self.COLS + 1) + 
                safeCheck(index - self.COLS) + safeCheck(index - self.COLS - 1);          
          return val;
          
      }
      // check array values for concerned indexes
      function safeCheck(index) {
         
         if (index < 0)          {return self.tempArr[self.NR_CELLS + index];}     // for every index in first row
         if (index >= self.NR_CELLS)   {return self.tempArr[index - self.NR_CELLS]; }   // for every index in last row
         return self.tempArr[index];                                          // for every other index (cell)
      }
  }
  // handle click from main buttons
  _handleBtnClick(event) {
      if (event.target.id === 'run') {
          if (this.interval) {clearInterval(this.Interval);}
          const nrActiveCells = this.state.cellArr.reduce((prev, curr) => +curr + +prev, []);
        // handle start of the game if there is NO user input (generate random array)...
          if (!this.GAME_INITIALIZED && nrActiveCells  === 0) {              
              this.GAME_INITIALIZED = true;
              this._generateCellArray();
              this.setState({cellArr: this.CELL_ARRAY.slice(0), generation: 0});
          }
        // ... otherwise work with user input array (nrActiveCells  > 0) && game is stopped (!this.isGo)
          if (!this.isGo) {
              this.GAME_INITIALIZED = !this.GAME_INITIALIZED ? !this.GAME_INITIALIZED : this.GAME_INITIALIZED;
              this.interval = setInterval(this._runGameOfLife, this.speed);
              this.isGo = true;
          }
        // pause the game
      } else if (event.target.id === 'pause') {
          clearInterval(this.interval);
          this.isGo = false;
        // clear every variable start values
      } else if (event.target.id === 'clear') {
          this.CELL_ARRAY.length = 0;
          this.tempArr.length = 0;
          this.CELL_ARRAY = Array.apply(null, Array(this.NR_CELLS)).map(Number.prototype.valueOf,0)
          this.setState({
            cellArr: this.CELL_ARRAY.slice(0), 
            generation: 0
          });
          this.GAME_INITIALIZED = false;
          clearInterval(this.interval);
          this.isGo = false;
      }
  }
  
  _activateCell(event) {
      const doc = document.getElementById(event.target.id);
    // insert clicked/dragged values into array
      if (doc.className.indexOf('active') === -1) {
          this.CELL_ARRAY.splice(+event.target.id, 1, 1);          
      } else {
        // only remove values if clicked, not dragged
          event.type === 'click' ? this.CELL_ARRAY.splice(+event.target.id, 1,0) : '';
      }
      this.setState({cellArr: this.CELL_ARRAY.slice(0)});
  }
  
  _returnClass(index, val) {
      if (this.tempArr == null) {this.tempArr = this.CELL_ARRAY.slice(0);}
      if (this.tempArr[index] === val && val === 1) {
          return 'cell active old';
      } else if (val === 1) {
          return 'cell active';
      } else {
        return 'cell';
      }
  }
  // handles state of select menu for the size
  _handleChange(size) {
      clearInterval(this.interval);
      const sizeArr = size.split('x');
      if (this.ROWS === sizeArr[0]) {return;}
      this.ROWS = +sizeArr[0];
      this.COLS = +sizeArr[1];
      this.NR_CELLS = this.ROWS * this.COLS;
      this.GAME_INITIALIZED = false;
      this.isGo = false;
      this.CELL_ARRAY.length = 0;
      this.tempArr.length = 0;
      this.CELL_ARRAY = Array.apply(null, Array(this.NR_CELLS)).map(Number.prototype.valueOf,0);
      this.setState({
           cellArr: this.CELL_ARRAY.slice(0), 
           generation: 0
      });
  }
  _changeSpeed(speed) {
      if (this.interval == null || !this.isGo) {
          this.speed = speed || this.speed;
      } else {
          clearInterval(this.interval);
          this.speed = speed || this.speed;
          this.interval = setInterval(this._runGameOfLife, this.speed);       
      }      
  }
  
  
  render() {
    let cellStyle = {};
    if (this.NR_CELLS === 2700) {
        cellStyle = {'height' : '15px', 'width' : '15px'};
    } else {
        cellStyle = {'height' : '12px', 'width' : '12px'};
    }
    
    return (
      <div>
          <BtnContainer gen={this.state.generation} selectMenuChange={this._handleChange} handleBtnClick={this._handleBtnClick} size={[this.ROWS, this.COLS]} changeSpeed={this._changeSpeed} speed={this.speed} clearInterval={this._clearInterval}/>
          <div id='playground'>
              {this.state.cellArr.map((val, index) => (<Cell key={index} id={index} className={this._returnClass.call(this, index, val)} onClick ={this._activateCell} onDragEnter ={this._activateCell} style={cellStyle} />))}
          </div>
      </div>
    );
  }
}