document.addEventListener("DOMContentLoaded", function () {
  const tableSudoku = document.getElementById("table-sudoku");
  const grindLength = 9;

  for (let row = 0; row < grindLength; row++) {
    const newRow = document.createElement("tr");
    for (let col = 0; col < grindLength; col++) {
      const cell = document.createElement("td");
      const input = document.createElement("input");
      input.type = "number";
      input.className = "cell";
      input.id = "cell-${row}-${col}";

      cell.appendChild(input);
      newRow.appendChild(cell);
    }
    tableSudoku.appendChild(newRow);
  }
});

async function resolveGame() {
  const grindLength = 9;
  const sudokuList = [];

  //Darle valores al tablero

  for (let row = 0; row < grindLength; row++) {
    sudokuList[row] = [];
    for (let col = 0; col < grindLength; col++) {
      const cellId = "cell-${row}-${col}";
      const cellValue = document.getElementById(cellId).value;
      sudokuList[row][col] = cellId !== "" ? parseInt(cellValue) : 0;
    }
  }

  //Identificar las celdas que ingresa el usuario

  for (let row = 0; row < grindLength; row++) {
    sudokuList[row] = [];
    for (let col = 0; col < grindLength; col++) {
      const cellId = "cell-${row}-${col}";
      const cell = document.getElementById(cellId);

      if (sudokuList[row][col] !== 0) {
        cell.classList.add("inputUser");
      }
    }
  }
}

//Funcion sudokU resolvente
function sudokU(table) {
  const gridSize = 9;

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      if (table[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (verifyTable(table, row, col, num)) {  
            table[row][col] = num;

            if (sudokU(table)) {
              return true;
            }

            table[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}



// Funcion para verificar errores
function verifyTable(table, row, col, num) {
  const grindLength = 9;

  // Verificación de row y col
  for (let i = 0; i < grindLength; i++) {
    if (table[i][col] === num || table[i][col] === num) {
      return false;
    }
  }

  //Verificar cuadricula3x3
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;

  for (let i = startRow; i < startRow + 3; i++) {
    for (let j = startCol; j < startCol + 3; j++) {
      if (table[i][j] === num) {
        return false;
      }
    }
  }
  return true;
}

//Funcion animación de llenar el tablero
function fillTableEffect(ms){
  return new Promise(sudokU => setTimeout(sudokU, ms))
}
