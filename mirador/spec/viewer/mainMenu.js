describe('MainMenu Class', function () {
  describe('default configuration', function() {
    beforeEach(function() {
      this.viewer = {
        toggleBookmarkPanel: jasmine.createSpy(),
        toggleWorkspacePanel: jasmine.createSpy()
      };
      this.viewer.mainMenuSettings = {
        'buttons' : {
          'bookmark' : true,
          'layout' : true,
          'options' : false
        }
      };
      this.viewerDiv = jQuery('<div>');
      this.mainMenu = new Mirador.MainMenu({
        parent:                     this.viewer, //viewer
        appendTo: this.viewerDiv,
        mainMenuBarCls:             'menu-bar',
      });

    });

    // Tests rendering
    it('properly renders the template', function () {
      expect(this.viewerDiv.find('.bookmark-workspace')).toExist();
      expect(this.viewerDiv.find('.change-layout')).toExist();
      expect(this.mainMenu.element).toHaveClass('menu-bar');
    });

    // Tests events handling
    it('can detect clicking on the elements', function () {
      this.viewerDiv.find('.bookmark-workspace').trigger('click');
      expect(this.viewer.toggleBookmarkPanel).toHaveBeenCalledWith();
    });

    it('can detect change-layout menu invocation', function () {
      this.viewerDiv.find('.change-layout').trigger('click');
      expect(this.viewer.toggleWorkspacePanel).toHaveBeenCalledWith();
    });

  });

  describe('toggling behaviour', function() {
    
    beforeEach(function() {
      this.viewer = {
        toggleBookmarkPanel: jasmine.createSpy(),
        toggleSwitchWorkspace: jasmine.createSpy()
      };
      this.viewer.mainMenuSettings = {
        'buttons' : {
          'bookmark' : true,
          'layout' : false,
          'options' : false
        }
      };
      this.viewerDiv = jQuery('<div>');
      this.mainMenu = new Mirador.MainMenu({
        parent:                     this.viewer, //viewer
        appendTo: this.viewerDiv,
        mainMenuBarCls:             'menu-bar',
      });
    });
    
    it("doesn't render useless elements", function () {
      expect(this.viewerDiv.find('.change-layout')).not.toExist();
    });

    // test other options?

  });

});
