import { createStore } from 'redux'

const initialState = {
  QB: 1,
  RB: 2,
  WR: 2,
  TE: 1,
  DEF: 1,
  K: 1,
  FLEX: 1,
  Bench: 5
}

function settings(state = initialState, action) {
  switch (action.type) {
    case 'SET_QB':
      return { ...state, QB: action.value };
    case 'SET_RB':
      return { ...state, RB: action.value };
    case 'SET_WR':
      return { ...state, WR: action.value };
    case 'SET_TE':
      return { ...state, TE: action.value };
    case 'SET_DEF':
      return { ...state, DEF: action.value };
    case 'SET_K':
      return { ...state, K: action.value };
    case 'SET_FLEX':
      return { ...state, Flex: action.value };
    case 'SET_BENCH':
      return { ...state, Bench: action.value };
    default:
      return state;
  }
}

export default settings;