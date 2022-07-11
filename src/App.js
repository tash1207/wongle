import { useEffect, useRef, useState } from 'react'
import Board from './components/Board'
import Header from './components/Header'

function App() {
  const [rows, _setRows] = useState([]);
  const [currentRowIndex, _setCurrentRowIndex] = useState(1);
  const [currentTileIndex, _setCurrentTileIndex] = useState(0);

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
      setRows([row1Tiles, Row(), Row(), Row(), Row()]);
    }

    initRows();
    document.addEventListener('keydown', onKeyDown);
  }, []);

  const onKeyDown = (e) => {
    const key = e.key;
    if (/^[a-z]$/i.test(key)) {
      const currentRow = getCurrentRow();
      const currentTile = currentRow.tiles[currentTileIndexRef.current];
      currentTile.letter = key;
      setRows([...rowsRef.current]);
      if (currentTileIndexRef.current < 5) {
        setCurrentTileIndex(currentTileIndexRef.current + 1);
      }
    } else if (key === 'Enter') {
      if (validateEnterPress()) {
        // TODO update tile states to absent, correct, present
        setCurrentRowIndex(currentRowIndexRef.current + 1);
        setCurrentTileIndex(0);
      }
    } else if (key === 'Backspace' && currentTileIndexRef.current !== 0) {
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

  const row1Tiles = Row([
    Tile('w', 'correct'),
    Tile('o', 'correct'),
    Tile('n', 'present'),
    Tile('g', 'absent'),
    Tile('l', 'present'),
    Tile('e', 'present'),
  ]);

  return (
    <>
      <Header />
      <Board rows={rows} />
    </>
  );
}

export default App;
