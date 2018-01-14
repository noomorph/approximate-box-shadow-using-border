{
  const previewButton = document.getElementById('preview_button');
  const approximationButton = document.getElementById('approximation_button');

  const backgroundColorInput = document.getElementById("backgroundColor");
  const buttonColorInput = document.getElementById("buttonColor");
  const buttonWidthInput = document.getElementById("buttonWidth");
  const buttonHeightInput = document.getElementById("buttonHeight");
  const buttonCornerRadiusInput = document.getElementById("buttonCornerRadius");
  const borderWidthInput = document.getElementById("borderWidth");
  const borderColorInput = document.getElementById("borderColor");
  const shadowOffsetXInput = document.getElementById("shadowOffsetX");
  const shadowOffsetYInput = document.getElementById("shadowOffsetY");
  const shadowSizeInput = document.getElementById("shadowSize");
  const shadowBlurInput = document.getElementById("shadowBlur");
  const shadowColorInput = document.getElementById("shadowColor");
  const shadowOpacityInput = document.getElementById("shadowOpacity");

  Object.assign(this, {
    getSettings() {
      const shadowColor = shadowColorInput.value;
      const shadowOpacity256 = Math.round(Number(shadowOpacityInput.value) * 2.55);
      const shadowHEXOpacity = ((shadowOpacity256 < 16) ? '0' : '') + shadowOpacity256.toString(16);

      return {
        backgroundColor: backgroundColorInput.value,
        buttonColor: buttonColorInput.value,
        buttonWidth: buttonWidthInput.value + 'px',
        buttonHeight: buttonHeightInput.value + 'px',
        buttonCornerRadius: buttonCornerRadiusInput.value + 'px',
        borderWidth: borderWidthInput.value + 'px',
        borderColor: borderColorInput.value,
        shadowOffsetX: shadowOffsetXInput.value + 'px',
        shadowOffsetY: shadowOffsetYInput.value + 'px',
        shadowSize: shadowSizeInput.value + 'px',
        shadowBlur: shadowBlurInput.value + 'px',
        shadowAlphaColor: shadowColor + shadowHEXOpacity,
      };
    },
    render() {
      const settings = this.getSettings();

      [previewButton, approximationButton].forEach((button) => {
        button.parentElement.style.backgroundColor = settings.backgroundColor;
        button.style.backgroundColor = settings.buttonColor;
        button.style.width = settings.buttonWidth;
        button.style.height = settings.buttonHeight;
        button.style.borderRadius = settings.buttonCornerRadius;
      });

      previewButton.style.borderStyle = 'solid';
      previewButton.style.borderWidth = settings.borderWidth;
      previewButton.style.borderColor = settings.borderColor;

      previewButton.style.boxShadow = `${settings.shadowOffsetX} ${settings.shadowOffsetY} ${settings.shadowBlur} ${settings.shadowSize} ${settings.shadowAlphaColor}`;
    },
  });
}
