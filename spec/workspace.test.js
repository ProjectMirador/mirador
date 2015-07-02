describe('Workspace', function() {
  beforeEach(function(){
    this.viewer = {};
    this.viewerDiv = jQuery('<div/>');
    jasmine.getFixtures().set(this.viewerDiv);
    
    //register Handlebars helper
    Handlebars.registerHelper('t', function(i18n_key) {
      var result = i18n.t(i18n_key);
      return new Handlebars.SafeString(result);
    });
  });

  describe('splits', function() {
    it('should have three siblings instead of two', function() {
      this.workspace = new Mirador.Workspace({
        parent:                     this.viewer, //viewer
        appendTo: this.viewerDiv,
        layoutDescription: Mirador.layoutDescriptionFromGridString('1x2')
      });
      expect(this.workspace.layoutDescription.children.length).toEqual(2);
      expect(this.workspace.slots.length).toEqual(2);

      this.workspace.splitRight(this.workspace.slots[0]);

      expect(this.workspace.layoutDescription.children.length).toEqual(3);
      expect(this.workspace.slots.length).toEqual(3);
    });

    it('should have new children and structure', function() {
      this.workspace = new Mirador.Workspace({
        parent:                     this.viewer, //viewer
        appendTo: this.viewerDiv,
        layoutDescription: Mirador.layoutDescriptionFromGridString('1x2')
      });
      var originalId = this.workspace.layoutDescription.children[0].id;

      expect(this.workspace.slots.length).toBe(2);

      this.workspace.splitDown(this.workspace.slots[0]);

      expect(this.workspace.layoutDescription.children[0].children.length).toBe(2);
      expect(this.workspace.slots.length).toBe(3);
      expect(this.workspace.layoutDescription.children[0].children[0].id).toBe(originalId);
    });
    
    it('should have new children and structure (even if root)', function() {
      this.workspace = new Mirador.Workspace({
        parent:                     this.viewer, //viewer
        appendTo: this.viewerDiv,
        layoutDescription: Mirador.layoutDescriptionFromGridString('1x1')
      });
      var originalId = this.workspace.layoutDescription.id;

      expect(this.workspace.layoutDescription.children).toBe(undefined);
      expect(this.workspace.slots.length).toBe(1);

      this.workspace.splitRight(this.workspace.slots[0]);

      expect(this.workspace.layoutDescription.children.length).toEqual(2);
      expect(this.workspace.slots.length).toEqual(2);
      expect(this.workspace.layoutDescription.children[0].id).toBe(originalId);
    });
    
    it('should have new children and structure splitting down or up (even if root)', function() {
      this.workspace = new Mirador.Workspace({
        parent:                     this.viewer, //viewer
        appendTo: this.viewerDiv,
        layoutDescription: Mirador.layoutDescriptionFromGridString('1x1')
      });
      var originalId = this.workspace.layoutDescription.id;

      expect(this.workspace.layoutDescription.children).toBe(undefined);
      expect(this.workspace.slots.length).toBe(1);

      this.workspace.splitDown(this.workspace.slots[0]);

      expect(this.workspace.layoutDescription.children.length).toEqual(2);
      expect(this.workspace.layoutDescription.children[0].type).toBe('row');
      expect(this.workspace.slots.length).toEqual(2);
      expect(this.workspace.layoutDescription.children[0].id).toBe(originalId);
    });
  });

  describe('removeNode', function() {
    it('should remove a sibling (going from 3 to 2)', function() {
      this.workspace = new Mirador.Workspace({
        parent:                     this.viewer, //viewer
        appendTo: this.viewerDiv,
        layoutDescription: Mirador.layoutDescriptionFromGridString('1x3')
      });
      var originalId = this.workspace.layoutDescription.id;

      expect(this.workspace.layoutDescription.children.length).toBe(3);
      expect(this.workspace.slots.length).toBe(3);

      var newDescriptionChildrenIds = this.workspace.layoutDescription.children.map(function(child) {
        return child.id;
      });
      newDescriptionChildrenIds.splice(0,1);
      
      newSlotIDs = this.workspace.slots.map(function(slot) {
        return slot.slotID;
      });
      newSlotIDs.splice(0,1);

      this.workspace.removeNode(this.workspace.slots[0]);


      expect(this.workspace.layoutDescription.children.length).toEqual(2);
      expect(this.workspace.slots.length).toEqual(2);
      expect(this.workspace.layoutDescription.children.map(function(child) {
        return child.id;
      })).toEqual(newDescriptionChildrenIds);
      expect(this.workspace.slots.map(function(slot) {
        return slot.slotID;
      })).toEqual(newSlotIDs);
    });
    
    it('should remove sibling and create new parent with same id as target', function() {
      this.workspace = new Mirador.Workspace({
        parent:                     this.viewer, //viewer
        appendTo: this.viewerDiv,
        layoutDescription: Mirador.layoutDescriptionFromGridString('1x2')
      });
      var originalId = this.workspace.slots[1].slotID;

      expect(this.workspace.layoutDescription.children.length).toBe(2);
      expect(this.workspace.slots.length).toBe(2);

      this.workspace.splitDown(this.workspace.slots[0]);
      var newSlotID = this.workspace.slots[2].slotID;
      
      this.workspace.removeNode(this.workspace.slots[0]);

      expect(this.workspace.layoutDescription.children.length).toBe(2);
      expect(this.workspace.slots.length).toEqual(2);
      expect(this.workspace.layoutDescription.children[0].id).toBe(newSlotID);
      expect(this.workspace.slots[1].slotID).toBe(newSlotID);
    });
    
    xit('should remove sibling and create new parent with same id as target (even if siblings have children)', function() {
      this.workspace = new Mirador.Workspace({
        parent:                     this.viewer, //viewer
        appendTo: this.viewerDiv,
        layoutDescription: Mirador.layoutDescriptionFromGridString('1x2')
      });
      var originalId = this.workspace.slots[1].slotID;

      expect(this.workspace.layoutDescription.children.length).toBe(2);
      expect(this.workspace.slots.length).toBe(2);

      // split the right slot (column)
      this.workspace.splitDown(this.workspace.slots[1]);
      var newSlotID = this.workspace.slots[2].slotID;
      
      // remove the left slot...
      this.workspace.removeNode(this.workspace.slots[0]);

      // there should still be 2 slots, since the other column had children
      expect(this.workspace.layoutDescription.children.length).toBe(2);
      expect(this.workspace.slots.length).toEqual(2);
      expect(this.workspace.layoutDescription.children[1].id).toBe(newSlotID);
      expect(this.workspace.slots[1].slotID).toBe(newSlotID);
    });
    
    xit('should remove sibling and create new parent with same id as target (even if root)', function() {
      this.workspace = new Mirador.Workspace({
        parent:                     this.viewer, //viewer
        appendTo: this.viewerDiv,
        layoutDescription: Mirador.layoutDescriptionFromGridString('1x2')
      });
      var originalId = this.workspace.slots[1].slotID;

      expect(this.workspace.layoutDescription.children.length).toBe(2);
      expect(this.workspace.slots.length).toBe(2);

      this.workspace.removeNode(this.workspace.slots[0]);

      expect(this.workspace.layoutDescription.children).toBe(undefined);
      expect(this.workspace.slots.length).toEqual(1);
      expect(this.workspace.layoutDescription.id).toBe(originalId);
      expect(this.workspace.slots[0].slotID).toBe(originalId);
    });
    
  });

  xdescribe('Adding Windows', function() {
    var mockManifest = {

    };
    var windowConfig = {

    };
    expect(this.workspace.windows.length).toBe(0);
    this.workspace.addWindow(windowConfig);
    expect(this.workspace.windows.length).toBe(1);
  });

  xdescribe('Resetting Layout', function() {
    var mockManifest = {

    };
    var windowConfig = {

    };
    expect(this.workspace.windows.length).toBe(0);
    this.workspace.addWindow(windowConfig);
    this.workspace.addWindow(windowConfig);
    this.workspace.addWindow(windowConfig);
    expect(this.workspace.windows.length).toBe(3);
    this.resetLayout('1x2');
    expect(this.workspace.windows.length).toBe(2);
    expect(this.workspace.slots.length).toBe(2);
    expect(this.workspace.slots[0].window).not().toBe(null);
  });
});
