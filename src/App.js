import { useEffect, useRef, useState } from 'react'
import Board from './components/Board'
import Button from './components/Button'
import Header from './components/Header'
import Keyboard from './components/Keyboard'
import Toast from './components/Toast'
import answerList from './answerList.json'
import wordList from './wordList.json'

function App() {
  const [correctWord, _setCorrectWord] = useState('');
  const [currentRowIndex, _setCurrentRowIndex] = useState(0);
  const [currentTileIndex, _setCurrentTileIndex] = useState(1);
  const [gameOver, _setGameOver] = useState(false);
  const [kbRow1, _setKbRow1] = useState([]);
  const [kbRow2, _setKbRow2] = useState([]);
  const [kbRow3, _setKbRow3] = useState([]);
  const [knownAbsentLetters, _setKnownAbsentLetters] = useState([]);
  const [knownCorrectIndices, _setKnownCorrectIndices] = useState([]);
  const [knownPresentLetters, _setKnownPresentLetters] = useState([]);
  const [rows, _setRows] = useState([]);
  const [toast, setToast] = useState({message: '', shown: false});

  const correctWordRef = useRef(correctWord);
  const setCorrectWord = (data) => {
    correctWordRef.current = data;
    _setCorrectWord(data);
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

  const gameOverRef = useRef(gameOver);
  const setGameOver = (data) => {
    gameOverRef.current = data;
    _setGameOver(data);
  }

  const kbRow1Ref = useRef(kbRow1);
  const setKbRow1 = (data) => {
    kbRow1Ref.current = data;
    _setKbRow1(data);
  }

  const kbRow2Ref = useRef(kbRow2);
  const setKbRow2 = (data) => {
    kbRow2Ref.current = data;
    _setKbRow2(data);
  }

  const kbRow3Ref = useRef(kbRow3);
  const setKbRow3 = (data) => {
    kbRow3Ref.current = data;
    _setKbRow3(data);
  }

  const knownAbsentLettersRef = useRef(knownAbsentLetters);
  const setKnownAbsentLetters = (data) => {
    knownAbsentLettersRef.current = data;
    _setKnownAbsentLetters(data);
  }

  const knownCorrectIndicesRef = useRef(knownCorrectIndices);
  const setKnownCorrectIndices = (data) => {
    knownCorrectIndicesRef.current = data;
    _setKnownCorrectIndices(data);
  }

  const knownPresentLettersRef = useRef(knownPresentLetters);
  const setKnownPresentLetters = (data) => {
    knownPresentLettersRef.current = data;
    _setKnownPresentLetters(data);
  }

  const rowsRef = useRef(rows);
  const setRows = (data) => {
    rowsRef.current = data;
    _setRows(data);
  }

  const validWords = wordList;
  const wordBank =  answerList;

  const Row = (tiles) => {
    return {
      tiles : tiles || getDefaultTiles(),
      isValidWord : true,
    }
  }

  const Tile = (letter) => {
    return {
      letter : letter || '',
      state : 'tbd',
    }
  }

  const Key = (letter) => {
    let key = letter;
    if (letter === 'ent') {
      key = 'Enter';
    } else if (letter === 'bksp') {
      key = 'Backspace';
    }
    return {
      letter : letter,
      key : key,
      state : 'tbd',
    }
  }

  useEffect(() => {
    setCorrectWord(getRandomWord());
    initRows();
    initKeyboard();
    document.addEventListener('keydown', onKeyDown);
  }, []);

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

  const initKeyboard = () => {
    const topKeys = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
    const midKeys = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
    const botKeys = ['ent', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'bksp'];

    const firstRow = topKeys.map((letter) => Key(letter));
    const secondRow = midKeys.map((letter) => Key(letter));
    const thirdRow = botKeys.map((letter) => Key(letter));

    setKbRow1(firstRow);
    setKbRow2(secondRow);
    setKbRow3(thirdRow);
  }

  const onKeyDown = (e) => {
    onKeyboardPress(e.key);
  }

  const onKeyboardPress = (key) => {
    if (gameOverRef.current) {
      return;
    }
    getCurrentRow().isValidWord = true;
    setRows([...rowsRef.current]);
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
    for (const knownAbsentLetter of knownAbsentLettersRef.current) {
      if (currentWord.includes(knownAbsentLetter)) {
        showToast(`Guess should not contain ${knownAbsentLetter.toUpperCase()}`);
        return false;
      }
    }
    for (const knownPresentLetter of knownPresentLettersRef.current) {
      if (!currentWord.includes(knownPresentLetter)) {
        showToast(`Guess must contain ${knownPresentLetter.toUpperCase()}`);
        return false;
      }
    }
    for (const knownIndex of knownCorrectIndicesRef.current) {
      if (currentWord[knownIndex] !== correctWordRef.current[knownIndex]) {
        const indexString = getStringForIndexNumber(knownIndex);
        showToast(`${indexString} letter must be
          ${correctWordRef.current[knownIndex].toUpperCase()}`);
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
      if (currentTiles[i].letter === correctWordRef.current[i]) {
        currentTiles[i].state = 'correct';
        updateKeyboard(currentTiles[i].letter, 'correct');
        knownCorrectIndicesRef.current.push(i);
        setKnownCorrectIndices(knownCorrectIndicesRef.current);
      } else if (!correctWordRef.current.includes(currentTiles[i].letter)) {
        currentTiles[i].state = 'absent';
        updateKeyboard(currentTiles[i].letter, 'absent');
        knownAbsentLettersRef.current.push(currentTiles[i].letter);
        setKnownAbsentLetters(knownAbsentLettersRef.current);
      } else if (checkForLetterPresence(currentTiles[i].letter, currentTiles, i)) {
        currentTiles[i].state = 'present';
        updateKeyboard(currentTiles[i].letter, 'present');
        knownPresentLettersRef.current.push(currentTiles[i].letter);
        setKnownPresentLetters(knownPresentLettersRef.current);
      } else {
        currentTiles[i].state = 'absent';
        updateKeyboard(currentTiles[i].letter, 'absent');
      }
    }
    setRows([...rowsRef.current]);
  }

  const updateKeyboard = (letter, state) => {
    setKbRow1(kbRow1Ref.current.map((key) =>
      key.letter === letter ? {...key, state: state} : key));
    setKbRow2(kbRow2Ref.current.map((key) =>
      key.letter === letter ? {...key, state: state} : key));
    setKbRow3(kbRow3Ref.current.map((key) =>
      key.letter === letter ? {...key, state: state} : key));
  }

  const checkForLetterPresence = (letter, currentTiles, index) => {
    let correctInstances = 0;
    let occurrences = 0;
    let currentIndex = correctWordRef.current.indexOf(letter);
    while (currentIndex !== -1) {
      occurrences++;
      if (currentTiles[currentIndex].letter === letter) {
        correctInstances++;
      }
      currentIndex = correctWordRef.current.indexOf(letter, currentIndex + 1);
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
          showToast(`The word was ${correctWordRef.current.toUpperCase()}`,
            /* displayForever= */ true);
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
    showToast('U Found Out!', /* displayForever= */ true);
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

  const getRandomWord = () => {
    return wordBank[Math.floor(Math.random() * wordBank.length)];
  }

  const showToast = (message, displayForever) => {
    setToast({ message: message, shown: true });
    if (!displayForever) {
      setTimeout(() => {
        setToast({ message: '', shown: false });
      }, "3000");
    }
  }

  const onShare = () => {
    let resultString = 'Wongle';
    for (const row of rows) {
      resultString += '\n';
      for (const tile of row.tiles) {
        if (tile.state === 'correct') {
          resultString += '💚';
        } else if (tile.state === 'present') {
          resultString += '💛';
        } else if (tile.state === 'absent') {
          resultString += '⚪';
        } else if (tile.state === 'tbd') {
          break;
        }
      }
    }
    navigator.clipboard.writeText(resultString);
  }

  const onNewGame = () => {
    setCorrectWord(getRandomWord());
    setKnownAbsentLetters([]);
    setKnownCorrectIndices([]);
    setKnownPresentLetters([]);
    setToast({ message: '', shown: false });
    setCurrentRowIndex(0);
    setCurrentTileIndex(1);
    initRows();
    initKeyboard();
    setGameOver(false);
  }

  return (
    <>
      <Header />
      <Board rows={rows} />
      <Toast toast={toast} />
      {gameOver && <Button text='Copy results' onClick={onShare} />}
      {gameOver && <Button text='New game' onClick={onNewGame} />}
      <Keyboard rows={[kbRow1, kbRow2, kbRow3]}
        onKeyPress={onKeyboardPress} />
    </>
  );
}

export default App;
