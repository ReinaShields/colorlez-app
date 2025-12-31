import { useEffect, useRef, useState } from 'react';
import { PALATTE_BLANK_COLOR, BACKGROUND_COLOR, CIRCLE_BLANK_COLOR, COLOR_PALETTE } from './Constants.jsx';
import ColorPalette from './ColorPalette.jsx';
import './indexStyle.css';

// ============================================================================
// Setup
// ============================================================================
const toRgbString = (rgbArray) => {
  return `rgb(${rgbArray[0]}, ${rgbArray[1]}, ${rgbArray[2]})`;
};

// ============================================================================
// Buttons
// ============================================================================

//TODO does this need to be a button? Can it be a div?
function DisplaySquareSet({ selectedColors }){
  const firstColor = selectedColors[0] ? toRgbString(selectedColors[0]) : PALATTE_BLANK_COLOR;
  const secondColor = selectedColors[1] ? toRgbString(selectedColors[1]) : PALATTE_BLANK_COLOR;
  const thirdColor = selectedColors[2] ? toRgbString(selectedColors[2]) : PALATTE_BLANK_COLOR;
  const mixedColor = selectedColors[3] ? toRgbString(selectedColors[3]) : PALATTE_BLANK_COLOR;

  return (
    <div className="board-row">
    <button className="displaySqaureDiv" style={{ backgroundColor: firstColor }} />
    <button className="displaySqaureDiv" style={{ backgroundColor: secondColor }} />
    <button className="displaySqaureDiv" style={{ backgroundColor: thirdColor }} />
    <button className="displaySqaureDiv" style={{ backgroundColor: mixedColor }} />
    </div>
    
  );
}




export default function ColorSetHistory({ history }) {
  const allSixSlots = [...history];
  while (allSixSlots.length < 6) {
    allSixSlots.push(null); //fill empty sets to [null,null,null]
  }

  return(
      <div className="historyDisplayDiv">
        {allSixSlots.map((guess, index) => (
          <DisplaySquareSet 
            key={index}
            selectedColors={guess || [null, null, null, null]}  // Pass 4-item array or nulls
          />
        ))}
      </div>
  );
}