import Ember from 'ember';

import I18nService from 'ember-i18n/services/i18n';
import I18nRuLocale from 'ember-flexberry/locales/ru/translations';
import I18nEnLocale from 'ember-flexberry/locales/en/translations';

import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('flexberry-field', 'Integration | Component | flexberry field', {
  integration: true,

  beforeEach: function () {
    this.register('locale:ru/translations', I18nRuLocale);
    this.register('locale:en/translations', I18nEnLocale);
    this.register('service:i18n', I18nService);

    this.inject.service('i18n', { as: 'i18n' });
    Ember.Component.reopen({
      i18n: Ember.inject.service('i18n')
    });

    // Set 'ru' as initial locale.
    this.set('i18n.locale', 'ru');
  }
});

test('it renders properly', function(assert) {
  assert.expect(4);

  // Render component.
  this.render(hbs`{{flexberry-field
    class=class
  }}`);

  // Retrieve component.
  let $component = this.$().children();

  // Check wrapper <div>.
  assert.strictEqual($component.prop('tagName'), 'DIV', 'Component\'s wrapper is a <div>');
  assert.strictEqual($component.hasClass('flexberry-field'), true, 'Component\'s wrapper has \' flexberry-field\' css-class');
  assert.strictEqual($component.hasClass('ui'), true, 'Component\'s wrapper has \'ui\' css-class');
  assert.strictEqual($component.hasClass('field'), true, 'Component\'s wrapper has \'field\' css-class');
});

test('label mode works properly', function(assert) {
  assert.expect(3);

  // Render component.
  this.render(hbs`{{flexberry-field
    class=class
    label=label
  }}`);

  // Retrieve component.
  let $component = this.$().children();

  // Check that label attribute doesn't exist now.
  this.set('label', null);
  assert.strictEqual(this.get('label'), null, 'Component\'s hasn\'t wrapper is a <lable>');

  // Add text for label & check that label attribute exist.
  let labelText = 'Some text for label';
  this.set('label', labelText);

  assert.strictEqual(
  this.get('label'), labelText, 'Component\'s has wrapper is a <lable>');

  // Check that label attribute doesn't exist now.
  this.set('label', null);
  assert.strictEqual(this.get('label'), null, 'Component\'s hasn\'t wrapper is a <lable>');
});

test('readonly mode works properly', function(assert) {
  assert.expect(3);

  // Render component.
  this.render(hbs`{{flexberry-field
    class=class
    readonly=readonly
  }}`);

  // Retrieve component.
  let $component = this.$().children();
  let $fieldInput = Ember.$('.flexberry-textbox input', $component);

  // Check that <input>'s readonly attribute doesn't exist yet.
  assert.strictEqual(
    Ember.$.trim($fieldInput.attr('readonly')),
    '',
    'Component\'s inner <input> hasn\'t readonly attribute');

  // Activate readonly mode & check that <input>'s readonly attribute exists now & has value equals to 'readonly'.
  this.set('readonly', true);
  assert.strictEqual(
    Ember.$.trim($fieldInput.attr('readonly')),
    'readonly',
    'Component\'s inner <input> has readonly attribute with value equals to \'readonly\'');

  // Check that <input>'s readonly attribute doesn't exist now.
  this.set('readonly', false);
  assert.strictEqual(
    Ember.$.trim($fieldInput.attr('readonly')),
    '',
    'Component\'s inner <input> hasn\'t readonly attribute');
});

test('readonly mode works properly with value', function(assert) {
  assert.expect(2);

  // Set <input>'s value' & render component.
  this.set('value', null);
  this.set('readonly', true);
  this.render(hbs`{{flexberry-field
    readonly=readonly
    value=value
  }}`);

  // Retrieve component.
  let $component = this.$().children();
  let $fieldInput = Ember.$('.flexberry-textbox input', $component);

  $fieldInput.on('change', (e) => {
    if (this.get('readonly')) {
      e.stopPropagation();
      $fieldInput.val(null);
    }
  });

  let newValue = 'New value';
  $fieldInput.val(newValue);
  $fieldInput.change();

  // Check <input>'s value not changed.
  assert.strictEqual(
    Ember.$.trim($fieldInput.val()),
    '',
    'Component\'s inner <input>\'s value not changed');
  assert.strictEqual(
    this.get('value'),
    null,
    'Component\'s property binded to unchanged \'value\'');
});

test('it renders i18n-ed placeholder', function(assert) {
  assert.expect(2);

  // Render component.
  this.render(hbs`{{flexberry-field}}`);

  // Retrieve component.
  let $component = this.$().children();
  let $fieldInput = Ember.$('.flexberry-textbox input', $component);

  // Check <input>'s placeholder.
  assert.strictEqual(
    Ember.$.trim($fieldInput.attr('placeholder')),
    Ember.get(I18nRuLocale, 'components.flexberry-field.placeholder'),
    'Component\'s inner <input>\'s placeholder is equals to it\'s default value from i18n locales/ru/translations');

  // Change current locale to 'en' & check <input>'s placeholder again.
  this.set('i18n.locale', 'en');
  assert.strictEqual(
    Ember.$.trim($fieldInput.attr('placeholder')),
    Ember.get(I18nEnLocale, 'components.flexberry-field.placeholder'),
    'Component\'s inner <input>\'s placeholder is equals to it\'s value from i18n locales/en/translations');
});

