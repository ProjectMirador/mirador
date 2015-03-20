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

  describe('user buttons/logo', function () {
    beforeEach(function () {

      spyOn(console, 'log');

      this.viewer = {};

      this.viewer.mainMenuSettings = {
        /* Setup will fail without 'buttons' */
        'buttons' : {
          'bookmark' : true,
          'layout' : false,
          'options' : false
        },
        "userButtons": [
          /* Ordinary link */
          { "label": "Link",
            "attributes": {
              "href": "http://example.com",
              "id":   "test-button"
            }
          },
          /* Callback link - omitted if it doesn't have an id */
          {"label": "Callback",
           "attributes": {"href": "#noop"},
           "callback": true},
          /* Sublists */
          {"label": "Sublist",
           "attributes": {"id": "sublist"},
           "sublist": [
             {"label": "One",
              "attributes": {"id": "sl-one"}},
             {"label": "Two",
              "attributes": {"id": "sl-two"}}]
          }
        ],
        "userLogo": {
          "label": "Logo",
          "attributes": {"id": "logo"}
        }
      }

      this.viewerDiv = jQuery('<div>');

      this.mainMenu = new Mirador.MainMenu({
        parent:         this.viewer,
        appendTo:       this.viewerDiv,
        mainMenuBarCls: 'menu-bar'
      });
    });

    it('creates regular buttons', function () {
      var button = this.viewerDiv.find('ul.user-buttons > li > a#test-button');
      expect(button).toExist;
      expect(button.text()).toBe("Link");
      expect(button.attr('href')).toBe("http://example.com");
      expect(button.attr('id')).toBe('test-button');
    });

    it('omits links marked "callback" if they don\'t have IDs', function () {
      expect(this.viewerDiv.find('a[href=#noop]')).not.toExist()
      expect(console.log).toHaveBeenCalled();
    });

    it('creates sublists', function () {
      expect(this.viewerDiv.find('ul.user-buttons > li > #sublist')).toExist();
      expect(this.viewerDiv.find('ul.user-buttons > li > #sublist + ul > li > #sl-one')).toExist();
      expect(this.viewerDiv.find('ul.user-buttons > li > #sublist + ul > li > #sl-two')).toExist();
    });

    it('creates userLogo', function () {
      expect(this.viewerDiv.find('ul.user-logo > li > a#logo').text()).toBe('Logo');
    });
  });

});
