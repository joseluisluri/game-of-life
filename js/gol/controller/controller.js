/**
 * Class Controller
 * ActionController.
 * @version 1.0
 */

 /**
  * Constructor.
  * @param id Id attribute of an container element.
  * @param rows Number of rows.
  * @param cols Number fo columns.
  */
function Controller(id, rows, cols) {
    this._id = id; /*< Id attribue of an container element. */
    this._rows = rows; /*< Number of rows. */
    this._cols = cols; /*< Number of columns. */
    this._grid = new Grid(rows, cols); /*< Logic Grid. */
    this._canv = new CanvasGrid(rows, cols); /*< Visual Grid. */
    this._mouse = { x : 0, y : 0, click : false } /*< Mouse input. */

    // Info
    this._generated = 0; /*< Number of cell turned on. */
    this._cycles = 0; /*< Number of cycles completed. */

    // Execution
    this._run = false; /*< Enable/Disable execution. */
    this._stepper = false; /*< Enable/Disable Step by step execution. */
    this._step = 0; /*< Countdown steps. */

    // DOM
    this._e = $(id); /*< Reference to DOM container element. */
    this._c = $(this._canv.getCanvas()); /*< Canvas DOM Element */

    // Events
    this._c.bind("mousemove mousedown mouseup mouseleave", {
        ctl: $(this)
    }, function(event) {
        event.data.ctl[0]._mouseCallback(event);
    });

    // Render
    this._canv.draw();
    this._e.empty();
    this._e.append(this._c);
}

/**
 * Get number of alive cells.
 * @returns Number of alive cells.
 */
Controller.prototype.getPopulation = function() {
    return this._grid.getPopulation();
}

/**
 * Get number of cycles.
 * @returns Number of cycles.
 */
Controller.prototype.getCycles = function() {
    return this._cycles;
}

/**
 * Enable execution.
 */
Controller.prototype.run = function() {
    this._run = true;
    this._stepper = false;
}

/**
 * Stop execution.
 */
Controller.prototype.stop = function() {
    this._run = false;
    this._stepper = false;
}

/**
 * Enable step by step execution.
 */
Controller.prototype.next = function() {
    this._run = false;
    this._stepper = true;
    this._step = 1;
}

/**
 * Stop execution and clear all.
 */
Controller.prototype.clear = function() {
    this.stop();
    this._cycles = 0;
    this._generated = 0;
    this._canv.clear();
    this._grid.clear();
}

/**
 * Get number of rows.
 * @return Number of rows.
 */
Controller.prototype.getRows = function() {
    return this._rows;
}

/**
 * Get number of columns.
 * @return Number of columns.
 */
Controller.prototype.getCols = function() {
    return this._cols;
}
/**
 * Restart execution and draw pattern.
 * @param pattern Array<Cell>
 * @param pos Absolute position. Default: {row: 0, col: 0}.
 */
Controller.prototype.load = function(pattern, pos) {
    var pos = pos || {row: 0, col: 0};
    this.clear();
    pattern.forEach(function(c) {
        var row = c.getRow() + pos.row;
        var col = c.getCol() + pos.col;
        var n = new Cell(row, col, true);
        this._grid.update(n);
        this._canv.update(n);
    }.bind(this));
}

/**
 * Mouse Callback for canvas mouse events.
 * @param event Event Info.
 */
Controller.prototype._mouseCallback = function(event) {
    switch(event.type) {
        case "mousedown": this._mouseDownCallback(event); // no break
        case "mousemove": this._mouseMoveCallback(event); break;
        case "mouseleave": this._mouseLeaveCallback(event); break;
        case "mouseup": this._mouseUpCallback(event);
    }
}

/**
 * Mouse Callback for canvas mouse down event.
 * @param event Event Info.
 */
Controller.prototype._mouseDownCallback = function(event) {
    this._mouse.click = true;
}

/**
 * Mouse Callback for canvas mouse leave event.
 * @param event Event Info.
 */
Controller.prototype._mouseLeaveCallback = function(event) {
    this._mouse.click = false;
}

/**
 * Mouse Callback for canvas mouse up event.
 * @param event Event Info.
 */
Controller.prototype._mouseUpCallback = function(event) {
    this._mouse.click = false;
}

/**
 * Mouse Callback for canvas mouse move event.
 * @param event Event Info.
 */
Controller.prototype._mouseMoveCallback = function(event) {
    if (this._mouse.click) {
        var offset = this._c.offset();
        var x = offset.left;
        var y = offset.top;

        this._mouse.x = event.pageX - x;
        this._mouse.y = event.pageY - y;

        var row = Math.floor(this._mouse.y / CanvasGrid.cellOffsetHeight);
        var col = Math.floor(this._mouse.x / CanvasGrid.cellOffsetWidth);

        var c = new Cell(row, col);
        c.alive();
        this._grid.update(c);
        this._canv.update(c);
    }
}

Controller.prototype.refresh = function() {
    if (!this.getPopulation()) this.stop();

    if (this._run || (this._stepper && this._step > 0)) {
        var updated = this._grid.tick();
        this._canv.update(updated);
        this._cycles++;
    }
    this._step--;
}
