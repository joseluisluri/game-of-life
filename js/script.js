/**
 * Preloader.
 */
$(document).ready(function() {
    // Show loader
    var load = $('<div></div>');
    load.attr('id', 'loader');
    $('body').append(load);

    $.when(
        jQuery.getScript("js/jquery/jquery-ui.js"),
        jQuery.getScript("js/gol/model/cell.js"),
        jQuery.getScript("js/gol/model/grid.js"),
        jQuery.getScript("js/gol/view/canvasgrid.js"),
        jQuery.getScript("js/gol/controller/controller.js"),
        jQuery.getScript("js/gol/gol.js"),
        $.Deferred(function(deferred){
            $(deferred.resolve);
        })).done(main); // main();
});

/**
 * JavaScript Main Function.
 */
function main() {
    // Load libraries
    var id = '#game';
    var width  = $(id).width();
    var height = $(id).height();

    var cols = Math.ceil(width / 5);
    var rows = Math.ceil(height / 5);

    // Speed
    var speed = new SpeedController(1);

    //try {
        var gol = new GameofLife(id, rows, cols);
        $.getJSON("template/logo.json", function(json){
            var c = [];
            json.forEach(function(e) { c.push(new Cell(e[0], e[1], true)) });
            gol.load(c, {row: 10, col: cols / 2 - 37});
        });
        function foo() { gol.refresh(); setTimeout(foo, speed.val()); };
        foo();
    //} catch(e) {
    //    alert(`ERROR!: ${e}`);
    //}

    // Create controls dialog
    $('#controls').dialog({
        my: 'left bottom',
        at: 'left bottom',
        of: window,
        show: {effect: 'bounce', duration: 'fast'},
        hide: {effect: 'bounce', duration: 'fast'},
        autoOpen: false
    });

    // Side Panel
    $('#panel article').hide();
    $('#panel').data('layer', 'about'); // default article
    $('#about').show();
    hide_panel();

    // Button Play
    $('#btn_play').click(function() {
        gol.run();
        notify('Go!');
        return false;
    });

    // Button Stop
    $('#btn_stop').click(function() {
        gol.stop();
        notify('Paused');
        return false;
    });

    // Button Speed Down
    $('#btn_spdown').click(function() {
        speed.down();
        notify(speed.mode());
        return false;
    });

    // Button Speed Up
    $('#btn_spup').click(function() {
        speed.up();
        notify(speed.mode());
        return false;
    });

    // Button Next Step
    $('#btn_step').click(function() {
        gol.next();
        notify('Step by step');
        return false;
    });

    // Button Clear (Delete)
    $('#btn_clear').click(function() {
        gol.clear();
        notify('Clear');
        return false;
    });

    // Button About
    $('#btn_about').click(function() {
        panelize('about');
        return false;
    });

    // Button Patterns
    $('#btn_patterns').click(function() {
        panelize('patterns');
        return false;
    });

    // Button Controls
    $('#btn_controls').click(function() {
        this.dialog('isOpen') ? this.dialog('close') : this.dialog('open');
        return false;
    }.bind($('#controls')));

    // Pattern Buttons
    $('#patterns button').click(function() {
        var pattern = $(this).data('pattern');
        notify('Loading...');

        // load with ajax
        $.getJSON(`template/${pattern}`, function(json){
            var c = [];
            var width = 0;
            var height = 0;

            json.forEach(function(e) {
                c.push(new Cell(e[0], e[1], true))
                width = Math.max(width, e[1]);
                height = Math.max(height, e[0]);
            });

            // center
            var x = Math.round((rows / 2) - (height / 2));
            var y = Math.round((cols / 2) - (width / 2));
            gol.load(c, {row: x , col: y});
        }).fail(function() {
            notify('Pattern cannot be loaded')
        });
    });

    // Load completed
    var loader = $('#loader');
    loader.animate({opacity: 0}, 1000, function(){
        this.hide(); // hide loader
        $('#controls').dialog('open'); // show controls
    }.bind(loader));

    // Notify
    var span = $('<span></span>');
    span.attr('id', 'notify');
    $('body').append(span);
}

/**
 * Displays a box with a specified message.
 * @param text Message.
 */
function notify(text) {
    var obj = $('#notify');
    obj.show();
    obj.stop();
    obj.text(text);
    obj.css('opacity', 1);
    obj.animate({opacity: 0}, 1000, function() {
        this.hide();
    }.bind(obj));
}

/**
 * Displays a layer on a side bar.
 * @param layer Article id element to display.
 */
function panelize(layer) {
    var panel = $('#panel');
    var current = panel.data('layer');

    $(`#${current}`).hide();
    $(`#${layer}`).show('fast');
    panel.data('layer', layer);
    (layer == current && panel.is(':visible')) ? hide_panel() : show_panel();
}

/**
 * Hide sidebar.
 */
function hide_panel() {
    var panel = $('#panel');
    var w = panel.outerWidth();
    panel.stop();
    panel.animate(
        {opacity: 0, left: `-${w}px`},
        'fast',
        function() {
            this.hide();
        }.bind(panel)
    );
}

/**
 * Show sidebar.
 */
function show_panel() {
    var panel = $("#panel");
    panel.stop();
    panel.show();
    panel.animate({opacity: 1, left: '0px'}, 'fast');
}

/**
 * Class SpeedController.
 * Allows navigate easily between different speed modes.
 */
function SpeedController(index) {
    this._mode = [];
    this._mode.push({ mode : 'rocket', val : 15 });
    this._mode.push({ mode : 'fast', val : 75 });
    this._mode.push({ mode : 'normal', val : 150 });
    this._mode.push({ mode : 'slow', val : 400 });
    this._mode.push({ mode : 'lazy', val : 1000 });
    this._i = index || 0;
}

/**
 * Get current speed value (ms).
 * @returns Current speed value in ms.
 */
SpeedController.prototype.val = function() {
    return this._mode[this._i].val;
}

/**
 * Get current speed mode name
 * @returns Current speed mode name.
 */
SpeedController.prototype.mode = function() {
    return this._mode[this._i].mode;
}

/**
 * Increase speed mode.
 */
SpeedController.prototype.up = function() {
    if (this._i > 0)
        this._i--;
}

/**
 * Reduce speed mode.
 */
SpeedController.prototype.down = function() {
    if (this._i < this._mode.length - 1)
        this._i++;
}
