/*
 * The repository with this fork is at:
 *
 * https://github.com/UCLALibrary/OpenSeadragonScalebar
 */

/* 
 * This software was developed at the National Institute of Standards and
 * Technology by employees of the Federal Government in the course of
 * their official duties. Pursuant to title 17 Section 105 of the United
 * States Code this software is not subject to copyright protection and is
 * in the public domain. This software is an experimental system. NIST assumes
 * no responsibility whatsoever for its use by other parties, and makes no
 * guarantees, expressed or implied, about its quality, reliability, or
 * any other characteristic. We would appreciate acknowledgement if the
 * software is used.
 */

/**
 *
 * @author Antoine Vandecreme <antoine.vandecreme@nist.gov>
 */
(function($) {

    if (!$.version || $.version.major < 1) {
        throw new Error('OpenSeadragonScalebar requires OpenSeadragon version 1.0.0+');
    }

    $.Viewer.prototype.scalebar = function(options) {
        if (!this.scalebarInstance) {
            options = options || {};
            options.viewer = this;
            this.scalebarInstance = new $.Scalebar(options);
        } else {
            this.scalebarInstance.refresh(options);
        }
    };

    $.ScalebarType = {
        NONE: 0,
        MICROSCOPY: 1,
        MAP: 2,
        RULER: 3
    };

    $.ScalebarLocation = {
        NONE: 0,
        TOP_LEFT: 1,
        TOP_RIGHT: 2,
        BOTTOM_RIGHT: 3,
        BOTTOM_LEFT: 4,
        MIDDLE_LEFT: 5,
        MIDDLE_RIGHT: 6,
	TOP_MIDDLE: 7,
	BOTTOM_MIDDLE: 8
    };

    $.ScalebarOrientation = {
        HORIZONTAL: 0,
        VERTICAL: 1
    };

    /**
     * 
     * @class Scalebar
     * @param {Object} options
     * @param {OpenSeadragon.Viewer} options.viewer The viewer to attach this
     * Scalebar to.
     * @param {OpenSeadragon.ScalebarType} options.type The scale bar type.
     * Default: microscopy
     * @param {OpenSeadragon.ScalebarOrientation} options.orientation
     * Default: HORIZONTAL
     * @param {Integer} options.pixelsPerMeter The pixels per meter of the
     * zoomable image at the original image size. If null, the scale bar is not
     * displayed. default: null
     * @param (String} options.minWidth The minimal width of the scale bar as a
     * CSS string (ex: 100px, 1em, 1% etc...) default: 150px
     * @param {OpenSeadragon.ScalebarLocation} options.location The location
     * of the scale bar inside the viewer. default: bottom left
     * @param {Integer} options.xOffset Offset location of the scale bar along x.
     * default: 5
     * @param {Integer} options.yOffset Offset location of the scale bar along y.
     * default: 5
     * @param {Boolean} options.stayInsideImage When set to true, keep the 
     * scale bar inside the image when zooming out. default: true
     * @param {String} options.color The color of the scale bar using a color
     * name or the hexadecimal format (ex: black or #000000) default: black
     * @param {String} options.fontColor The font color. default: black
     * @param {String} options.backgroundColor The background color. default: none
     * @param {String} options.fontSize The font size. default: not set
     * @param {String} options.barThickness The thickness of the scale bar in px.
     * default: 2
     * @param {function} options.sizeAndTextRenderer A function which will be
     * called to determine the size of the scale bar and it's text content.
     * The function must have 2 parameters: the PPM at the current zoom level
     * and the minimum size of the scale bar. It must return an object containing
     * 2 attributes: size and text containing the size of the scale bar and the text.
     * default: $.ScalebarSizeAndTextRenderer.METRIC_LENGTH
     */
    $.Scalebar = function(options) {
        options = options || {};
        if (!options.viewer) {
            throw new Error("A viewer must be specified.");
        }
        this.viewer = options.viewer;

        this.divElt = document.createElement("div");
        this.viewer.container.appendChild(this.divElt);
        this.divElt.style.position = "relative";
        this.divElt.style.margin = "0";
        this.divElt.style.pointerEvents = "none";

        this.setDrawScalebarFunction(options.type || $.ScalebarType.MICROSCOPY);
        this.color = options.color || "black";
        this.fontColor = options.fontColor || "black";
        this.backgroundColor = options.backgroundColor || "none";
        this.fontSize = options.fontSize || "";
        this.barThickness = options.barThickness || 2;
        this.pixelsPerMeter = options.pixelsPerMeter || null;
        this.location = options.location || $.ScalebarLocation.BOTTOM_LEFT;
        this.xOffset = options.xOffset || 5; // distance from L/R sides of viewer
        this.yOffset = options.yOffset || 5; // distance from top/bottom of viewer
        this.stayInsideImage = isDefined(options.stayInsideImage) ?
                options.stayInsideImage : true;
        this.sizeAndTextRenderer = options.sizeAndTextRenderer ||
                $.ScalebarSizeAndTextRenderer.METRIC_LENGTH;

        // vertical scalebar only possible for RULER
        if (options.type === $.ScalebarType.RULER) {
            this.orientation = options.orientation || $.ScalebarOrientation.HORIZONTAL; 
        }
        else {
            this.orientation = $.ScalebarOrientation.HORIZONTAL;
        }
        this.setMinLength(options.minWidth || "150px");

        // must come after setting this.orientation and calling this.setMinLength()
        if (options.type === $.ScalebarType.RULER) {
            this.createRulerScalebar();
        }

        var self = this;
        this.viewer.addHandler("open", function() {
            self.refresh();
        });
        this.viewer.addHandler("animation", function() {
            self.refresh();
        });
        this.viewer.addHandler("resize", function() {
            self.refresh();
        });
    };

    $.Scalebar.prototype = {
        updateOptions: function(options) {
            if (!options) {
                return;
            }
            if (isDefined(options.type)) {
                this.setDrawScalebarFunction(options.type);
            }
            if (isDefined(options.minWidth)) {
                this.setMinLength(options.minWidth);
            }
            if (isDefined(options.color)) {
                this.color = options.color;
		if (this.drawScalebar === this.drawRulerScalebar) {

		    this.createRulerScalebar();
		}
            }
            if (isDefined(options.fontColor)) {
                this.fontColor = options.fontColor;
            }
            if (isDefined(options.backgroundColor)) {
                this.backgroundColor = options.backgroundColor;
            }
            if (isDefined(options.fontSize)) {
                this.fontSize = options.fontSize;
            }
            if (isDefined(options.barThickness)) {
                this.barThickness = options.barThickness;
            }
            if (isDefined(options.pixelsPerMeter)) {
                this.pixelsPerMeter = options.pixelsPerMeter;
            }
            if (isDefined(options.location)) {
                this.location = options.location;
            }
            if (isDefined(options.xOffset)) {
                this.xOffset = options.xOffset;
            }
            if (isDefined(options.yOffset)) {
                this.yOffset = options.yOffset;
            }
            if (isDefined(options.stayInsideImage)) {
                this.stayInsideImage = options.stayInsideImage;
            }
            if (isDefined(options.sizeAndTextRenderer)) {
                this.sizeAndTextRenderer = options.sizeAndTextRenderer;
            }

            if (isDefined(options.orientation)) {
                this.orientation = options.orientation;
		if (this.drawScalebar === this.drawRulerScalebar) {

		    this.createRulerScalebar();
		}
            }
        },
        setDrawScalebarFunction: function(type) {
            if (!type) {
                this.drawScalebar = null;
            }
            else if (type === $.ScalebarType.MAP) {
                this.drawScalebar = this.drawMapScalebar;
            }
            else if (type === $.ScalebarType.MICROSCOPY) {
                this.drawScalebar = this.drawMicroscopyScalebar;
            } else {
                this.drawScalebar = this.drawRulerScalebar;
            }
        },
	// TODO: allow setMinLength to fire when new slot is added,
	// or if the viewer goes full screen
        setMinLength: function(minLength) {
            if (this.orientation === $.ScalebarOrientation.HORIZONTAL) {
                this.divElt.style.width = minLength;
            }
            else {
                this.divElt.style.height = minLength;
            }

            // Make sure to display the element before getting is width
            this.divElt.style.display = "";

            if (this.orientation === $.ScalebarOrientation.HORIZONTAL) {
                this.minWidth = this.divElt.offsetWidth;
            }
            else {
                this.minWidth = this.divElt.offsetHeight;
            }
        },
        /**
         * Refresh the scalebar with the options submitted.
         * @param {Object} options
         * @param {OpenSeadragon.ScalebarType} options.type The scale bar type.
         * Default: microscopy
         * @param {OpenSeadragon.ScalebarOrientation} options.orientation
         * Default: HORIZONTAL
         * @param {Integer} options.pixelsPerMeter The pixels per meter of the
         * zoomable image at the original image size. If null, the scale bar is not
         * displayed. default: null
         * @param (String} options.minWidth The minimal width of the scale bar as a
         * CSS string (ex: 100px, 1em, 1% etc...) default: 150px
         * @param {OpenSeadragon.ScalebarLocation} options.location The location
         * of the scale bar inside the viewer. default: bottom left
         * @param {Integer} options.xOffset Offset location of the scale bar along x.
         * default: 5
         * @param {Integer} options.yOffset Offset location of the scale bar along y.
         * default: 5
         * @param {Boolean} options.stayInsideImage When set to true, keep the 
         * scale bar inside the image when zooming out. default: true
         * @param {String} options.color The color of the scale bar using a color
         * name or the hexadecimal format (ex: black or #000000) default: black
         * @param {String} options.fontColor The font color. default: black
         * @param {String} options.backgroundColor The background color. default: none
         * @param {String} options.fontSize The font size. default: not set
         * @param {String} options.barThickness The thickness of the scale bar in px.
         * default: 2
         * @param {function} options.sizeAndTextRenderer A function which will be
         * called to determine the size of the scale bar and it's text content.
         * The function must have 2 parameters: the PPM at the current zoom level
         * and the minimum size of the scale bar. It must return an object containing
         * 2 attributes: size and text containing the size of the scale bar and the text.
         * default: $.ScalebarSizeAndTextRenderer.METRIC_LENGTH
         */
        refresh: function(options) {
            this.updateOptions(options);

            if (!this.viewer.isOpen() ||
                    !this.drawScalebar ||
                    !this.pixelsPerMeter ||
                    !this.location) {
                this.divElt.style.display = "none";
                return;
            }
            this.divElt.style.display = "";

            var viewport = this.viewer.viewport;
            var zoom = viewport.viewportToImageZoom(viewport.getZoom(true));
            var currentPPM = zoom * this.pixelsPerMeter;
            var props = this.sizeAndTextRenderer(currentPPM, this.minWidth);

            this.drawScalebar(props.size, props.text);
            var location = this.getScalebarLocation();
            this.divElt.style.left = location.x + "px";
            this.divElt.style.top = location.y + "px";
        },
        drawMicroscopyScalebar: function(size, text) {
            this.divElt.style.fontSize = this.fontSize;
            this.divElt.style.textAlign = "center";
            this.divElt.style.color = this.fontColor;
            this.divElt.style.border = "none";
            this.divElt.style.borderBottom = this.barThickness + "px solid " + this.color;
            this.divElt.style.backgroundColor = this.backgroundColor;
            this.divElt.innerHTML = text;
            this.divElt.style.width = size + "px";
        },
        drawMapScalebar: function(size, text) {
            this.divElt.style.fontSize = this.fontSize;
            this.divElt.style.textAlign = "center";
            this.divElt.style.color = this.fontColor;
            this.divElt.style.border = this.barThickness + "px solid " + this.color;
            this.divElt.style.borderTop = "none";
            this.divElt.style.backgroundColor = this.backgroundColor;
            this.divElt.innerHTML = text;
            this.divElt.style.width = size + "px";
        },
        createRulerScalebar: function() {
            this.nMajorGradations = 5;
            this.nMinorGradationsPerMajorGradation = 10;
            this.nMinorGradations = this.nMinorGradationsPerMajorGradation * this.nMajorGradations;

            var i,
                textElt,
                lineElt,
                lineEltHeight,
                lineEltOffsetPercent = 100 / this.nMinorGradations,
                axisParallelToRuler,
                axisPerpendicularToRuler,
                self = this;
		
	    // if it exists, delete the current ruler
	    if (this.svgEltLabels !== undefined) {
                this.divElt.removeChild(this.svgEltLabels);
            }
	    if (this.svgElt !== undefined) {
                this.divElt.removeChild(this.svgElt);
	    }
	      
            this.svgEltLabels = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            this.divElt.appendChild(this.svgEltLabels);
            this.svgElt = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            this.divElt.appendChild(this.svgElt);

            // are the following lines necessary?
            this.svgElt.setAttribute("version", "1.1");
            this.svgEltLabels.setAttribute("version", "1.1");
            this.svgElt.setAttribute("xmlns", "http://www.w3.org/2000/svg");
            this.svgEltLabels.setAttribute("xmlns", "http://www.w3.org/2000/svg");

            if (this.orientation === $.ScalebarOrientation.HORIZONTAL) {
                axisParallelToRuler = "x";
                axisPerpendicularToRuler = "y";
            }
            else {
                axisParallelToRuler = "y";
                axisPerpendicularToRuler = "x";
            }

	    this.scaleNumbers = [];

            for (i = 1; i < this.nMinorGradations; i++) {

                lineElt = document.createElementNS("http://www.w3.org/2000/svg", "line");
                this.svgElt.appendChild(lineElt);

                if (i % this.nMinorGradationsPerMajorGradation === 0) {
                    // draw major gradation
                    lineEltHeight = 0;

                    // also draw number next to major grad
                    textElt = document.createElementNS("http://www.w3.org/2000/svg", "text");
		    this.scaleNumbers.push(textElt);
                    this.svgEltLabels.appendChild(textElt);

                    if (this.orientation === $.ScalebarOrientation.HORIZONTAL) {
                        textElt.setAttribute(axisParallelToRuler, (i) * lineEltOffsetPercent + "%");
                        textElt.setAttribute(axisPerpendicularToRuler, "75%");
                    }
                    else {
                        textElt.setAttribute(axisParallelToRuler, (i) * lineEltOffsetPercent + "%");
                        textElt.setAttribute(axisPerpendicularToRuler, "0%");
                    }
                    textElt.style.fill = self.color;
                    //textElt.innerHTML = i / this.nMinorGradationsPerMajorGradation;

                }
                else if (i % (1/2 * this.nMinorGradationsPerMajorGradation) === 0) {
                    // draw semimajor gradation
                    lineEltHeight = 25;
                }
                else {
                    // draw minor gradation
                    lineEltHeight = 50;
                }

                lineElt.setAttribute(axisParallelToRuler + "1", i * lineEltOffsetPercent + "%");
                lineElt.setAttribute(axisPerpendicularToRuler + "1", lineEltHeight + "%");
                lineElt.setAttribute(axisParallelToRuler + "2", i * lineEltOffsetPercent + "%");
                lineElt.setAttribute(axisPerpendicularToRuler + "2", "100%");

                lineElt.setAttribute("stroke", self.color);
                lineElt.setAttribute("stroke-width", "1");
            }
        },
        drawRulerScalebar: function(size, text) {
            var scalebarLength = size + "px",
                scalebarThicknessPixels = 20;
		scalebarLabelsThicknessPixels = 20;

            // set style

            this.divElt.style.fontSize = this.fontSize;
            this.divElt.style.textAlign = "center";
	    this.divElt.style.lineHeight = "0";
            // this.divElt.style.color = this.fontColor;
            this.divElt.style.border = this.barThickness + "px solid " + this.color;
            this.divElt.style.backgroundColor = this.backgroundColor;

	    // update the labels on the bar
	    var distance = text.replace(/[A-Za-z]| /g, '');
	    var units = text.replace(/[0-9]|\.| /g, '');
	    for (var i = 0; i < this.nMajorGradations - 1; i++) {
                // change the inner html
		this.scaleNumbers[i].innerHTML = distance * (i + 1) / this.nMajorGradations + ' ' + units;
	    }
	    
            if (this.orientation === $.ScalebarOrientation.HORIZONTAL) {
                this.divElt.style.width = scalebarLength;
                this.divElt.style.height = scalebarThicknessPixels + scalebarLabelsThicknessPixels + "px";
                this.divElt.style.borderTop = "none";
            this.svgElt.style.width = "100%";
            this.svgElt.style.height = scalebarThicknessPixels + "px";
            this.svgEltLabels.style.width = "100%";
            this.svgEltLabels.style.height = scalebarLabelsThicknessPixels + "px";
                // uncomment to 'flip' ruler, then comment the above line
                /*
                if (this.location === $.ScalebarLocation.TOP_LEFT || this.location === $.ScalebarLocation.TOP_RIGHT) {
                    this.divElt.style.borderTop = "none";
                }
                else {
                    this.divElt.style.borderBottom = "none";
                }
                */
            }
            else {
	    
            // set thickness to width of label
	    this.svgEltLabels.style.display = "";
	    scalebarLabelsThicknessPixels = 0
	    himark = this.scaleNumbers;
	    for (var j = 0; j < this.scaleNumbers.length; j++) {
		var len = this.scaleNumbers[j].getComputedTextLength();
	        scalebarLabelsThicknessPixels = (len > scalebarLabelsThicknessPixels) ? len : scalebarLabelsThicknessPixels;
	    }

            this.svgEltLabels.style.width = scalebarLabelsThicknessPixels + "px";
            this.svgEltLabels.style.height = "100%";
            this.svgElt.style.width = scalebarThicknessPixels + "px";
            this.svgElt.style.height = "100%";
                this.divElt.style.width = scalebarThicknessPixels + scalebarLabelsThicknessPixels + "px";
                this.divElt.style.height = scalebarLength;
                this.divElt.style.borderLeft = "none";
                // uncomment to 'flip' ruler, then comment the above line
                /*
                if (this.location === $.ScalebarLocation.TOP_RIGHT || this.location === $.ScalebarLocation.BOTTOM_RIGHT) { // or MIDDLE_RIGHT
                    this.divElt.style.borderRight = "none";
                }
                else {
                    this.divElt.style.borderLeft = "none";
                }
                */
            }


        },
        /**
         * Compute the location of the scale bar.
         * @returns {OpenSeadragon.Point}
         */
        getScalebarLocation: function() {

            // switch on this.orientation
            
            if (this.location === $.ScalebarLocation.TOP_LEFT) {
                var x = 0;
                var y = 0;
                if (this.stayInsideImage) {
                    var pixel = this.viewer.viewport.pixelFromPoint(
                            new $.Point(0, 0), true);
                    if (!this.viewer.wrapHorizontal) {
                        x = Math.max(pixel.x, 0);
                    }
                    if (!this.viewer.wrapVertical) {
                        y = Math.max(pixel.y, 0);
                    }
                }
                return new $.Point(x + this.xOffset, y + this.yOffset);
            }
            if (this.location === $.ScalebarLocation.TOP_RIGHT) {
                var barWidth = this.divElt.offsetWidth;
                var container = this.viewer.container;
                var x = container.offsetWidth - barWidth;
                var y = 0;
                if (this.stayInsideImage) {
                    var pixel = this.viewer.viewport.pixelFromPoint(
                            new $.Point(1, 0), true);
                    if (!this.viewer.wrapHorizontal) {
                        x = Math.min(x, pixel.x - barWidth);
                    }
                    if (!this.viewer.wrapVertical) {
                        y = Math.max(y, pixel.y);
                    }
                }
                return new $.Point(x - this.xOffset, y + this.yOffset);
            }
            if (this.location === $.ScalebarLocation.BOTTOM_RIGHT) {
                var barWidth = this.divElt.offsetWidth;
                var barHeight = this.divElt.offsetHeight;
                var container = this.viewer.container;
                var x = container.offsetWidth - barWidth;
                var y = container.offsetHeight - barHeight;
                if (this.stayInsideImage) {
                    var pixel = this.viewer.viewport.pixelFromPoint(
                            new $.Point(1, 1 / this.viewer.source.aspectRatio),
                            true);
                    if (!this.viewer.wrapHorizontal) {
                        x = Math.min(x, pixel.x - barWidth);
                    }
                    if (!this.viewer.wrapVertical) {
                        y = Math.min(y, pixel.y - barHeight);
                    }
                }
                return new $.Point(x - this.xOffset, y - this.yOffset);
            }
            if (this.location === $.ScalebarLocation.BOTTOM_LEFT) {
                var barHeight = this.divElt.offsetHeight;
                var container = this.viewer.container;
                var x = 0;
                var y = container.offsetHeight - barHeight;
                if (this.stayInsideImage) {
                    var pixel = this.viewer.viewport.pixelFromPoint(
                            new $.Point(0, 1 / this.viewer.source.aspectRatio),
                            true);
                    if (!this.viewer.wrapHorizontal) {
                        x = Math.max(x, pixel.x);
                    }
                    if (!this.viewer.wrapVertical) {
                        y = Math.min(y, pixel.y - barHeight);
                    }
                }
                return new $.Point(x + this.xOffset, y - this.yOffset);
            }
	    // MIDDLE_LEFT
	    if (this.location === $.ScalebarLocation.MIDDLE_LEFT) {
                var barHeight = this.divElt.offsetHeight;
                var container = this.viewer.container;
                var x = 0;
                var y = container.offsetHeight / 2 - barHeight;
                if (this.stayInsideImage) {
                    var pixel = this.viewer.viewport.pixelFromPoint(
                            new $.Point(0, 1 / this.viewer.source.aspectRatio),
                            true);
                    if (!this.viewer.wrapHorizontal) {
                        x = Math.max(x, pixel.x);
                    }
                    if (!this.viewer.wrapVertical) {
                        y = Math.min(y, pixel.y / 2 - barHeight);
                    }
                }
                return new $.Point(x + this.xOffset, y - this.yOffset);
	    }
	    
	    // MIDDLE_RIGHT
	    if (this.location === $.ScalebarLocation.MIDDLE_RIGHT) {
                var barWidth = this.divElt.offsetWidth;
                var barHeight = this.divElt.offsetHeight;
                var container = this.viewer.container;
                var x = container.offsetWidth - barWidth;
                var y = container.offsetHeight / 2 - barHeight;
                if (this.stayInsideImage) {
                    var pixel = this.viewer.viewport.pixelFromPoint(
                            new $.Point(1, 1 / this.viewer.source.aspectRatio),
                            true);
                    if (!this.viewer.wrapHorizontal) {
                        x = Math.min(x, pixel.x - barWidth);
                    }
                    if (!this.viewer.wrapVertical) {
                        y = Math.min(y, pixel.y / 2 - barHeight);
                    }
                }
                return new $.Point(x - this.xOffset, y - this.yOffset);
	    }

	    // TOP_MIDDLE
	    if (this.location === $.ScalebarLocation.TOP_MIDDLE) {
                var barWidth = this.divElt.offsetWidth;
                var container = this.viewer.container;
                var x = container.offsetWidth / 2 - barWidth;
                var y = 0;
                if (this.stayInsideImage) {
                    var pixel = this.viewer.viewport.pixelFromPoint(
                            new $.Point(1, 0), true);
                    if (!this.viewer.wrapHorizontal) {
                        x = Math.min(x, pixel.x / 2 - barWidth);
                    }
                    if (!this.viewer.wrapVertical) {
                        y = Math.max(y, pixel.y);
                    }
                }
                return new $.Point(x - this.xOffset, y + this.yOffset);
	    }
	    // BOTTOM_MIDDLE
	    if (this.location === $.ScalebarLocation.BOTTOM_MIDDLE) {
                var barWidth = this.divElt.offsetWidth;
                var barHeight = this.divElt.offsetHeight;
                var container = this.viewer.container;
                var x = container.offsetWidth / 2 - barWidth;
                var y = container.offsetHeight - barHeight;
                if (this.stayInsideImage) {
                    var pixel = this.viewer.viewport.pixelFromPoint(
                            new $.Point(1, 1 / this.viewer.source.aspectRatio),
                            true);
                    if (!this.viewer.wrapHorizontal) {
                        x = Math.min(x, pixel.x / 2 - barWidth);
                    }
                    if (!this.viewer.wrapVertical) {
                        y = Math.min(y, pixel.y - barHeight);
                    }
                }
                return new $.Point(x - this.xOffset, y - this.yOffset);
	    }
        }
    };

    $.ScalebarSizeAndTextRenderer = {
        /**
         * Metric length. From nano meters to kilometers.
         */
        METRIC_LENGTH: function(ppm, minSize) {
            return getScalebarSizeAndTextForMetric(ppm, minSize, "m");
        },
        /**
         * Imperial length. Choosing the best unit from thou, inch, foot and mile.
         */
        IMPERIAL_LENGTH: function(ppm, minSize) {
            var maxSize = minSize * 2;
            var ppi = ppm * 0.0254;
            if (maxSize < ppi * 12) {
                if (maxSize < ppi) {
                    var ppt = ppi / 1000;
                    return getScalebarSizeAndText(ppt, minSize, "th");
                }
                return getScalebarSizeAndText(ppi, minSize, "in");
            }
            var ppf = ppi * 12;
            if (maxSize < ppf * 2000) {
                return getScalebarSizeAndText(ppf, minSize, "ft");
            }
            var ppmi = ppf * 5280;
            return getScalebarSizeAndText(ppmi, minSize, "mi");
        },
        /**
         * Standard time. Choosing the best unit from second (and metric divisions),
         * minute, hour, day and year.
         */
        STANDARD_TIME: function(pps, minSize) {
            var maxSize = minSize * 2;
            if (maxSize < pps * 60) {
                return getScalebarSizeAndTextForMetric(pps, minSize, "s", false);
            }
            var ppminutes = pps * 60;
            if (maxSize < ppminutes * 60) {
                return getScalebarSizeAndText(ppminutes, minSize, "minute", true);
            }
            var pph = ppminutes * 60;
            if (maxSize < pph * 24) {
                return getScalebarSizeAndText(pph, minSize, "hour", true);
            }
            var ppd = pph * 24;
            if (maxSize < ppd * 365.25) {
                return getScalebarSizeAndText(ppd, minSize, "day", true);
            }
            var ppy = ppd * 365.25;
            return getScalebarSizeAndText(ppy, minSize, "year", true);
        },
        /**
         * Generic metric unit. One can use this function to create a new metric
         * scale. For example, here is an implementation of energy levels:
         * function(ppeV, minSize) {
         *   return OpenSeadragon.ScalebarSizeAndTextRenderer.METRIC_GENERIC(
         *           ppeV, minSize, "eV");
         * }
         */
        METRIC_GENERIC: getScalebarSizeAndTextForMetric
    };

    function getScalebarSizeAndText(ppm, minSize, unitSuffix, handlePlural) {
        var value = normalize(ppm, minSize);
        var factor = roundSignificand(value / ppm * minSize, 3);
        var size = value * minSize;
        var plural = handlePlural && factor > 1 ? "s" : "";
        return {
            size: size,
            text: factor + " " + unitSuffix + plural
        };
    }

    function getScalebarSizeAndTextForMetric(ppm, minSize, unitSuffix) {
        var value = normalize(ppm, minSize);
        var factor = roundSignificand(value / ppm * minSize, 3);
        var size = value * minSize;
        var valueWithUnit = getWithUnit(factor, unitSuffix);
        return {
            size: size,
            text: valueWithUnit
        };
    }

    function normalize(value, minSize) {
        var significand = getSignificand(value);
        var minSizeSign = getSignificand(minSize);
        var result = getSignificand(significand / minSizeSign);
        if (result >= 5) {
            result /= 5;
        }
        if (result >= 4) {
            result /= 4;
        }
        if (result >= 2) {
            result /= 2;
        }
        return result;
    }

    function getSignificand(x) {
        return x * Math.pow(10, Math.ceil(-log10(x)));
    }

    function roundSignificand(x, decimalPlaces) {
        var exponent = -Math.ceil(-log10(x));
        var power = decimalPlaces - exponent;
        var significand = x * Math.pow(10, power);
        // To avoid rounding problems, always work with integers
        if (power < 0) {
            return Math.round(significand) * Math.pow(10, -power);
        }
        return Math.round(significand) / Math.pow(10, power);
    }

    function log10(x) {
        return Math.log(x) / Math.log(10);
    }

    function getWithUnit(value, unitSuffix) {
        if (value < 0.000001) {
            return value * 1000000000 + " n" + unitSuffix;
        }
        if (value < 0.001) {
            return value * 1000000 + " μ" + unitSuffix;
        }
        if (value < 1) {
            return value * 1000 + " m" + unitSuffix;
        }
        if (value >= 1000) {
            return value / 1000 + " k" + unitSuffix;
        }
        return value + " " + unitSuffix;
    }

    function isDefined(variable) {
        return typeof (variable) !== "undefined";
    }
}(OpenSeadragon));
