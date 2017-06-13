const postcss = require('postcss');

const plugin = require('./');

function run(input, output) {
    return postcss([ plugin ]).process(input).then(result => {
        expect(result.css).toEqual(output);
        expect(result.warnings().length).toBe(0);
    });
}

it('adds will-change prop', () => {
    const input = `
        a {
            transition: opacity 0.2s ease, width;
        }
    `;
    const output = `
        a {
            transition: opacity 0.2s ease, width;
            will-change: opacity, width;
        }
    `;

    return run(
        input,
        output
    );
});

it('does not override existing properties', () => {
    return run('a{ transition: opacity 0.2s ease, width; will-change: top; }',
               'a{ transition: opacity 0.2s ease, width; will-change: top; }');
});

it('does not get confused by other selectors', () => {
    const input  = `
        a {
            will-change: initial;
        }

        b {
            transition: top .2s ease-in-out, left 5s linear;
        }
    `;
    const output  = `
        a {
            will-change: initial;
        }

        b {
            transition: top .2s ease-in-out, left 5s linear;
            will-change: top, left;
        }
    `;
    return run(input, output);
});

it('ignore `all` prop', () => {
    const input  = `
        a {
            transition: all .2s ease-in-out;
        }
    `;
    const output  = `
        a {
            transition: all .2s ease-in-out;
        }
    `;
    return run(input, output);
});

it('ignore `all` shorthands', () => {
    const input  = `
        a {
            transition: .25s;
        }

        b {
            transition: 0.25s;
        }

        c {
            transition: 0.25s ease;
        }
    `;
    const output  = `
        a {
            transition: .25s;
        }

        b {
            transition: 0.25s;
        }

        c {
            transition: 0.25s ease;
        }
    `;
    return run(input, output);
});
