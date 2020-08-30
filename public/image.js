function ready(fn){
    if (document.readyState != 'loading'){
        fn();
    }
    else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

// globals
var img = null;
var defaultpalette = null;
var buckets = null;

ready(function(){
    var generate = function(e){
        if(!buckets || !defaultpalette){
            return false;
        }
        
        if(e && (e.target.className == 'btn btn-default randomize disabled' || e.target.className == 'btn btn-default randomize color-progress')){
            return false;
        }
        
        var random = [];
        for(var i=0; i<30; i++){
            var r = JSON.parse(JSON.stringify(defaultpalette));
            for(var j=0; j<r.length; j++){
                var randomcolor = buckets[j][rand(buckets[j].length-1)];
                // this method of color mixing isn't perceptually correct but we're just after a bit of randomization
                r[j][0] = 0.6*r[j][0] + 0.4*randomcolor[0]; // r
                r[j][1] = 0.6*r[j][1] + 0.4*randomcolor[1]; // g
                r[j][2] = 0.6*r[j][2] + 0.4*randomcolor[2]; // b
            }
            
            shuffle(r);
            random.push(r);
        }
        
        el('generate').className = 'btn btn-default randomize color-progress';
                        
        post(random, el('generate'));
        return false;
    }
    
    el('generate').onclick = generate;
    
    
    el('fileUpload').onchange = function(e){
        var URL = window.webkitURL || window.URL;
        var url = URL.createObjectURL(e.target.files[0]);
        var img = new Image();
        img.src = url;

        el('display').setAttribute('src', url);
        el('display').setAttribute('style','margin: 1em 0 1em 0; width: 100%');
        
        img.onload = function(e) {
                // Create custom CanvasImage object
                var image      = new CanvasImage(e.target);
                var imageData  = image.getImageData();
                var pixels     = imageData.data;
                var pixelCount = image.getPixelCount();

                // Store the RGB values in an array format suitable for quantize function
                var pixelArray = [];
                
                // skip 1 in 4 pixels for a sparse sampling
                for (var i = 0, offset, r, g, b, a; i < pixelCount; i = i + 4) {
                    offset = i * 4;
                    r = pixels[offset + 0];
                    g = pixels[offset + 1];
                    b = pixels[offset + 2];
                    a = pixels[offset + 3];
                    // If pixel is mostly opaque and not white
                    if (a >= 125) {
                        if (!(r > 250 && g > 250 && b > 250)) {
                            pixelArray.push([r, g, b]);
                        }
                    }
                }

                // median cut with quantize.js
                var cmap    = MMCQ.quantize(pixelArray, 5);
                defaultpalette = cmap ? cmap.palette() : null;
        
                var newPixels = pixelArray.map(function(p) { 
                    return cmap.map(p);
                });

                buckets = [[],[],[],[],[]];
                for(var i=0; i<newPixels.length; i++){
                    var index = defaultpalette.indexOf(newPixels[i]);
                    buckets[index].push(pixelArray[i]);
                }
        
                // Clean up
                image.removeCanvas();
                
                // enable button
                el('generate').className = 'btn btn-default randomize';
                
                generate();
        }
    }
});

function rand(max){
    return Math.round(Math.random()*max);
}

function post(data, button){
    var http = new XMLHttpRequest();
    var url = "http://colormind.io/filter/";
    
    http.open("POST", url, true);
    
    http.onreadystatechange = function() {
        
        if(http.readyState == 4 && http.status == 200) {
            if(button){
                setTimeout(function(){
                button.className = 'btn btn-default randomize';
                }, 2000);
            }
            var palette = JSON.parse(http.responseText).result;
            if(palette.length != 5){
                return false;
            }
            var h3 = document.querySelectorAll('#colors h3');
            var groupcolors = document.querySelectorAll('#colors .color');
            for(var k = 0; k<groupcolors.length; k++){
                var color = groupcolors[k];
                var hex = rgbToHex(palette[k]);
                color.setAttribute('data-color', hex);
                
                h3[k].innerText = hex.substring(1).toUpperCase();
                
                var swipe = color.getElementsByClassName("swipe")[0];
                var width = color.clientWidth;
                
                swipe.className == 'swipe';
                swipe.setAttribute('style', 'border-top: '+width+'px solid '+hex+'; border-left: '+width+'px solid '+hex+'; border-bottom: '+width+'px solid transparent; border-right: '+width+'px solid transparent;');
                
                setTimeout(function(){
                    var hex = this.getAttribute('data-color');
                    this.setAttribute('style', 'background-color: ' + hex);
                    var swipe = this.getElementsByClassName("swipe")[0];
                    swipe.removeAttribute('style');
                }.bind(color), 1000);
            }
            
        }
    }
    
    http.send(JSON.stringify(data));
}

function el(id){return document.getElementById(id);}

/*
    CanvasImage Class
    Class that wraps the html image element and canvas.
    It also simplifies some of the canvas context manipulation
    with a set of helper functions.
*/
var CanvasImage = function (image) {
    this.canvas  = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');

    document.body.appendChild(this.canvas);

    this.width  = this.canvas.width  = image.width;
    this.height = this.canvas.height = image.height;

    this.context.drawImage(image, 0, 0, this.width, this.height);
};

CanvasImage.prototype.clear = function () {
    this.context.clearRect(0, 0, this.width, this.height);
};

CanvasImage.prototype.update = function (imageData) {
    this.context.putImageData(imageData, 0, 0);
};

CanvasImage.prototype.getPixelCount = function () {
    return this.width * this.height;
};

CanvasImage.prototype.getImageData = function () {
    return this.context.getImageData(0, 0, this.width, this.height);
};

CanvasImage.prototype.removeCanvas = function () {
    this.canvas.parentNode.removeChild(this.canvas);
};

function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ] : null;
}

function rgbToHex(rgb){
    return "#" +
    ("0" + parseInt(rgb[0]).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[1]).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[2]).toString(16)).slice(-2);
}
