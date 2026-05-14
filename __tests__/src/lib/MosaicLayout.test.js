import MosaicLayout from '../../../src/lib/MosaicLayout';

describe('MosaicLayout', () => {
  describe('constructor', () => {
    it('sets layout', () => {
      expect(new MosaicLayout('foo').layout).toEqual('foo');
    });
  });
  describe('addWindows', () => {
    let instance;
    beforeEach(() => {
      instance = new MosaicLayout('foo');
    });
    it('case 1 window: adds to the top right', () => {
      expect(instance.layout).toEqual('foo');
      instance.addWindows(['bar']);
      expect(instance.layout).toEqual({
        type: 'split',
        direction: 'row',
        children: ['foo', 'bar'],
      });
    });
    it('case 3 windows: adds to the top right', () => {
      expect(instance.layout).toEqual('foo');
      instance.addWindows(['bar', 'bat', 'bark']);
      expect(instance.layout).toEqual({
        type: 'split',
        direction: 'row',
        children: ['foo', {
          type: 'split',
          direction: 'column',
          children: [{
            type: 'split',
            direction: 'row',
            children: ['bat', 'bark'],
          }, 'bar'],
        }],
      });
    });
  });
  describe('removeWindows', () => {
    let instance;
    beforeEach(() => {
      instance = new MosaicLayout({ type: 'split', direction: 'row', children: ['foo', 'bar'] });
    });
    it('case 1 window: returns a single window', () => {
      instance.removeWindows(['bar'], { bar: [1] });
      expect(instance.layout).toEqual('foo');
    });
  });
});
