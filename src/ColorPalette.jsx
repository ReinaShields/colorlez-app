import { useEffect, useRef, useState } from 'react';
import { PALATTE_BLANK_COLOR, COLOR_PALETTE } from './Constants.jsx';
import './indexStyle.css';

// ============================================================================
// Buttons
// ============================================================================
function DisplaySquare({ color }){
  return (
    <button 
      className="displaySqaureDiv"
      style={{ backgroundColor: color }}
    >
    </button>
  );
}

function ColorButton({ color, onClick }) {
  return (
    <button 
      className="colorButtonDiv"
      style={{ backgroundColor: color }}
      onClick={ onClick }  
    >
    </button>
  );
}

function Backspace({ onClick }){
  return (
    <button 
      className="backspaceButtonDiv"
      onClick={ onClick }
    >
    Back
    </button>
  );
}

function EnterButton({ onClick }){
  return (
    <button 
      className="enterButtonDiv"
      onClick={ onClick }
    >
    Enter
    </button>
  );
}




export default function ColorPalette({ onChange }) {
  // ============================================================================
  // Setup
  // ============================================================================
  const [selectedColors, setSelectedColors] = useState([null, null, null]);
  const toRgbString = (rgbArray) => {
    return `rgb(${rgbArray[0]}, ${rgbArray[1]}, ${rgbArray[2]})`;
  };



  // ============================================================================
  // Button Logic
  // ============================================================================
  //===Update array if color is selected
  function handleColorClick(colorIndex) {
    //Dont update if array is full
    if(selectedColors[2] != null){
      return;
    }
    
    //Dont update if new color is already in array
    const newColor = COLOR_PALETTE[colorIndex];
    const isAlreadySelected = selectedColors.some(c => c !== null && c[3] === newColor[3]);
    if (isAlreadySelected) {
        return;
    }

    //React is dumb
    const nextSelectedColors = selectedColors.slice();

    //Add color to first empty location
    for (let i = 0; i < 3; i++) {
      if (!nextSelectedColors[i]) {
        nextSelectedColors[i] = newColor;
        break;
      }
    }
    setSelectedColors(nextSelectedColors); //Update ColorPalette.jsx
    onChange(nextSelectedColors); //Update App.jsx
  }

  //===Backspace clicker
  function handleBackspaceClick() {
    //Dont update if array is empty
    if(selectedColors[0] == null){
      return;
    }

    const nextSelectedColors = selectedColors.slice();

    //Delete color from most recently filled location
    for (let i = 2; i >= 0; i--) {
      if (nextSelectedColors[i] !== null) {
        nextSelectedColors[i] = null;
        break;
      }
    }
    setSelectedColors(nextSelectedColors); //Update ColorPalette.jsx
    onChange(nextSelectedColors); //Update App.jsx
  }

  //===Enter Clicker
  function handleEnterButtonClick(){
    //Dont update if array is NOT full
    if(selectedColors[2] == null){
      return;
    }
    
  }


  // ============================================================================
  // Output
  // ============================================================================
  return (
    <>
      {/* User Selected Colors Display */}
      <div className="displayDiv">
      <div className="board-row">
        <DisplaySquare 
          color={selectedColors[0] ? toRgbString(selectedColors[0]) : PALATTE_BLANK_COLOR} 
        />
        <DisplaySquare 
          color={selectedColors[1] ? toRgbString(selectedColors[1]) : PALATTE_BLANK_COLOR} 
        />
        <DisplaySquare 
          color={selectedColors[2] ? toRgbString(selectedColors[2]) : PALATTE_BLANK_COLOR} 
        />
      </div>
      </div>

      {/* Color Palette */}
      <div className="board-row">
        <ColorButton color={toRgbString(COLOR_PALETTE[0])} onClick={() => handleColorClick(0)} />
        <ColorButton color={toRgbString(COLOR_PALETTE[1])} onClick={() => handleColorClick(1)} />
        <ColorButton color={toRgbString(COLOR_PALETTE[2])} onClick={() => handleColorClick(2)} />
        <ColorButton color={toRgbString(COLOR_PALETTE[3])} onClick={() => handleColorClick(3)} />
        <ColorButton color={toRgbString(COLOR_PALETTE[4])} onClick={() => handleColorClick(4)} />
        <ColorButton color={toRgbString(COLOR_PALETTE[5])} onClick={() => handleColorClick(5)} />
        <ColorButton color={toRgbString(COLOR_PALETTE[6])} onClick={() => handleColorClick(6)} />
        <Backspace onClick={() => handleBackspaceClick()} />
      </div>
      <div className="board-row">
        <ColorButton color={toRgbString(COLOR_PALETTE[7])} onClick={() => handleColorClick(7)} />
        <ColorButton color={toRgbString(COLOR_PALETTE[8])} onClick={() => handleColorClick(8)} />
        <ColorButton color={toRgbString(COLOR_PALETTE[9])} onClick={() => handleColorClick(9)} />
        <ColorButton color={toRgbString(COLOR_PALETTE[10])} onClick={() => handleColorClick(10)} />
        <ColorButton color={toRgbString(COLOR_PALETTE[11])} onClick={() => handleColorClick(11)} />
        <ColorButton color={toRgbString(COLOR_PALETTE[12])} onClick={() => handleColorClick(12)} />
        <EnterButton onClick={() => handleEnterButtonClick()} />
      </div>
      <div className="board-row">
        <ColorButton color={toRgbString(COLOR_PALETTE[13])} onClick={() => handleColorClick(13)} />
        <ColorButton color={toRgbString(COLOR_PALETTE[14])} onClick={() => handleColorClick(14)} />
        <ColorButton color={toRgbString(COLOR_PALETTE[15])} onClick={() => handleColorClick(15)} />
        <ColorButton color={toRgbString(COLOR_PALETTE[16])} onClick={() => handleColorClick(16)} />
        <ColorButton color={toRgbString(COLOR_PALETTE[17])} onClick={() => handleColorClick(17)} />
        <ColorButton color={toRgbString(COLOR_PALETTE[18])} onClick={() => handleColorClick(18)} />
        <ColorButton color={toRgbString(COLOR_PALETTE[19])} onClick={() => handleColorClick(19)} />
      </div>
    </>
  );
}