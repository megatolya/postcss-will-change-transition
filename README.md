# PostCSS will change transition

<img align="right" width="95" height="95"
     title="Philosopher’s stone, logo of PostCSS"
     src="http://postcss.github.io/postcss/logo.svg">

[PostCSS] plugin to generate will-change for transition props.

This plugin adds `will-change` property after `transition` property to speed up animations.

Can be combined with [postcss/postcss-will-change].

[PostCSS]:      https://github.com/postcss/postcss

```css
.foo {
    transition: opacity 0.2s ease, width 0.2s ease;
}
```

```css
.foo {
    transition: opacity 0.2s ease, width 0.2s ease;
    will-change: opacity, width;
}
```

## Important note

Make sure that if you use this plugin it does not contradict with `will-change` idea. Please see links below:

- https://developer.mozilla.org/en-US/docs/Web/CSS/will-change
- https://www.sitepoint.com/introduction-css-will-change-property/
- https://css-tricks.com/almanac/properties/w/will-change/

## Usage

```js
postcss([ require('postcss-will-change-transition') ])
```

See [PostCSS] docs for examples for your environment.
