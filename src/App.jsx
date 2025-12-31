import { useEffect, useRef, useState } from 'react';
import { PALATTE_BLANK_COLOR, BACKGROUND_COLOR, CIRCLE_BLANK_COLOR, COLOR_PALETTE } from './Constants.jsx';
import ColorPalette from './ColorPalette.jsx';
import ColorSetHistory from './ColorSetHistory.jsx';
import './indexStyle.css';

//COLOR WHEEL COMPONET AND FUNCTIONALITY 
export default function App() {
  // ==========================================================================
  // GAME STATE (Memory)
  // ==========================================================================
  const [goalColor, setGoalColor] = useState(null);
  const [userColors, setUserColors] = useState([null, null, null]);
  const [guessHistory, setGuessHistory] = useState([]);
  const [hasWon, setHasWon] = useState(null);
  //WORKING HERE
  //haswon = null continue game (user can input and guessHistory<6)
  //haswon = true user wins, no more input
  //haswon = false user loser, no more input

  const canvasRef = useRef(null);
  
  // ==========================================================================
  // CONSTANTS (Never change)
  // ==========================================================================

  //Canvas setup
  const CANVAS_CENTER_X = 125;
  const CANVAS_CENTER_Y = 125;
  const CIRCLE_RADIUS = 110;
  const BORDER_WIDTH = 5;
  
  // Mixing weights
  const COLOR_MIX_WEIGHTS = {
    primary: 0.5,   // 50% of first color
    secondary: 0.3, // 30% of second color
    tertiary: 0.2   // 20% of third color
  };
  
  // ============================================================================
  // Color Helper Functions
  // ============================================================================

  //Converts [255, 0, 0] => "rgb(255, O, O)"
  //WHY: Canvas needs CSS strings, not arrays
  const toRgbString = (rgbArray) => {
    return `rgb(${rgbArray[0]}, ${rgbArray[1]}, ${rgbArray[2]})`;
  };
  
  //Randomly selects 3 unique colors from palette
  const selectRandomColors = () => {
    const selectedColorIndexes = [];
    
    while (selectedColorIndexes.length < 3) {
      const randomIndex = Math.floor(Math.random() * COLOR_PALETTE.length);
      
      if (!selectedColorIndexes.includes(randomIndex)) {
        selectedColorIndexes.push(randomIndex);
      }
    }
    return selectedColorIndexes.map(index => COLOR_PALETTE[index]);
  };
  
  //Mixes 3 colors w/ average
  //INPUT  3x [r,g,b,name]
  //OUTPUT 4x [r,g,b,name]
  const blendColors = (colors) => {
    const primaryColor = colors[0];
    const secondaryColor = colors[1];
    const tertiaryColor = colors[2];
    
    // Calculate weighted RGB values
    const mixedRed = Math.floor(
      primaryColor[0] * COLOR_MIX_WEIGHTS.primary +
      secondaryColor[0] * COLOR_MIX_WEIGHTS.secondary +
      tertiaryColor[0] * COLOR_MIX_WEIGHTS.tertiary
    );
    
    const mixedGreen = Math.floor(
      primaryColor[1] * COLOR_MIX_WEIGHTS.primary +
      secondaryColor[1] * COLOR_MIX_WEIGHTS.secondary +
      tertiaryColor[1] * COLOR_MIX_WEIGHTS.tertiary
    );
    
    const mixedBlue = Math.floor(
      primaryColor[2] * COLOR_MIX_WEIGHTS.primary +
      secondaryColor[2] * COLOR_MIX_WEIGHTS.secondary +
      tertiaryColor[2] * COLOR_MIX_WEIGHTS.tertiary
    );
    
    const mixedColor = [mixedRed, mixedGreen, mixedBlue, 'mixed'];
    
    return [...colors, mixedColor]; //returns 3 colors + mixed color 
  };
  


  // ============================================================================
  // Cicle Drawing Functions
  // ============================================================================

  //Draws base circle + boarder
  const drawSection = (ctx, fillColor, pathFn) => {
    ctx.beginPath();
    pathFn(ctx);
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.strokeStyle = BACKGROUND_COLOR;
    ctx.lineWidth = BORDER_WIDTH;
    ctx.stroke();
  };
  //Draws right semi circle, goal color
  const drawRightHalf = (ctx, color) => {
    drawSection(ctx, color, (ctx) => {
      ctx.arc(CANVAS_CENTER_X, CANVAS_CENTER_Y, CIRCLE_RADIUS, 1.5 * Math.PI, 0.5 * Math.PI);
    });
  };
  //Draws the top left quarter (first color)
  const drawTopLeftQuarter = (ctx, color) => {
    drawSection(ctx, color, (ctx) => {
      ctx.moveTo(CANVAS_CENTER_X, CANVAS_CENTER_Y);
      ctx.arc(CANVAS_CENTER_X, CANVAS_CENTER_Y, CIRCLE_RADIUS, Math.PI, 1.5 * Math.PI);
      ctx.closePath();
    });
  };
  //Draws the middle left slice (second color)
  const drawMiddleLeftSlice = (ctx, color) => {
    drawSection(ctx, color, (ctx) => {
      ctx.moveTo(CANVAS_CENTER_X, CANVAS_CENTER_Y);
      ctx.arc(CANVAS_CENTER_X, CANVAS_CENTER_Y, CIRCLE_RADIUS, 0.7 * Math.PI, Math.PI);
      ctx.closePath();
    });
  };
  //Draws the bottom left slice (third color)
  const drawBottomLeftSlice = (ctx, color) => {
    drawSection(ctx, color, (ctx) => {
      ctx.moveTo(CANVAS_CENTER_X, CANVAS_CENTER_Y);
      ctx.arc(CANVAS_CENTER_X, CANVAS_CENTER_Y, CIRCLE_RADIUS, 0.5 * Math.PI, 0.7 * Math.PI);
      ctx.closePath();
    });
  };
  //Draws the center divider line
  const drawCenterDivider = (ctx) => {
    ctx.beginPath();
    ctx.moveTo(CANVAS_CENTER_X, CANVAS_CENTER_Y - CIRCLE_RADIUS);
    ctx.lineTo(CANVAS_CENTER_X, CANVAS_CENTER_Y + CIRCLE_RADIUS);
    ctx.strokeStyle = BACKGROUND_COLOR;
    ctx.lineWidth = BORDER_WIDTH;
    ctx.stroke();
  };
  //Draw full circle with all sections
  const renderColorWheel = (ctx, rgbStrings) => {
    const [color1, color2, color3, mixedColor] = rgbStrings;
    
    drawTopLeftQuarter(ctx, color1);
    drawMiddleLeftSlice(ctx, color2);
    drawBottomLeftSlice(ctx, color3);
    drawRightHalf(ctx, mixedColor);
    drawCenterDivider(ctx);
  };


  
  // ============================================================================
  // Game Logic / User Input 
  // ============================================================================

  //Creates new game
  const startNewPuzzle = () => {
    //Set up
    const randomColors = selectRandomColors();
    const fourColors = blendColors(randomColors);
    const goalColor = fourColors[3];

    console.log("🎯 ANSWER:", randomColors.map(c => c[3])); //Show color names
    console.log("🎨 Goal RGB:", goalColor);
    
    //Reset existing values
    setGoalColor(goalColor);
    setUserColors([null, null, null]);
    setGuessHistory([]);
    setHasWon(null);

    //Save color set as JSON
    const puzzleData = {
      goalColor: goalColor,
      userColors: [null, null, null],
      guessHistory: [],
      hasWon: false
    };
    localStorage.setItem('currentPuzzle', JSON.stringify(puzzleData));
  };

  function handleColorsChange(newColors) {
    setUserColors(newColors);
  }

  //Update set history to include new set
  //WORKING HERE
  function handleColorSetSubmission(newColors) {
    const newColorMixed = blendColors(newColors);
    setGuessHistory(prev => [...prev, newColorMixed]); //setGuessHistory([...guessHistory, fourColorArray])
    //WIN CONDITION (hasWon)
    //if guessHistory.length() >= 6 and newColorMixed[3] != goal color, then user loses
    if((guessHistory.length>=6) && (toRgbString(newColorMixed[3]) != toRgbString(goalColor))){
      setHasWon(false);
    }
    //else, user wins
    else if(toRgbString(newColorMixed[3]) == toRgbString(goalColor)){
      setHasWon(true);
    }
    /*
    if(hasWon!=null){
      displayWinCondition(hasWon);
    }
    */
  }

  function displayWinCondition(hasWon) {
    //need pop up for both with a restart button
  }
  
  // ============================================================================
  // Component Lifecycle
  // ============================================================================
  
  //===FIRST GEN
  useEffect(() => {
    const savedPuzzle = localStorage.getItem('currentPuzzle');

    //Pull local saved data else make new set
    if(savedPuzzle) {
      const puzzleData = JSON.parse(savedPuzzle);
      setGoalColor(puzzleData.goalColor);
      //setUserColors(puzzleData.userColors);
      setGuessHistory(puzzleData.guessHistory);
    setHasWon(puzzleData.hasWon);
    } else {
      startNewPuzzle();
    }
  }, []); //Runs when page first loads

  //===Redraw if goalColor or userColors changes (full reset or user input)
  useEffect(() => {
    //Only run if canvas and goal were set up
    if (!canvasRef.current) {
      return;
    }
    if (!goalColor) {
      return;
    }
    
    //Update game state info
    const ctx = canvasRef.current.getContext('2d');
    //Convert to RGB strings (if else)
    let color1;
    if (userColors[0]) {
      color1 = toRgbString(userColors[0]);
    } else {
      color1 = CIRCLE_BLANK_COLOR;
    }
    
    let color2;
    if (userColors[1]) {
      color2 = toRgbString(userColors[1]);
    } else {
      color2 = CIRCLE_BLANK_COLOR;
    }
    
    let color3;
    if (userColors[2]) {
      color3 = toRgbString(userColors[2]);
    } else {
      color3 = CIRCLE_BLANK_COLOR;
    }
    const goal = toRgbString(goalColor);

    //Update color wheel
    renderColorWheel(ctx, [color1, color2, color3, goal]);
  }, [goalColor, userColors]);

  //===Save progress whenever game state changes
  useEffect(() => {
    //Only run if canvas and goal were set up
    if (!canvasRef.current) {
      return;
    }
    if (!goalColor) {
      return;
    }
    
    const puzzleData = {
      goalColor: goalColor,
      userColors: userColors,
      guessHistory: guessHistory,
      hasWon: hasWon
    };
    
    localStorage.setItem('currentPuzzle', JSON.stringify(puzzleData));
  }, [goalColor, userColors, guessHistory, hasWon]);

  // ============================================================================
  // Page Render
  // ============================================================================
  return (
    <>
      <div className="headerDiv">
        <h1>Colorlez</h1>
        <p>Not colorfle and not made by the same creator just a practice and I want to play a endless version of the game</p>
      </div>
      
      <div className="mainDiv">
        <div className="sectorDiv">
          <canvas 
            ref={canvasRef}
            id="myCanvas" 
            width={250} 
            height={250}
          />
        </div>
        
      </div>
      <button className="button" onClick={startNewPuzzle}>
          New Puzzle
      </button>
      <div className="historyDiv">
        <ColorSetHistory 
          history={guessHistory}
        />
      </div>
      <div className="paletteDiv">
        <ColorPalette 
          onChange={handleColorsChange}
          onSubmit={handleColorSetSubmission}
        />
      </div>
    </>
  );
}