/**
  @module ember-flexberry-dummy
*/

import Ember from 'ember';

/**
  CSS picker component.

  @class CssPickerComponent
  @extends <a href="http://emberjs.com/api/classes/Ember.Component.html">Ember.Component</a>
*/
export default Ember.Component.extend({
  /**
    Items containing possible CSS classes names with flags indicating whether class is selected or not.

    @private
    @property _items
    @type Object[]
  */
  _items: undefined,

  actions: {
    /**
      Handles changes in checkboxes related to CSS classes names.

      @method actions.onChange
    */
    onChange() {
      let classNames = Ember.A();
      this.$('input').each((index, input) => {
        if (input.checked) {
          classNames.pushObject(input.name);
        }
      });

      this.set('value', classNames.join(' '));
    }
  },

  /**
    Items containing possible CSS classes names.

    @property items
    @type Object[]
  */
  items: undefined,

  /**
    Single value combined from selected CSS classes names.

    @property value
    @type String
   */
  value: undefined,

  /**
    Initializes component.
  */
  init() {
    this._super(...arguments);

    this._generateItems();
    this._checkItems();
  },

  /**
    Observes changes in items collection.
  */
  _itemsDidChange: Ember.observer('items.[]', function() {
    this._generateItems();
    this._checkItems();
  }),

  /**
    Observes changes in value combined from selected CSS classes names.
  */
  _valueDidChange: Ember.observer('value', function() {
    this._checkItems();
  }),

  /**
    Generates items containing possible CSS classes names with flags indicating whether class is selected or not..

    @method _generateItems
  */
  _generateItems() {
    let items = Ember.A(this.get('items'));

    this.set('_items', items.map((item) => {
      return {
        name: item,
        checked: false
      };
    }));
  },

  /**
    Changes items flags indicating whether class is selected or not
    (depending on current value combined from selected CSS classes names).

    @method _checkItems
  */
  _checkItems() {
    let classNames = Ember.A((this.get('value') || '').split(' '));
    this.get('_items').forEach((item) => {
      Ember.set(item, 'checked', classNames.contains(item.name));
    });
  }
});
