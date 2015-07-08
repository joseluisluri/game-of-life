/**
 * Class Cell
 * Logic cell representation.
 * @version 2.0
 */

/**
 * Constructor.
 * @param row Row coordinate.
 * @param col Colum coordinate.
 */
function Cell(row, col, status) {
    this._row = row; /*< Row coordinate. */
    this._col = col; /*< Column coordinate. */
    this._status = status || false; /*< Cell status. true: alive, false: dead */
}

/**
 * Get the cell status.
 * @return Returns true if cell is alive, false otherwise.
 */
Cell.prototype.isAlive = function() {
    return this._status;
}

/**
 * Get the cell status.
 * @return Returns true if cell is dead, false otherwise.
 */
Cell.prototype.isDead = function() {
    return !this._status;
}

/**
 * Get the cell row.
 * @return Row coordinate.
 */
Cell.prototype.getRow = function() {
    return this._row;
}

/**
 * Get the cell column.
 * @return Column coordinate.
 */
Cell.prototype.getCol = function() {
    return this._col;
}

/**
 * Set cell to dead status.
 * @return Returns true when an alive cell was killed, false otherwise.
 */
Cell.prototype.kill = function() {
    this._status = false;
}

/**
 * Set cell to alive status.
 * @return Returns true when a dead cell becomes alive, false otherwise.
 */
Cell.prototype.alive = function() {
    this._status = true;
}

/**
 * Toggle cell status (alive or dead).
 */
Cell.prototype.toggle = function() {
    this._status = !this._status;
}

/**
 * Compare two cells.
 * @return Returns true when are equals, false otherwise.
 */
Cell.prototype.equals = function(other) {
    return other instanceof Cell && this._row == other._row
    && this._col == other._col && this._status == other._status;
}