test('it renders manually defined placeholder', function(assert) {
  assert.expect(2);

  // Set <input>'s placeholder' & render component.
  this.render(hbs`{{flexberry-field
    placeholder=placeholder
  }}`);

  // Retrieve component.
  let $component = this.$().children();
  let $fieldInput = Ember.$('.flexberry-textbox input', $component);

  let placeholder = 'input is empty, please type some text';
  this.set('placeholder', placeholder);

  // Check <input>'s placeholder.
  assert.strictEqual(
    Ember.$.trim($fieldInput.attr('placeholder')),
    placeholder,
    'Component\'s inner <input>\'s placeholder is equals to manually defined value \'' + placeholder + '\'');

  // Change placeholder's value & check <input>'s placeholder again.
  placeholder = 'input has no value';
  this.set('placeholder', placeholder);
  assert.strictEqual(
    Ember.$.trim($fieldInput.attr('placeholder')),
    placeholder,
    'Component\'s inner <input>\'s placeholder is equals to manually updated value \'' + placeholder + '\'');
});

test('type mode works properly', function(assert) {
  assert.expect(7);

  // Render component.
  this.render(hbs`{{flexberry-field
    class=class
    type=type
  }}`);

  // Retrieve component.
  let $component = this.$().children();
  let $fieldInput = Ember.$('.flexberry-textbox input', $component);

  // Check that <input>'s type attribute doesn't exist yet.
  assert.strictEqual(
    Ember.$.trim($fieldInput.attr('type')),
    '',
    'Component\'s inner <input> hasn\'t type attribute');

  // Check that <input>'s type attribute 'text'.
  this.set('type', 'text');
  assert.strictEqual(
    Ember.$.trim($fieldInput.attr('type')),
    'text',
    'Component\'s inner <input> type attribute \'text\'');

  // Check that <input>'s type attribute 'number'.
  this.set('type', 'number');
  assert.strictEqual(
    Ember.$.trim($fieldInput.attr('type')),
    'number',
    'Component\'s inner <input> type attribute \'number\'');

  // Check that <input>'s type attribute 'password'.
  this.set('type', 'password');
  assert.strictEqual(
    Ember.$.trim($fieldInput.attr('type')),
    'password',
    'Component\'s inner <input> type attribute \'password\'');

  // Check that <input>'s type attribute 'color'.
  this.set('type', 'color');
  assert.strictEqual(
    Ember.$.trim($fieldInput.attr('type')),
    'color',
    'Component\'s inner <input> type attribute \'color\'');

  // Check that <input>'s type attribute 'button'.
  this.set('type', 'button');
  assert.strictEqual(
    Ember.$.trim($fieldInput.attr('type')),
    'button',
    'Component\'s inner <input> type attribute \'button\'');

  // Check that <input>'s type attribute 'hidden'.
  this.set('type', 'hidden');
  assert.strictEqual(
    Ember.$.trim($fieldInput.attr('type')),
    'hidden',
    'Component\'s inner <input> type attribute \'hidden\'');
});

test('changes in inner <input> causes changes in property binded to \'value\'', function(assert) {
  assert.expect(4);

  // Set <input>'s value' & render component.
  this.set('value', null);
  this.render(hbs`{{flexberry-field
    value=value
  }}`);

  // Retrieve component.
  let $component = this.$().children();
  let $fieldInput = Ember.$('.flexberry-textbox input', $component);

  // Check <input>'s value & binded value for initial emptyness.
  assert.strictEqual(
    Ember.$.trim($fieldInput.val()),
    '',
    'Component\'s inner <input>\'s value is equals to \'\'');
  assert.strictEqual(
    this.get('value'),
    null,
    'Component\'s property binded to \'value\' is equals to null');

  // Change <input>'s value (imitate situation when user typed something into component's <input>)
  // & check them again ('change' event is needed to force bindings work).
  let newValue = 'Some text typed into inputs inner <input>';
  $fieldInput.val(newValue);
  $fieldInput.change();

  assert.strictEqual(
    Ember.$.trim($fieldInput.val()),
    newValue,
    'Component\'s inner <input>\'s value is equals to \'' + newValue + '\'');
  assert.strictEqual(
    this.get('value'),
    newValue,
    'Component\'s property binded to \'value\' is equals to \'' + newValue + '\'');
});

test('changes in property binded to \'value\' causes changes in inner <input>', function(assert) {
  assert.expect(4);

  // Set <input>'s value' & render component.
  this.set('value', null);
  this.render(hbs`{{flexberry-field
    value=value
  }}`);

  // Retrieve component.
  let $component = this.$().children();
  let $fieldInput = Ember.$('.flexberry-textbox input', $component);

  // Check <input>'s value & binded value for initial emptyness.
  assert.strictEqual(
    Ember.$.trim($fieldInput.val()),
    '',
    'Component\'s inner <input>\'s value is equals to \'\'');
  assert.strictEqual(
    this.get('value'),
    null,
    'Component\'s property binded to \'value\' is equals to null');

  // Change property binded to 'value' & check them again.
  let newValue = 'Some text typed into inputs inner <input>';
  this.set('value', newValue);

  assert.strictEqual(
    Ember.$.trim($fieldInput.val()),
    newValue,
    'Component\'s inner <input>\'s value is equals to \'' + newValue + '\'');
  assert.strictEqual(
    this.get('value'),
    newValue,
    'Component\'s property binded to \'value\' is equals to \'' + newValue + '\'');
});
