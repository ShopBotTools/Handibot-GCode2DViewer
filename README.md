#Handibot GCode 2D Viewer

A simple 2D Viewer for GCode. Shows the G1, G2 and G3 operations on XY plane.
It can also produce an image from this operations.

#GCode2DViewer.preview
Creates a preview of the gcode into the canvas.

##Parameters
* **gcodeStr** : (string) The gcode to parse
* **colors** : (object) The colors for each command, each members is a string
containing the color in hexadecimal (`#rrggbb`). If one of the member is
undefined, this means the lines corresponding to this command are not displayed.
The structure of the object is the following:

    { G0, G1, G2G3 }  // We make no difference between G2 and G3 commands

* **canvas** : (domElement) The canvas where the preview is displayed

##Example

    // Will not print the G0 paths
    var code = document.getElementById("gcode").value;
    var colors = { G1 : '#000000', G2G3 : "#000000" };
    var canvas = document.getElementById("canvas");
    GCode2DViewer.preview(code, colors, canvas);

#GCode2DViewer.getImage
Returns a data url image of the previez of the given GCode. Internally creates
a temporary canvas, use the GCode2DViewer.preview function with this canvas
and returns the image displayed in this temporary canvas.

##Parameters
* **gcodeStr** : (string) The gcode to parse
* **colors** : (object) The colors for each command, each members is a string
containing the color in hexadecimal (`#rrggbb`). If one of the member is
undefined, this means the lines corresponding to this command are not displayed.
The structure of the object is the following:

    { G0, G1, G2G3 }  // We make no difference between G2 and G3 commands

* **width** : (number) The width of the image.
* **height** : (number) The height of the image.

##Example

    // Will not print the G0 paths
    var code = document.getElementById("gcode").value;
    var colors = { G1 : '#000000', G2G3 : "#000000" };
    var img = document.getElementById("image");
    img.src = GCode2DViewer.getImage(code, colors, 300, 300);

