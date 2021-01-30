# Basic Table

A simple lightweight jQuery or Vanilla JS responsive table library. A library to setup tables for a basic responsive table stucture. Utilizing the techniques of http://css-tricks.com/responsive-data-tables/. This is to assists in those situations where the users don't necessarily have access or capacity to modify HTML such as input from a WYSIWYG.

**[View Demo (jQuery)](http://www.jerrylow.com/basictable/demo/index.html)**

**[View Demo (Vanilla JS)](http://www.jerrylow.com/basictable/demo/vanilla-js.html)**

## jQuery User Notes for 2.0.0

The jQuery version remains the same as 1.0.0. While the source remains unchanged there are three things to note when upgrading:

- Distribution files are no longer in the root directory, they've moved to `/dist/js/jquery.basictable.js` and `/dist/js/jquery.basictable.min.js`,
- The non-minified version is now a beautified version rather than the source file, and
- The minified version is no longer compressed with uglifyjs, it's compressed using Tercer.

These changes should have no impact on the way it functions in comparison with 1.x.

## Options

Options are applicable to both the jQuery and Vanilla JS.

### breakpoint

`integer` `default: null`

Define the breakpoint (viewport's width) when the table will engage in responsive mode. If the `containerBreakpoint` is `null` (which is the default) the value will be 568px.

### containerBreakpoint

`integer` `default: null`

Define the breakpoint of the table's container when the table will engage in responsive mode.

### contentWrap

`boolean` `default: true`

Wraps the original content within the cell in a span with class .bt-content, to help with CSS selection.

### forceResponsive

`boolean` `default: true`

The library will always force the table into responsive mode once the breakpoint is met. If this is set to false the table will only change mode when the table itself is larger than its immediate parent's inner width.

### noResize

`boolean` `default: false`

Disable Basic Table's JS resize. The table won't engage in responsive mode unless media query or another resize bind outside of Basic Table is defined.

### tableWrap

`boolean` `default: false`

When the library is initialize create a div wrapper around the table with class .bt-wrapper. This wrapper will toggle an active class when the table mode changes.

### showEmptyCells

`boolean` `default: false`

When true, empty cells will be shown.

### header

`boolean` `default: true`

Set to false if table does not have a header row. Table will just be responsive with table body and optional footer.

## Methods (jQuery)

### start

Engage the table in responsive mode. This method can only run after the table has been initialized.

```js
$('table').basictable('start');
```

### stop

Toggle the table back to normal mode, removing the responsive look. This does not destory the Basic Table data and wrappers. The table will still work once the breakpoint is met.

```js
$('table').basictable('stop');
```

### destroy

Destroy the the responsive bind on the table. This will remove all data and generated wrappers from the table, returning it to its initial state.

```js
$('table').basictable('destroy');
```

### restart

Run `destroy`, `setup` then `check` without resetting the table data. Run this if the table dynamically updates.

```js
$('table').basictable('restart');
```

## Methods (Vanilla JS)

Methods demonstrated assuming you've defined the object as `table`.

```
const table = new basictable('.table');
```

### start

Engage the table in responsive mode. This method can only run after the table has been initialized.

```js
table.start();
```

### stop

Toggle the table back to normal mode, removing the responsive look. This does not destory the Basic Table data and wrappers. The table will still work once the breakpoint is met.

```js
table.stop();
```

### destroy

Destroy the the responsive bind on the table. This will remove all data and generated wrappers from the table, returning it to its initial state.

```js
table.destroy();
```

### restart

Run `destroy`, `setup` then `check` without resetting the table data. Run this if the table dynamically updates.

```js
table.restart();
```
