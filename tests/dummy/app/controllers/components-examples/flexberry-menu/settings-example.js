import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    onMenuItemClick: function(e) {
      var clickedMenuItem = Ember.$(e.currentTarget);
      this.set('currentItem', clickedMenuItem.data('flexberry-menuitem.item'));
      clickedMenuItem.popup({
        content: 'This menu item has been clicked',
        position: 'top right',
        delay: {
          show: 0,
          hide: 200
        },
        on: 'manual',
        onHidden: function(e) {
          var owner = Ember.$(e);
          owner.popup('destroy');
        }
      });

      clickedMenuItem.popup('show');

      window.setTimeout((function() {
        clickedMenuItem.popup('hide');
      }).bind(this), 1000);
    }
  },

  /**
   * Menu items for 'flexberry-menu' component.
   *
   * @property items
   * @type Object
   */
  items: null,

  /**
   * Selected menu item for 'flexberry-menu' component.
   *
   * @property currentItem
   * @type Object
   */
  currentItem: null,

  /**
   * Initializes controller.
   * @method init
   */
  init: function() {
    this._super(...arguments);

    var oneMenuSectionItems = [{
      icon: 'search icon',
      title: 'Left side aligned icon',
      items: null
    }, {
      icon: 'setting icon',
      iconAlignment: 'right',
      title: 'Right side aligned icon',
      items: null
    }, {
      icon: 'list layout icon',
      title: 'Submenu',
      itemsAlignment: null,
      items: null
    }];

    var items = Ember.copy(oneMenuSectionItems, true);
    this.set('currentItem', items[0]);
    var currentMenuSectionItems = items;
    for (var i = 0; i < 5; i++) {
      var subMenu = currentMenuSectionItems[2];
      subMenu.items = Ember.copy(oneMenuSectionItems, true);
      subMenu.itemsAlignment = i % 2 === 0 ? 'right' : 'left';

      currentMenuSectionItems = subMenu.items;
    }

    currentMenuSectionItems.pop();

    this.set('items', items);
  },

  /**
    Component settings metadata.

    @property componentSettingsMetadata
    @type Object[]
   */
  componentSettingsMetadata: Ember.computed(function() {
    var componentSettingsMetadata = Ember.A();
    componentSettingsMetadata.pushObject({
      settingName: 'icon',
      settingType: 'string',
      settingDefaultValue: 'undefined',
      bindedControllerPropertieName: 'currentItem.icon'
    });
    componentSettingsMetadata.pushObject({
      settingName: 'iconAlignment',
      settingType: 'string',
      settingDefaultValue: 'undefined',
      bindedControllerPropertieName: 'currentItem.iconAlignment'
    });
    componentSettingsMetadata.pushObject({
      settingName: 'title',
      settingType: 'string',
      settingDefaultValue: 'undefined',
      bindedControllerPropertieName: 'currentItem.title'
    });
    componentSettingsMetadata.pushObject({
      settingName: 'itemsAlignment',
      settingType: 'string',
      settingDefaultValue: 'undefined',
      bindedControllerPropertieName: 'currentItem.itemsAlignment'
    });

    return componentSettingsMetadata;
  })
});
