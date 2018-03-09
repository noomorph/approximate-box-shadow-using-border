const { app, h } = hyperapp;

function* generateButtons({
    shadowOffsetX,
    shadowOffsetY,
    shadowColor,
}) {
    for (let shadowSize = 0; shadowSize <= 15; shadowSize++) {
        for (let shadowBlur = 0; shadowBlur <= 15; shadowBlur++) {
            yield {
                shadowOffsetX: shadowOffsetX + 'px',
                shadowOffsetY: shadowOffsetY + 'px',
                shadowSize: shadowSize + 'px',
                shadowBlur: shadowBlur + 'px',
                shadowColor,
            };
        }
    }
}

function ff(f) {
    return (f < 16 ? '0' : '') + f.toString(16);
}

function Button({
    shadowOffsetX,
    shadowOffsetY,
    shadowSize,
    shadowBlur,
    shadowColor,
}) {
    const boxShadow = `${shadowOffsetX} ${shadowOffsetY} ${shadowBlur} ${shadowSize} ${shadowColor}`;
    return h('button', { style: { boxShadow } });
}

function main() {
    const actions = {};

    const state = {
        buttons: [...generateButtons({
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowColor: '#000',
        })]
    };

    const view = (state) => {
        const buttons = state.buttons.map((props, index) => {
            return h(Button, Object.assign({}, props, {index}));
        });

        return h('main', '', buttons);
    };

    app(state, actions, view, document.body);
}

document.body.onload = main;
