        function randomColor() {
          var letters = '0123456789ABCDEF'.split('');
          var color = '#';
          for (var i = 0; i < 6; i++) {
            color += letters[Math.round(Math.random() * 15)];
          }
          return color;
        }

function ContrastColor(hexColor)
{
    var d = "";
    var color = toRgb(hexColor);
    // Counting the perceptive luminance - human eye favors green color... 
    var a = 1 - ( 0.299 * color[0] + 0.587 * color[1] + 0.114 * color[2])/255;
    if (parseFloat(a) < 0.5)
       d = "#000000"; // bright colors - black font
    else
       d = "#FFFFFF"; // dark colors - white font

    return  d;
}


toRgb = function (hex) {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16)
      , parseInt(result[2], 16)
      , parseInt(result[3], 16)
    ] : null;
};
