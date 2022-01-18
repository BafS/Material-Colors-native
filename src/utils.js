/**
 * @param {string} hexStr
 * @returns string `r,g,b` format
 */
const hexToRgb = hexStr => {
  const aRgbHex = hexStr.replace(/^#/, '').match(/.{1,2}/g);

  const aRgb = [
    parseInt(aRgbHex[0], 16),
    parseInt(aRgbHex[1], 16),
    parseInt(aRgbHex[2], 16),
  ];

  return aRgb.join(',');
};

export const luminosity = hexStr =>
  parseInt(hexStr[0], 16) + parseInt(hexStr[2], 16) + parseInt(hexStr[4], 16);

export const getFormater = format => {
  const formats = {
    'rgb-simple': hex => 'rgb(' + hexToRgb(hex) + ')',
    rgb: hex => 'rgb(' + hexToRgb(hex) + ')',
    hex: hex => hex,
    '#hex': hex => `#${hex}`,
  };

  return formats[format] ?? null;
};
