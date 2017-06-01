# PostCSS Will Change

<img align="right" width="95" height="95"
     title="Philosopher’s stone, logo of PostCSS"
     src="http://postcss.github.io/postcss/logo.svg">

[PostCSS] PostCSS plugin to generate will-change for transition props.

This plugin adds `will-change` property after `transition` property to speed up animations.

These hacks are required for browsers that do not support `will-change`.


[PostCSS]:      https://github.com/postcss/postcss

```css
.foo {
    transition: opacity 0.2s ease, width;
}
```

```css
.foo {
    transition: opacity 0.2s ease, width;
    will-change: opacity, width;
}
```

## Usage

```js
postcss([ require('postcss-will-change-transition') ])
```

See [PostCSS] docs for examples for your environment.
