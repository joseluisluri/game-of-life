/**
 * Class CanvasGrid
 * Visual table/grid composition.
 * @version 1.1
 */

 /**
  * Constructor.
  * @param rows Number of rows.
  * @param cols Number of columns.
  */
function CanvasGrid(rows, cols) {
    if (!(typeof rows == "number") || !(typeof cols == "number"))
        throw TypeError("CanvasGrid parameters should be a number");

    if (rows < 1) throw RangeError("Rows out of range");
    if (cols < 1) throw RangeError("Columns out of range");

    this._rows = parseInt(rows); /*< Number of rows. */
    this._cols = parseInt(cols); /*< Number of columns. */

    /* Canvas width. */
    this._width = CanvasGrid.cellOffsetWidth*cols - CanvasGrid.lineWidth*2;

    /* Canvas height. */
    this._height = CanvasGrid.cellOffsetWidth*rows - CanvasGrid.lineWidth*2;

    /* Canvas element. */
    this._c = document.createElement("canvas");
    this._c.width = this._width;
    this._c.height = this._height;

    /* Canvas context. */
    this._ctx;
    if (!(this._ctx = this._c.getContext("2d")))
        throw new Error("Canvas is not supported");
}

/**
 * Get number of rows.
 * @return Number of rows.
 */
CanvasGrid.prototype.getRows = function() {
    return this._rows;
}

/**
 * Get number of columns.
 * @return Number of columns.
 */
CanvasGrid.prototype.getCols = function() {
    return this._cols;
}

/**
 * Get canvas width (px).
 * @return canvas width (px).
 */
CanvasGrid.prototype.getWidth = function() {
    return this._width;
}

/**
 * Get canvas height (px).
 * @return canvas height (px).
 */
CanvasGrid.prototype.getHeight = function() {
    return this._height;
}

/**
 * Get canvas context.
 * @return canvas context.
 */
CanvasGrid.prototype.getContext = function() {
    return this._context;
}

/**
 * Get canvas element.
 * @return Canvas element.
 */
CanvasGrid.prototype.getCanvas = function() {
    return this._c;
}

/**
 * Draw empty grid.
 */
CanvasGrid.prototype.draw = function() {
    // Background
    this._ctx.clearRect (0, 0, this._width, this._height);
    this._ctx.beginPath();
    this._ctx.fillStyle = CanvasGrid.background;
    this._ctx.fillRect(0, 0, this._width, this._height);

    // Grill
    var x = 0;
    var y = 0;
    this._ctx.lineWidth = CanvasGrid.lineWidth;
    this._ctx.strokeStyle = CanvasGrid.lineColor;

    // Grill horizontal
    for (var i = 1; i <= this._rows; i++) {
        y += CanvasGrid.cellHeight + CanvasGrid.lineWidth;
        this._ctx.strokeStyle = "rgba(255, 255, 255, 0.15);"
        this._ctx.moveTo(x, y);
        this._ctx.lineTo(this._width, y);
        y += CanvasGrid.lineWidth;
    }

    // Grill vertical
    for (var j = 1, y = 0; j <= this._cols; j++) 	{
        x += CanvasGrid.cellWidth + CanvasGrid.lineWidth;
        this._ctx.moveTo(x, y);
        this._ctx.lineTo(x, this._height);
        x += CanvasGrid.lineWidth;
    }
    this._ctx.stroke();
    this._ctx.closePath();
}

/**
 * Fill a cell.
 * @param row Row coordinate.
 * @param col Column coordinate.
 * @param color Color.
 * @param type Type can be "square" or "circle". "Circle" by default.
 */
CanvasGrid.prototype.fill = function(c, color, type) {
    if (!(c instanceof Cell))
        throw TypeError("The argument must be a Cell");

    var row = c.getRow();
    var col = c.getCol();

    if (row < 0 || row >= this._rows) throw RangeError("Row out of range.");
    if (col < 0 || col >= this._cols) throw RangeError("Column out of range.");

    var x = CanvasGrid.cellOffsetWidth  * col;
    var y = CanvasGrid.cellOffsetHeight * row;
    var type = typeof type !== "undefined" ? type : "circle";

    this._ctx.moveTo(x, y);
    this._ctx.fillStyle = color;

    // Square or Circle
    if (type == "square") {
        this._ctx.clearRect(x, y, CanvasGrid.cellWidth,
        CanvasGrid.cellHeight);
        this._ctx.fillRect(x, y, CanvasGrid.cellWidth,
        CanvasGrid.cellHeight, color);
    } else {
        x = Math.round(x + CanvasGrid.cellWidth / 2);
        y = Math.round(y + CanvasGrid.cellHeight / 2);
        this._ctx.beginPath();
        this._ctx.arc(x, y, CanvasGrid.cellWidth / 2, 0, Math.PI*2, true);
        this._ctx.closePath();
        this._ctx.fill();
    }
}

/**
 * Set cell to alive status.
 * @param row Row coordinate.
 * @param col Column coordinate.
 */
CanvasGrid.prototype.alive = function(c) {
    this.fill(c, CanvasGrid.aliveCellColor);
}

/**
 * Set cell to dead status.
 * @param row Row coordinate.
 * @param col Column coordinate.
 */
CanvasGrid.prototype.kill = function(c) {
    this.fill(c, CanvasGrid.deadCellColor, "square");
}

/**
 * Update a cell or group of cells.
 * @param c Can be a Cell or Array of Cells.
 */
CanvasGrid.prototype.update = function(c) {
    if (Array.isArray(c)) for (var i in c) this._replace(c[i]);
    else this._replace(c);
}

/**
 * Replaces a cell.
 * @param c Cell object.
 */
CanvasGrid.prototype._replace = function(c) {
    c.isAlive() ? this.alive(c) : this.kill(c);
}

/**
 * Clear grid.
 */
CanvasGrid.prototype.clear = function(c) {
    typeof c == "undefined" ? this.draw() : this.fill(c, CanvasGrid.background);
}

CanvasGrid.lineWidth = 0.5;
CanvasGrid.lineColor = "rgba(255,255,255, 0.15)"// "#FFFFFF";
CanvasGrid.background = "rgba(0,0,0,0.3)";// "#CCCCCC"
CanvasGrid.cellWidth = 4;
CanvasGrid.cellHeight = 4;
CanvasGrid.cellOffsetWidth  = CanvasGrid.cellWidth  + CanvasGrid.lineWidth * 2;
CanvasGrid.cellOffsetHeight = CanvasGrid.cellHeight + CanvasGrid.lineWidth * 2;
CanvasGrid.borderWidth = 1;
CanvasGrid.borderColor = "#000000";
CanvasGrid.aliveCellColor = "#5bc0de";
CanvasGrid.deadCellColor = "rgba(255, 255, 255, 0.1)";
