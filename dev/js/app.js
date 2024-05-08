window.onload = () => {
    let matrix = [];
    let FlippedMatrix = [];

    const createOGMatrix = (n) => {
        let counter = 1;
        for (let i = 0; i < n; i++) {
            let row = [];
            for (let j = 0; j < n; j++) {
                row.push(counter);
                counter++;
            }
            matrix.push(row);
        }
    };

    const flipMatrix = () => {
        for (let i = 0; i < matrix.length; i++) {
            let row = [];
            for (let j = 0; j < matrix.length; j++) {
                row.push(matrix[matrix.length - j - 1][matrix.length - i - 1]);
            }
            FlippedMatrix.push(row);
        }
    };

    const displayMatrix = (matrix, container) => {
        let table = document.createElement(`table`);
        for (let i = 0; i < matrix.length; i++) {
            let row = document.createElement(`tr`);
            for (let j = 0; j < matrix.length; j++) {
                let cell = document.createElement(`td`);
                cell.innerText = matrix[i][j];
                if (i === j) {
                    cell.classList.add(`diagonal`);
                }
                row.appendChild(cell);
            }
            table.appendChild(row);
        }
        container.appendChild(table);
    };

    const validateInput = (input) => {
        let n = parseInt(input);
        return !isNaN(n) && n >= 2;
    };

    let validInput = false;
    let input;
    do {
        input = window.prompt(`Enter matrix size (at least 2)`);
        validInput = validateInput(input);
        if (!validInput) {
            alert(`Invalid input. Please enter an integer value at least 2.`);
        }
    } while (!validInput);

    createOGMatrix(parseInt(input));
    flipMatrix();

    const canvas = document.createElement(`div`);
    canvas.classList.add(`canvas`);
    document.body.appendChild(canvas);

    const originalMatrixTitle = document.createElement(`h2`);
    originalMatrixTitle.innerText = `OG Matrix`;
    canvas.appendChild(originalMatrixTitle);
    displayMatrix(matrix, canvas);

    const flippedMatrixTitle = document.createElement(`h2`);
    flippedMatrixTitle.innerText = `Fliped Matrix`;
    canvas.appendChild(flippedMatrixTitle);
    displayMatrix(FlippedMatrix, canvas);
};
