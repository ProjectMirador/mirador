describe('MainMenu', function () {

  describe('default configuration', function() {
    beforeEach(function() {

      //register Handlebars helper
      Handlebars.registerHelper('t', function(i18n_key) {
        var result = i18n.t(i18n_key);
        return new Handlebars.SafeString(result);
      });

      var mainMenuSettings = {
        'buttons' : {
          'bookmark' : true,
          'layout' : true,
          'options' : false,
          'fullScreenViewer': true
        }
      };

      this.viewerDiv = jQuery('<div>');
      this.mainMenu = new Mirador.MainMenu({
        state: new Mirador.SaveController({"mainMenuSettings": mainMenuSettings}),
        appendTo: this.viewerDiv,
        mainMenuBarCls:             'menu-bar',
      });

    });

    // Tests rendering
    it('properly renders the template', function () {
      expect(this.viewerDiv.find('.bookmark-workspace')).toExist();
      expect(this.viewerDiv.find('.change-layout')).toExist();
      expect(this.viewerDiv.find('.fullscreen-viewer')).toExist();
      expect(this.mainMenu.element).toHaveClass('menu-bar');
    });

    // Tests events handling
    var menu_invocations = [
      {'name': 'bookmark', 'selector': '.bookmark-workspace', 'event': 'TOGGLE_BOOKMARK_PANEL'},
      {'name': 'layout', 'selector': '.change-layout', 'event': 'TOGGLE_WORKSPACE_PANEL'},
      {'name': 'fullscreen', 'selector': '.fullscreen-viewer', 'event': 'TOGGLE_FULLSCREEN'}
    ];
    menu_invocations.forEach(function(test) {
      it("can detect clicking " + test.name + " and publishes event", function() {
        spyOn(jQuery, 'publish');
        this.viewerDiv.find(test.selector).trigger('click');
        expect(jQuery.publish).toHaveBeenCalledWith(test.event);
      });
    });

  });

  describe('toggling behaviour', function() {

    beforeEach(function() {
      var mainMenuSettings = {
        'buttons' : {
          'bookmark' : true,
          'layout' : false,
          'options' : false
        }
      };
      this.viewerDiv = jQuery('<div>');
      this.mainMenu = new Mirador.MainMenu({
        state: new Mirador.SaveController({"mainMenuSettings": mainMenuSettings}),
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
      var mainMenuSettings = {
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
      };

      this.viewerDiv = jQuery('<div>');

      this.mainMenu = new Mirador.MainMenu({
        state: new Mirador.SaveController({"mainMenuSettings": mainMenuSettings}),
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
