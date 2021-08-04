import { ColorKeyValue } from "../components/ColorPalette";
//@ts-ignore
import Color from 'color-converter'

function calculateGainedColor(colors: ColorKeyValue) {
  const rgbColorToGain = {
    red: 0,
    green: 0,
    blue: 0
  }

  const flatColorsArray = Object.values(colors)

  const colorsSummaryCount = flatColorsArray.reduce((a, b) => a + (b['count'] || 0), 0)

  if (colorsSummaryCount === 0) {
    return null
  }

  for (const color of flatColorsArray) {
    const colorInRgb = Color.fromHex('#' + color.code).toRGB()

    for (const colorElement in colorInRgb) {
      if (colorInRgb[colorElement] === 255 && colorsSummaryCount > 1) {
          colorInRgb[colorElement] += 1
      }
    }

    rgbColorToGain.red += colorInRgb.r * color.count
    rgbColorToGain.green += colorInRgb.g * color.count
    rgbColorToGain.blue += colorInRgb.b * color.count
  }

  rgbColorToGain.red /= colorsSummaryCount
  rgbColorToGain.green /= colorsSummaryCount
  rgbColorToGain.blue /= colorsSummaryCount

  return Color.fromRGB(rgbColorToGain.red, rgbColorToGain.green, rgbColorToGain.blue).toHex()
}

export default calculateGainedColor