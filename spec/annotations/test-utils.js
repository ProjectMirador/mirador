(function () {
  window.TestUtils = {
    rotatePoint: function (point, initialPoint, angle) {
      var angleRad = angle * Math.PI / 180.0;
      return {
        x: Math.cos(angleRad) * (point.x - initialPoint.x) - Math.sin(angleRad) * (point.y - initialPoint.y) + initialPoint.x,
        y: Math.sin(angleRad) * (point.x - initialPoint.x) + Math.cos(angleRad) * (point.y - initialPoint.y) + initialPoint.y
      };
    },
    getEvent: function (delta, point,modifiers) {
      return {
        'delta': delta,
        'point': point,
        'modifiers': modifiers
      };
    }
  }
})();