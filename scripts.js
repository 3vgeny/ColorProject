let col = Array.from(document.querySelectorAll('.col'))
// const setColors = [];
// const colorsHash = window.location.hash.split("&");
// // colorsHash.map((elem, index) => {
// //   if (index != 1) setColors.push("#" + elem);
// //   setColors.push(elem);
// // });

// console.log(window.location.hash);
// console.log(colorsHash);

let arr = col.map((elem, index) => {
  setRelationRandomColorColumn(elem)
  // window.location.hash = "";

  elem.querySelector('button').addEventListener('click', (event) => changeLockUnlock(event))
})

document.body.addEventListener('keydown', (event) => {
  if (event.code !== 'Space') return
  // setColors.splice(0, setColors.length)
  col.map((elem) => {
    setRelationRandomColorColumn(elem)
  })
})

function setRelationRandomColorColumn(column) {
  if (column.querySelector('.material-symbols-outlined').textContent == 'lock') {
    // setColors.push(column.querySelector('p').textContent.slice(1))
    // window.location.hash = setColors.join('&')
    // return
  }
  const colorBg = generateRandomColor()
  const colorText = selectingTextColor(colorBg)
  column.style.backgroundColor = colorBg
  column.style.color = colorText
  column.querySelector('button').style.color = colorText
  column.querySelector('p').textContent = colorBg
  // setColors.push(colorBg.slice(1))
  // window.location.hash = setColors.join('&')
}

function changeLockUnlock(event) {
  if (event.target.classList.value == 'material-symbols-outlined') {
    switchLock(event.target)
  }
  if (event.target.classList.value == 'button') {
    const span = event.target.querySelector('.material-symbols-outlined')
    switchLock(span)
  }
}

function switchLock(block) {
  if (block.textContent == 'lock') {
    block.textContent = 'lock_open_right'
  } else {
    block.textContent = 'lock'
  }
  block.parentNode.blur()
}

function generateRandomColor() {
  const symbolsColor = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']

  let randomColor = '#'

  for (let i = 0; i < 6; i++) {
    const rand = Math.random() * symbolsColor.length
    randomColor += symbolsColor[Math.floor(rand)]
  }

  return randomColor
}

function brightnessCalculation(color) {
  const red = parseInt(color.slice(1, 3), 16)
  const green = parseInt(color.slice(3, 5), 16)
  const blue = parseInt(color.slice(5), 16)

  const relativeRed = Number((red / 255).toFixed(5))
  const relativeGreen = Number((green / 255).toFixed(5))
  const relativeBlue = Number((blue / 255).toFixed(5))

  const L = 0.2126 * RGBCalculation(relativeRed) + 0.7152 * RGBCalculation(relativeGreen) + 0.0722 * RGBCalculation(relativeBlue)

  return L.toFixed(5)
}

function RGBCalculation(valueColor) {
  return valueColor <= 0.03928 ? valueColor / 12.92 : Math.pow((valueColor + 0.055) / 1.055, 2.4)
}

function selectingTextColor(colorBg) {
  const brightnessColor = brightnessCalculation(colorBg)
  const contrastWhite = (1.05 / (+brightnessColor + 0.05)).toFixed(1)
  return +contrastWhite < 4.5 ? '#000000' : '#FFFFFF'
}
