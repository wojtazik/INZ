import React, { useEffect, useState } from 'react'
import './style.scss'
import colorsInitial from '../../config/colors'
//@ts-ignore
import Color from 'color-converter'

const ColorPalette = () => {
  const [ colors, setColors ] = useState(colorsInitial)
  const [ gainedColor, setGainedColor ] = useState('')


  const getColorsSummaryCount = (colors: any) => {
    let colorsSummaryCount = 0

    for (const color in colors) {
        colorsSummaryCount += colors[color].count
    }

    return colorsSummaryCount
  }

  const calculateExpectedColor = () => {
    const rgbColorToGain = {
      red: 0,
      green: 0,
      blue: 0
    }

    const colorsSummaryCount = getColorsSummaryCount(colors)
    if (colorsSummaryCount === 0) {
      return null
    }

    for (const color in colors) {
        const colorInRgb = Color.fromHex('#' + colors[color].code).toRGB()
        for (const colorElement in colorInRgb) {
            if (colorInRgb[colorElement] === 255 && colorsSummaryCount > 1) {
                colorInRgb[colorElement] += 1
            }
        }
        rgbColorToGain.red += colorInRgb.r * colors[color].count
        rgbColorToGain.green += colorInRgb.g * colors[color].count
        rgbColorToGain.blue += colorInRgb.b * colors[color].count
    }
    
    rgbColorToGain.red /= colorsSummaryCount
    rgbColorToGain.green /= colorsSummaryCount
    rgbColorToGain.blue /= colorsSummaryCount

    return Color.fromRGB(rgbColorToGain.red, rgbColorToGain.green, rgbColorToGain.blue).toHex()
  }

  const onAddColor = (key: string) => {
    const newColors = {
      ...colors,
      [key]: {
        ...colors[key],
        count: colors[key].count + 1
      }
    }

    const colorsSummaryCount = getColorsSummaryCount(newColors)
    console.log(colorsSummaryCount)
    for (const color in newColors) {
      newColors[color].percent = newColors[color].count / colorsSummaryCount
    }
    console.log(newColors)
    setColors(newColors)
  }

  const onRemoveColor = (key: string) => {
    const newColors = {
      ...colors,
      [key]: {
        ...colors[key],
        count: colors[key].count > 0 ? colors[key].count - 1 : 0
      }
    }

    const colorsSummaryCount = getColorsSummaryCount(newColors)

    for (const color in newColors) {
      newColors[color].percent = colors[color].count / colorsSummaryCount
    }

    setColors(newColors)
  }

  const rendercolors = () => {
    return Object.keys(colors).map(function(key, index) {
      return (
        <div className='colors-palette__option'>
          <div className="colors-palette__option-view" style={{background: `#${colors[key].code}`}}>
            <span className="colors-palette__option-code" style={{color: key === 'black' ? 'white' : 'black'}}>{'#' + colors[key].code}</span>
          </div>
          <span>Count: {colors[key].count}</span>
          <span>Percent: {(colors[key].percent * 100).toFixed(1)} %</span>

          <div className='colors-palette__buttons-wrapper'>
              <button className='colors-palette__button' onClick={() => onAddColor(key)}>ADD</button>
              <button className='colors-palette__button' onClick={() => onRemoveColor(key)}>REMOVE</button>
            </div>
        </div>
      )
    });
  }

  useEffect(() => {
    const colorToSet = calculateExpectedColor()
    console.log(colorToSet)
    if (colorToSet) {
      setGainedColor(colorToSet)
    }
  }, [colors])

  return (
    <div className='colors-palette'>
      <div className='colors-palette__gained' style={{background: gainedColor}}>
        <span className="colors-palette__gained-code" >{gainedColor}</span>
      </div>
      <div className="colors-palette__options">
        {rendercolors()}
      </div>
    </div>
  )
}

export default ColorPalette