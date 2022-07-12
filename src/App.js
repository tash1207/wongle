import { useEffect, useRef, useState } from 'react'
import Board from './components/Board'
import Header from './components/Header'

function App() {
  const [rows, _setRows] = useState([]);
  const [currentRowIndex, _setCurrentRowIndex] = useState(0);
  const [currentTileIndex, _setCurrentTileIndex] = useState(1);

  const rowsRef = useRef(rows);
  const setRows = (data) => {
    rowsRef.current = data;
    _setRows(data);
  }

  const currentRowIndexRef = useRef(currentRowIndex);
  const setCurrentRowIndex = (data) => {
    currentRowIndexRef.current = data;
    _setCurrentRowIndex(data);
  }

  const currentTileIndexRef = useRef(currentTileIndex);
  const setCurrentTileIndex = (data) => {
    currentTileIndexRef.current = data;
    _setCurrentTileIndex(data);
  }

  const wordBank = [
    'liquor',
    'regret',
    'wongle',
    'woolen',
  ];
  const correctWord = wordBank[Math.floor(Math.random() * wordBank.length)];

  const Row = (tiles) => {
    return {
      tiles : tiles || getDefaultTiles(),
    }
  }

  const Tile = (letter, state) => {
    return {
      letter : letter || '',
      state : state || 'tbd',
    }
  }

  useEffect(() => {
    const initRows = () => {
      const row1Tiles = Row([
        Tile(getRandomLetter()),
        Tile(),
        Tile(),
        Tile(),
        Tile(),
        Tile(),
      ]);
      setRows([row1Tiles, Row(), Row(), Row(), Row()]);
    }

    initRows();
    document.addEventListener('keydown', onKeyDown);
  }, []);

  const onKeyDown = (e) => {
    const key = e.key;
    if (isLetter(key)) {
      const currentRow = getCurrentRow();
      const currentTile = currentRow.tiles[currentTileIndexRef.current];
      currentTile.letter = key.toLowerCase();
      setRows([...rowsRef.current]);
      if (currentTileIndexRef.current < 5) {
        setCurrentTileIndex(currentTileIndexRef.current + 1);
      }
    } else if (key === 'Enter' && validateEnterPress()) {
      updateTiles();
      setCurrentRowIndex(currentRowIndexRef.current + 1);
      setCurrentTileIndex(0);
    } else if (key === 'Backspace' && validateBackspacePress()) {
      const currentRow = getCurrentRow();
      if (currentRow.tiles[currentTileIndexRef.current].letter === '') {
        currentRow.tiles[currentTileIndexRef.current - 1].letter = '';
        setCurrentTileIndex(currentTileIndexRef.current - 1);
      } else {
        currentRow.tiles[currentTileIndexRef.current].letter = '';
      }
      setRows([...rowsRef.current]);
    }
  }

  const isLetter = (key) => {
    return /^[a-z]$/i.test(key);
  }

  const validateEnterPress = () => {
    if (currentTileIndexRef.current !== 5) {
      return false;
    }
    if (getCurrentRow().tiles[currentTileIndexRef.current].letter === '') {
      return false;
    }
    // TODO make sure word exists
    // TODO make sure hard mode rules are followed
    return true;
  }

  const validateBackspacePress = () => {
    if (currentTileIndexRef.current === 0) {
      return false;
    }
    if (currentRowIndexRef.current === 0 &&
      currentTileIndexRef.current === 1) {
      // Don't allow user to change starting letter of first guess.
      return false;
    }
    return true;
  }

  const updateTiles = () => {
    const currentTiles = getCurrentRow().tiles;
    for (let i = 0; i < 6; i++) {
      if (currentTiles[i].letter === correctWord[i]) {
        currentTiles[i].state = 'correct';
      } else if (!correctWord.includes(currentTiles[i].letter)) {
        currentTiles[i].state = 'absent';
      } else if (checkForLetterPresence(currentTiles[i].letter, currentTiles, i)) {
        currentTiles[i].state = 'present';
      } else {
        currentTiles[i].state = 'absent';
      }
    }
    setRows([...rowsRef.current]);
  }

  const checkForLetterPresence = (letter, currentTiles, index) => {
    let correctInstances = 0;
    let occurrences = 0;
    let currentIndex = correctWord.indexOf(letter);
    while (currentIndex !== -1) {
      occurrences++;
      if (currentTiles[currentIndex].letter === letter) {
        correctInstances++;
      }
      currentIndex = correctWord.indexOf(letter, currentIndex + 1);
    }
    // Take other present states into consideration.
    let otherPresentTiles = 0;
    for (let i = 0; i < index; i++) {
      if (currentTiles[i].letter === letter && currentTiles[i].state === 'present') {
        otherPresentTiles++;
      }
    }

    return occurrences !== correctInstances + otherPresentTiles;
  }

  const getCurrentRow = () => {
    return rowsRef.current[currentRowIndexRef.current];
  }

  const getDefaultTiles = () => {
    const defaultTiles = [];
    for (let i = 0; i < 6; i++) {
      defaultTiles[i] = Tile();
    }
    return defaultTiles;
  }

  const getRandomLetter = () => {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    return letters[Math.floor(Math.random() * 26)];
  }

  return (
    <>
      <Header />
      <Board rows={rows} />
    </>
  );
}

export default App;
