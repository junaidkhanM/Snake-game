import React, { Component } from 'react';
import './Game.css';

export default class Game extends Component {
  state = {
    rows: 10,
    cols: 10,
    grid: [],

    snake: {
      head: {},
    },
    currentPosition: {
      r: 4,
      c: 4,
    },
  };

  getCenterOfGrid() {
    return {
      row: Math.floor((this.state.rows - 1) / 2),
      col: Math.floor((this.state.cols - 1) / 2),
    };
  }

  resetGrid(state = {}, sendBack = false) {
    if (!Object.keys(state).length) {
      state = this.state;
    }

    const grid = [];
    const { rows, cols, snake } = state;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const isHead = snake.head.row === row && snake.head.col === col;

        grid.push({
          row,
          col,
          isHead,
        });
      }
    }

    if (sendBack) {
      return grid;
    } else {
      this.setState({
        grid,
      });
    }
  }

  moveSnake() {
    this.setState((state) => {
      let { currentPosition } = state;

      const { row, col } = state.snake.head;
      let head = {
        row,
        col,
      };

      if (currentPosition.r === head.row && currentPosition.c === head.col) {
        head.row = currentPosition.r;
        head.col = currentPosition.c;
      } else if (
        currentPosition.r > head.row &&
        currentPosition.c === head.col
      ) {
        head.row++;
      } else if (
        currentPosition.r < head.row &&
        currentPosition.c === head.col
      ) {
        head.row--;
      } else if (
        currentPosition.r === head.row &&
        currentPosition.c > head.col
      ) {
        head.col++;
      } else if (
        currentPosition.r === head.row &&
        currentPosition.c < head.col
      ) {
        head.col--;
      } else if (currentPosition.r < head.row && currentPosition.c > head.col) {
        head.row--;
        head.col++;
      } else if (currentPosition.r > head.row && currentPosition.c < head.col) {
        head.row++;
        head.col--;
      } else if (currentPosition.r > head.row && currentPosition.c > head.col) {
        head.row++;
        head.col++;
      } else if (currentPosition.r < head.row && currentPosition.c < head.col) {
        head.row--;
        head.col--;
      }

      const newState = {
        ...state,
        snake: {
          head,
        },
      };

      const grid = this.resetGrid(newState, true);

      return {
        ...newState,
        grid,
      };
    });
  }

  handleClick() {
    let { currentPosition } = this.state;
    const newState = {
      ...this.state,
      currentPosition,
    };
    console.log(currentPosition);

    const grid = this.resetGrid(newState, true);

    this.setState((state) => {
      return {
        ...newState,
        grid,
      };
    });
  }

  componentDidMount() {
    this.setState((state) => {
      const newState = {
        ...state,
        snake: {
          head: this.getCenterOfGrid(),
        },
      };
      const grid = this.resetGrid(newState, true);
      return {
        ...newState,
        grid,
      };
    });

    this.resetGrid();

    setInterval(() => {
      this.moveSnake();
    }, 200);
  }

  render() {
    let gridContent = this.state.grid.map((grid, index) => {
      return (
        <div
          onClick={() =>
            this.setState({ currentPosition: { r: grid.row, c: grid.col } })
          }
          key={index}
          className={grid.isHead ? 'gridItem is-head' : 'gridItem'}
        ></div>
      );
    });

    return (
      <div className='snake-container'>
        <div className='grid-header'>
          <h1>Snake Game</h1>
        </div>
        <div className='grid'>{gridContent}</div>
      </div>
    );
  }
}
