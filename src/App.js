import { useEffect, useRef, useState } from 'react'
import Board from './components/Board'
import Header from './components/Header'
import Toast from './components/Toast'
import wordList from './wordList.json'

function App() {
  const [rows, _setRows] = useState([]);
  const [currentRowIndex, _setCurrentRowIndex] = useState(0);
  const [currentTileIndex, _setCurrentTileIndex] = useState(1);
  const [toast, setToast] = useState({message: '', shown: false});
  const [knownAbsentLetters, setKnownAbsentLetters] = useState([]);
  const [knownCorrectIndices, setKnownCorrectIndices] = useState([]);
  const [knownPresentLetters, setKnownPresentLetters] = useState([]);
  const [gameOver, setGameOver] = useState(false);

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

  const validWords = wordList;
  const wordBank = [
    'liquor',
    'regret',
    'museum',
    'rhythm',
    'thwart',
    'woolen',
  ];
  const correctWord = wordBank[Math.floor(Math.random() * wordBank.length)];

  const Row = (tiles) => {
    return {
      tiles : tiles || getDefaultTiles(),
      isValidWord : true,
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
    if (gameOver) {
      return;
    }

    getCurrentRow().isValidWord = true;
    setRows([...rowsRef.current]);
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
      checkForGameOver();
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
    let currentWord = '';
    for (const tile of getCurrentRow().tiles) {
      currentWord += tile.letter;
    }
    const isValidWord = validWords.includes(currentWord);
    if (!isValidWord) {
      getCurrentRow().isValidWord = false;
      setRows([...rowsRef.current]);
      showToast('Not a valid word');
      return false;
    }
    for (const knownAbsentLetter of knownAbsentLetters) {
      if (currentWord.includes(knownAbsentLetter)) {
        showToast(`Guess does not contain ${knownAbsentLetter.toUpperCase()}`);
        return false;
      }
    }
    for (const knownPresentLetter of knownPresentLetters) {
      if (!currentWord.includes(knownPresentLetter)) {
        showToast(`Guess must contain ${knownPresentLetter.toUpperCase()}`);
        return false;
      }
    }
    for (const knownIndex of knownCorrectIndices) {
      if (currentWord[knownIndex] !== correctWord[knownIndex]) {
        const indexString = getStringForIndexNumber(knownIndex);
        showToast(`${indexString} letter must be
          ${correctWord[knownIndex].toUpperCase()}`);
        return false;
      }
    }
    return true;
  }

  const getStringForIndexNumber = (index) => {
    switch(index) {
      case 0:
        return '1st';
      case 1:
        return '2nd';
      case 2:
        return '3rd';
      case 3:
        return '4th';
      case 4:
        return '5th';
      case 5:
        return '6th';
      default:
        return '';
    }
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
        knownCorrectIndices.push(i);
        setKnownCorrectIndices(knownCorrectIndices);
      } else if (!correctWord.includes(currentTiles[i].letter)) {
        currentTiles[i].state = 'absent';
        knownAbsentLetters.push(currentTiles[i].letter);
        setKnownAbsentLetters(knownAbsentLetters);
      } else if (checkForLetterPresence(currentTiles[i].letter, currentTiles, i)) {
        currentTiles[i].state = 'present';
        knownPresentLetters.push(currentTiles[i].letter);
        setKnownPresentLetters(knownPresentLetters);
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

  const checkForGameOver = () => {
    const currentTiles = getCurrentRow().tiles;

    // Check for wrong last guess
    if (currentRowIndexRef.current > 3) {
      for (const tile of currentTiles) {
        if (tile.state !== 'correct') {
          showToast(`The word was ${correctWord.toUpperCase()}`);
          setGameOver(true);
          return;
        }
      }
    }

    // Check for correct guess
    for (const tile of currentTiles) {
      if (tile.state !== 'correct') {
        return;
      }
    }
    showToast('You win!');
    setGameOver(true);
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

  const showToast = (message) => {
    setToast({ message: message, shown: true });
    setTimeout(() => {
      setToast({ message: '', shown: false });
    }, "3000")
  }

  return (
    <>
      <Header />
      <Board rows={rows} />
      <Toast toast={toast} />
    </>
  );
}

export default App;
