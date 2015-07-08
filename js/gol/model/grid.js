/**
 * Class Grid
 * Logic table/grid composition.
 * @version 1.2
 */

/**
 * Constructor.
 * @param row Number of rows.
 * @param cols Number of columns.
 */
function Grid(rows, cols) {
    if (!(typeof rows == "number") || !(typeof cols == "number"))
        throw TypeError("Grid parameters should be a number");

    if (rows < 1) throw RangeError("Rows out of range");
    if (cols < 1) throw RangeError("Columns out of range");

    this._rows = parseInt(rows); /*< Number of rows. */
    this._cols = parseInt(cols); /*< Number of columns. */
    this._grid = new Array(); /*< Logic Grid. */
    this._population = 0; /*< Number of cell alive. */

    // init grid
    for (var i = 0; i < rows; i++) {
        this._grid[i] = new Array();

        for(var j = 0; j < cols; j++)
            this._grid[i][j] = new Cell(i, j);
    }
}

/**
 * Get number of rows.
 * @return Number of rows.
 */
Grid.prototype.getRows = function() {
    return this._rows;
}

/**
 * Get number of columns.
 * @return Number of columns.
 */
Grid.prototype.getCols = function() {
    return this._cols;
}

/**
 * Get number of alive cells.
 * @return Number of alive cells.
 */
Grid.prototype.getPopulation = function() {
    return this._population;
}

/**
 * Update a cell or group of cells.
 * @param c Can be a Cell or Array of Cells.
 */
Grid.prototype.update = function(c) {
    if (Array.isArray(c)) for (var i in c) this._replace(c[i]);
    else this._replace(c);
}

/**
 * Kill all cells.
 */
Grid.prototype.clear = function() {
    for (var i = 0; i < this._rows; i++)
        for (var j = 0; j < this._cols; j++)
            this._grid[i][j].kill();

    this._population = 0;
}

/**
 * Apply logic. Game of Life rules:
 *  - A dead cell with exactly three live neighbors becomes a live cell.
 *  - A live cell with two or three live neighbors stays alive (survival).
 *  - In all other cases, a cell dies or remains dead.
 * @return Array of updated cells.
 */
Grid.prototype.tick = function() {
    var updated = new Array();

    for (var i = 0; i < this._rows; i++)
        for (var j = 0; j < this._cols; j++)
        {
            var c = this._grid[i][j];
            var n = this._neighbors(i, j);

            if (n == 3 && c.isDead() || ((n<2||n>3) && c.isAlive()))
                updated.push(c);
        }

    // toggle all
    updated.every(function(c) {
        c.toggle();
        this._population += c.isAlive() ? 1 : -1;
        return true;
    }.bind(this));
    return updated;
}

/**
 * Checks and replaces a cell.
 * @param c Cell object.
 */
Grid.prototype._replace = function(c) {
    if (!(c instanceof Cell)) throw TypeError("Parameter should be a Cell");

    var row = c.getRow();
    var col = c.getCol();

    if (row < 0 || row >= this._rows) throw RangeError("Row out of range");
    if (col < 0 || col >= this._cols) throw RangeError("Column out of range");

    if (!c.equals(this._grid[row][col])) {
        this._grid[row][col] = c;
        this._population += c.isAlive() ? 1 : -1;
    }
}

/**
 * Get number of alive neighbors from coordinate.
 * @param i Row coordinate.
 * @param j Column coordinate.
 * @return Number of alive neighbors.
 */
Grid.prototype._neighbors = function(i, j) {
    var rows = this._rows;
    var cols = this._cols;
    var g = this._grid;
    var n = 0;

    // top
    if (i > 0) {
        if (j > 0 && g[i-1][j-1].isAlive()) n++;
        if (g[i-1][j].isAlive()) n++;
        if (j + 1 < cols && g[i-1][j+1].isAlive()) n++;
    }

    // sides
    if (j > 0 && g[i][j-1].isAlive()) n++;
    if (j + 1 < cols && g[i][j+1].isAlive()) n++;

    // bottom
    if (i + 1 < rows) {
        if (j > 0 && g[i+1][j-1].isAlive()) n++;
        if (g[i+1][j].isAlive()) n++;
        if (j + 1 < cols && g[i+1][j+1].isAlive()) n++;
    }
    return n;
}
