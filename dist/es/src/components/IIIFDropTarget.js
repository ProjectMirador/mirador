function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import InsertDriveFileSharpIcon from '@material-ui/icons/InsertDriveFileSharp';
import { grey } from '@material-ui/core/colors';
import { v4 as uuid } from 'uuid';
import { NativeTypes } from 'react-dnd-html5-backend';
import { useDrop } from 'react-dnd';
import { readImageMetadata } from '../lib/readImageMetadata';
/** */

export var handleDrop = function handleDrop(item, monitor, props) {
  var onDrop = props.onDrop;

  if (item.urls) {
    item.urls.forEach(function (str) {
      var url = new URL(str);
      var manifestId = url.searchParams.get('manifest');
      var canvasId = url.searchParams.get('canvas');
      if (manifestId) onDrop({
        canvasId: canvasId,
        manifestId: manifestId
      }, props, monitor);
    });
  }

  if (item.files) {
    var manifestFiles = item.files.filter(function (f) {
      return f.type === 'application/json';
    });
    var manifestPromises = manifestFiles.map(function (file) {
      return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          var manifestJson = reader.result;
          var manifestId = uuid();
          if (manifestJson) onDrop({
            manifestId: manifestId,
            manifestJson: manifestJson
          }, props, monitor);
          resolve();
        });
        reader.readAsText(file);
      });
    });
    var imageFiles = item.files.filter(function (_ref) {
      var type = _ref.type;
      return type.startsWith('image/');
    });
    var imagePromise;

    if (imageFiles.length > 0) {
      var id = uuid();
      var imageData = imageFiles.map(function (file) {
        return readImageMetadata(file);
      });
      imagePromise = Promise.all(imageData).then(function (images) {
        var manifestJson = {
          '@context': 'http://iiif.io/api/presentation/3/context.json',
          id: id,
          items: images.map(function (_ref2, index) {
            var name = _ref2.name,
                type = _ref2.type,
                width = _ref2.width,
                height = _ref2.height,
                url = _ref2.url;
            return {
              height: height,
              id: "".concat(id, "/canvas/").concat(index),
              items: [{
                id: "".concat(id, "/canvas/").concat(index, "/1"),
                items: [{
                  body: {
                    format: type,
                    id: url,
                    type: 'Image'
                  },
                  height: height,
                  id: "".concat(id, "/canvas/").concat(index, "/1/image"),
                  motivation: 'painting',
                  target: "".concat(id, "/canvas/").concat(index, "/1"),
                  type: 'Annotation',
                  width: width
                }],
                type: 'AnnotationPage'
              }],
              label: name,
              type: 'Canvas',
              width: width
            };
          }),
          label: images[0].name,
          type: 'Manifest'
        };
        var manifestId = uuid();
        if (manifestJson) onDrop({
          manifestId: manifestId,
          manifestJson: manifestJson
        }, props, monitor);
      });
    }

    return Promise.all([].concat(_toConsumableArray(manifestPromises), [imagePromise]));
  }

  return undefined;
};
/** */

export var IIIFDropTarget = function IIIFDropTarget(props) {
  var children = props.children,
      onDrop = props.onDrop;

  var _useDrop = useDrop({
    accept: [NativeTypes.URL, NativeTypes.FILE],
    collect: function collect(monitor) {
      return {
        canDrop: monitor.canDrop(),
        isOver: monitor.isOver()
      };
    },

    /** */
    drop: function drop(item, monitor) {
      if (!onDrop) return;
      handleDrop(item, monitor, props);
    }
  }),
      _useDrop2 = _slicedToArray(_useDrop, 2),
      _useDrop2$ = _useDrop2[0],
      canDrop = _useDrop2$.canDrop,
      isOver = _useDrop2$.isOver,
      drop = _useDrop2[1];
  /**
   * Safari reports drag+drop'ed urls as both a file and uri-list
   * which gets mis-classified by react-dnd.
   */


  var hackForSafari = function hackForSafari(e) {
    if (!window.safari || !onDrop || !e.dataTransfer) return;

    if (e.dataTransfer.types.includes('Files') && e.dataTransfer.types.includes('text/uri-list')) {
      var url = e.dataTransfer.getData('text/uri-list');
      if (!url) return;
      handleDrop({
        urls: [url]
      }, null, props);
    }
  };

  var isActive = canDrop && isOver;
  return /*#__PURE__*/React.createElement("div", {
    ref: drop,
    onDrop: hackForSafari,
    style: {
      height: '100%',
      width: '100%'
    }
  }, children, /*#__PURE__*/React.createElement(Backdrop, {
    open: isActive,
    style: {
      zIndex: 9999
    }
  }, /*#__PURE__*/React.createElement(InsertDriveFileSharpIcon, {
    style: {
      color: grey[400],
      fontSize: 256
    }
  })));
};