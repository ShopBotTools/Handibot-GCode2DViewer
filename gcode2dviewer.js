/*jslint todo: true, browser: true, continue: true, white: true*/
/*global THREE, GCodeToGeometry*/

/**
 * Written by Alex Canales for ShopBotTools, Inc.
 */

var GCode2DViewer = {};

// colors = { G0, G1, G2G3 }, if one undefined: not display.
// color in string in hexadecimal (ex: '#ff00ff')
GCode2DViewer.preview = function(gcodeStr, colors, canvas) {
    "use strict";

    function calculateRatio(gcode, canvas) {
        var pW = Math.abs(gcode.size.max.x - gcode.size.min.x);
        var pH = Math.abs(gcode.size.max.y - gcode.size.min.y);
        var cW = parseInt(canvas.width, 10), cH = parseInt(canvas.height, 10);

        return Math.min(cW / pW, cH / pH);
    }

    function drawStraightLine(ctx, ratio, start, line, height, color) {
        ctx.beginPath();
        ctx.moveTo(ratio * (line.start.x - start.x),
                height - ratio * (line.start.y - start.y));
        ctx.lineTo(ratio * (line.end.x - start.x),
                height - ratio * (line.end.y - start.y));
        ctx.strokeStyle =  color;
        ctx.stroke();
        ctx.closePath();
    }

    function drawCurvedLine(ctx, ratio, start, line, height, color) {
        var i = 0;
        var b = line.beziers, l = {};
        ctx.beginPath();
        for(i = 0 ; i < b.length; i++) {
            l = b[i];
            ctx.moveTo(ratio * (l.p0.x - start.x), height - ratio * (l.p0.y - start.y));
            ctx.bezierCurveTo(
                    ratio * (l.p1.x - start.x), height - ratio * (l.p1.y - start.y),
                    ratio * (l.p2.x - start.x), height - ratio * (l.p2.y - start.y),
                    ratio * (l.p3.x - start.x), height - ratio * (l.p3.y - start.y)
                    );
        }
        ctx.strokeStyle =  color;
        ctx.stroke();
        ctx.closePath();
    }

    if(colors === undefined) {
        return;
    }

    var gcode = GCodeToGeometry.parse(gcodeStr);
    if(Math.abs(gcode.size.max.x - gcode.size.min.x) === 0 ||
        Math.abs(gcode.size.max.y - gcode.size.min.y) === 0) {
        return;
    }

    var ctx = canvas.getContext("2d");
    var start = { x : gcode.size.min.x, y : gcode.size.min.y };
    var i = 0, ratio = calculateRatio(gcode, canvas);
    var cH = parseInt(canvas.height, 10);
    for(i = 0; i < gcode.lines.length; i++) {
        if(gcode.lines[i].type === "G0" && colors.G0 !== undefined) {
            drawStraightLine(ctx, ratio, start, gcode.lines[i], cH, colors.G0);
        } else if(gcode.lines[i].type === "G1" && colors.G1 !== undefined) {
            drawStraightLine(ctx, ratio, start, gcode.lines[i], cH, colors.G1);
        } else if((gcode.lines[i].type === "G2" ||
                    gcode.lines[i].type === "G3") && colors.G2G3 !== undefined)
        {
            drawCurvedLine(ctx, ratio, start, gcode.lines[i], cH, colors.G2G3);
        }
    }
};

GCode2DViewer.getImage = function(gcodeStr, colors, width, height) {
    var canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    GCode2DViewer.preview(gcodeStr, colors, canvas);
    return canvas.toDataURL("img/png");
};
