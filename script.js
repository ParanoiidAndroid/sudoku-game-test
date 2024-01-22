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

  for (let row = 0; row < grindLength; row++) {
    sudokuList[row] = [];
    for (let col = 0; col < grindLength; col++) {
      const cellId = "cell-${row}-${col}";
      const cellValue = document.getElementById(cellId).value;
      sudokuList[row][col] = cellId !== "" ? parseInt(cellValue) : 0;
    }
  }

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
