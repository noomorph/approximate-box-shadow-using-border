(function main() {
    'use strict';


    /*** DEMO UI ***/

    const shadowButton = document.getElementById('shadow-button');
    const borderButton = document.getElementById('border-button');

    const borderWidthOutput = document.getElementById('borderWidth');
    const borderOpacityOutput = document.getElementById('borderOpacity');

    const backgroundColorInput = document.getElementById("backgroundColor");
    const buttonWidthInput = document.getElementById("buttonWidth");
    const buttonHeightInput = document.getElementById("buttonHeight");
    const buttonCornerRadiusInput = document.getElementById("buttonCornerRadius");
    const shadowSizeInput = document.getElementById("shadowSize");
    const shadowBlurInput = document.getElementById("shadowBlur");
    const shadowColorInput = document.getElementById("shadowColor");
    const shadowOpacityInput = document.getElementById("shadowOpacity");

    function addHexOpacity(hexColor, opacity) {
        const opacity256 = Math.floor(opacity * 2.55).toString(16);
        const opacityHex = ((opacity < 16) ? '0' : '') + opacity256;

        return hexColor + opacityHex;
    }

    function getSettings() {
        return {
            backgroundColor: backgroundColorInput.value,
            buttonWidth: Number(buttonWidthInput.value),
            buttonHeight: Number(buttonHeightInput.value),
            buttonCornerRadius: Number(buttonCornerRadiusInput.value),
            shadowSize: Number(shadowSizeInput.value),
            shadowBlur: Number(shadowBlurInput.value),
            shadowOpacity: Number(shadowOpacityInput.value),
            shadowColor: shadowColorInput.value,
        };
    }

    function render() {
        const settings = getSettings();

        for (const button of [shadowButton, borderButton]) {
            button.parentElement.style.backgroundColor = settings.backgroundColor;
            button.style.width = settings.buttonWidth + 'px';
            button.style.height = settings.buttonHeight + 'px';
            button.style.borderRadius = settings.buttonCornerRadius + 'px';
        }

        const [borderWidth, borderAlpha] = approximateShadowUsingBorder(settings.shadowSize, settings.shadowBlur, 'abs');
        const borderColor = addHexOpacity(settings.shadowColor, settings.shadowOpacity * borderAlpha);
        const shadowColor = addHexOpacity(settings.shadowColor, settings.shadowOpacity);

        shadowButton.style.boxShadow = `0 0 ${settings.shadowBlur}px ${settings.shadowSize}px ${shadowColor}`;
        borderButton.style.borderWidth = borderWidth + 'px';
        borderButton.style.borderColor = borderColor;

        borderWidthOutput.value = borderWidth;
        borderOpacityOutput.value = Math.round(settings.shadowOpacity * borderAlpha);

        if (parent && parent.document) {
          parent.document.getElementById('demo-iframe').style.height = document['body'].offsetHeight + 'px';
        }
    }

    document.body.onload = function onload() {
        render();

        [].slice.call(document.querySelectorAll('input')).forEach(input => {
            input.oninput = render;
        });
    };
}());
