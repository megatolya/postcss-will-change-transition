const postcss = require('postcss');

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
                .map(str => str.trim().split(' ')[0])
                .join(', ');

            decl.cloneAfter({
                prop: 'will-change',
                value
            });
        });
    };
});
