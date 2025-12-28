import { useEffect, useRef, useState } from 'react';
import './indexStyle.css';

//Reusable Items
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



export default function ColorPalette() {
  //Setup
  const BLANK_COLOR = "rgb(211, 211, 211)";
  const [selectedColors, setSelectedColors] = useState(Array(3).fill(null));
  const toRgbString = (rgbArray) => {
    return `rgb(${rgbArray[0]}, ${rgbArray[1]}, ${rgbArray[2]})`;
  };

  // Color palette
  const COLOR_PALETTE = [
    [255, 255, 255, 'white'], 
    [255, 250, 200, 'cream'], 
    [255, 225, 25, 'yellow'], 
    [245, 130, 49, 'orange'], 
    [154, 99, 36, 'brown'], 
    [230, 25, 75, 'fuchsia'],
    [128, 0, 0, 'red'],  
    [70, 240, 240, 'cyan'], 
    [170, 255, 195, 'mint'], 
    [188, 246, 12, 'lime'], 
    [60, 180, 75, 'green'], 
    [128, 128, 0, 'olive'], 
    [0, 128, 128, 'teal'], 
    [250, 190, 190, 'pink'], 
    [230, 190, 255, 'lavender'], 
    [240, 50, 230, 'magenta'], 
    [145, 30, 180, 'purple'], 
    [67, 99, 216, 'blue'], 
    [0, 0, 117, 'navy'], 
    [0, 0, 0, 'black']
  ];

  //Action
  function handleColorClick(colorIndex) {
    //Dont update if array is full
    if(selectedColors[2] != null){
      return;
    }

    //React is dumb
    const nextSelectedColors = selectedColors.slice();

    //Add color to first empty location
    for (let i = 0; i < 3; i++) {
      if (!nextSelectedColors[i]) {
        nextSelectedColors[i] = COLOR_PALETTE[colorIndex];
        break;
      }
    }
    setSelectedColors(nextSelectedColors);
  }



  //Output
  return (
    <>
      {/* User Selected Colors Display */}
      <div className="board-row">
        <ColorButton 
          color={selectedColors[0] ? toRgbString(selectedColors[0]) : {BLANK_COLOR}} 
          onClick={() => {}} 
        />
        <ColorButton 
          color={selectedColors[1] ? toRgbString(selectedColors[1]) : {BLANK_COLOR}} 
          onClick={() => {}} 
        />
        <ColorButton 
          color={selectedColors[2] ? toRgbString(selectedColors[2]) : {BLANK_COLOR}} 
          onClick={() => {}} 
        />
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
      </div>
      <div className="board-row">
        <ColorButton color={toRgbString(COLOR_PALETTE[7])} onClick={() => handleColorClick(7)} />
        <ColorButton color={toRgbString(COLOR_PALETTE[8])} onClick={() => handleColorClick(8)} />
        <ColorButton color={toRgbString(COLOR_PALETTE[9])} onClick={() => handleColorClick(9)} />
        <ColorButton color={toRgbString(COLOR_PALETTE[10])} onClick={() => handleColorClick(10)} />
        <ColorButton color={toRgbString(COLOR_PALETTE[11])} onClick={() => handleColorClick(11)} />
        <ColorButton color={toRgbString(COLOR_PALETTE[12])} onClick={() => handleColorClick(12)} />
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