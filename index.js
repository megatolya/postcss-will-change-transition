const postcss = require('postcss');
const cssProps = require('css-properties-values');

const transitionProps = cssProps.map(prop => prop.property);

module.exports = postcss.plugin('postcss-will-change-transition', function () {
    return function (css) {
        css.walkDecls('transition', function (decl) {
            const already = decl.parent.some(elem =>
                elem.type === 'decl' && elem.prop === 'will-change'
            );

            if (already || /all/.test(decl.value)) {
                return;
            }

            const value = decl.value
                .split(',')
                .map(str => str.trim().split(' '))
                .filter(splitted => transitionProps.includes(splitted[0]))
                .map(splitted => splitted[0])
                .join(', ');

            if (!value) {
                return;
            }

            decl.cloneAfter({
                prop: 'will-change',
                value
            });
        });
    };
});
