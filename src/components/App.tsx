import * as React from 'react'
import { animated, useSpring } from 'react-spring'

// Import stylesheets
import './app.css'
import Letterize from 'letterizejs'
import styled from 'styled-components'
import { Outbounds } from './Outbounds'
import image from '/public/cover.jpg'
import { use3dEffect } from 'hooks'
const trans = (x: number, y: number, s: number): string =>
  `perspective(1000px) rotateX(${0}deg) rotateY(${-0}deg) scale(${0})`

function randomFloatFromInterval(min: number, max: number) {
  // min and max included
  return Math.random() * (max - min + 1) + min
}
function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const windowWidth = window.innerWidth
const windowHeight = window.innerWidth
const keyFrames = []
const classes = []
function iOS() {
  return (
    [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ].find((el) => el === navigator.platform) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
  )
}
const isAppleDevice = iOS()
for (let i = 0; i < 50; i++) {
  keyFrames.push(`
    @keyframes popinplace${i} {
      0% {
        opacity: 0;
        backface-visibility: hidden;
        ${isAppleDevice ? 'filter: blur(8px);' : ''}
        transform: 
          translate3d(
            ${randomIntFromInterval(-2 * windowWidth, 2 * windowWidth)}px, 
            ${randomIntFromInterval(
              -1.5 * windowHeight,
              1.5 * windowHeight
            )}px, 0px)
          Scale(${randomIntFromInterval(15, 30)})
          rotateZ(${randomIntFromInterval(-500, 500)}deg);
      }
      100% {
        ${isAppleDevice ? 'filter: blur(0px);' : ''}
        opacity: 1;
        transform: translate3d(0px, 0px, 0px) Scale(1) rotateZ(0deg);
      }
    }
  `)
  classes.push(`
    .pop${i} {
      display: inline-block;
      animation: ${randomFloatFromInterval(
        0.75,
        1.25
      )}s forwards ease .75s popinplace${i};
    }
  `)
}
const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  ${keyFrames.join('')}
  ${classes.join('')}
`
function getOffset(el: { getBoundingClientRect: () => any }) {
  const rect = el.getBoundingClientRect()
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY
  }
}
export default function App() {
  const elementRef = React.useRef<any>()
  const finalPositionRef = React.useRef<any>()
  const cardRef = React.useRef<any>()

  const [animationDone, setAnimationDone] = React.useState(false)
  const moveToGoodPosition = React.useCallback(() => {
    const animationText: any = document.getElementById('animateMe')
    const finalPositionTitle: any =
      document.getElementById('finalPositionTitle')
    if (animationText && finalPositionTitle) {
      const offset = getOffset(finalPositionRef.current)
      animationText.style.left = `${parseInt(offset.left)}px`
      animationText.style.top = `${parseInt(offset.top)}px`
      animationText.style.transform = `translate3d(-1px, 0px, 0)`
      window.setTimeout(() => {
        animationText.style.opacity = '0'
        finalPositionTitle.style.opacity = '1'
        window.setTimeout(() => {
          setAnimationDone(true)
        }, 500)
      }, 500)
    }
  }, [])
  React.useEffect(() => {
    if (elementRef.current) {
      elementRef.current.style.opacity = 1
      const example = new Letterize({ targets: '#animateMe' })
      const letters = example.listAll
      const randomIndexes = Array.from(Array(letters.length).keys()).sort(
        function () {
          return Math.random() - 0.5
        }
      )
      let i = 0
      let j = 0
      const animationLetterIsDone = () => {
        j++
        if (j >= letters.length) {
          window.setTimeout(() => {
            cardRef.current.style.opacity = 1
            moveToGoodPosition()
          }, 1250)
        }
      }
      addEventListener('resize', () => {
        moveToGoodPosition()
      })

      setInterval(() => {
        if (i < letters.length) {
          letters[randomIndexes[i]].addEventListener(
            'animationend',
            () => animationLetterIsDone(),
            false
          )
          if (letters[randomIndexes[i]].innerHTML === '.') {
            letters[randomIndexes[i]].classList.add('blank')
          } else {
            letters[randomIndexes[i]].classList.add('pop' + i)
          }
          i++
        }
      }, 10)
    }
  }, [moveToGoodPosition])
  const animatedDivRef = React.useRef<HTMLDivElement>(null)
  const glowRef = React.useRef<HTMLDivElement>(null)

  const {
    style: animationStyle,
    styleGlow,
    ...mouseEvents
  } = use3dEffect(animatedDivRef, glowRef, animationDone)
  return (
    <animated.div
      ref={animatedDivRef}
      style={{ ...animationStyle }}
      {...mouseEvents}
    >
      <Wrapper>
        <h1 ref={elementRef} id="animateMe">
          Yassin
        </h1>
        <div ref={cardRef} className="card">
          <animated.div
            ref={glowRef}
            className="glow"
            style={{ ...styleGlow }}
          />
          <div
            className="profilePicture"
            style={{
              backgroundImage: `url("${image}")`
            }}
          />
          <div className="textContent">
            <h1 id="finalPositionTitle" ref={finalPositionRef}>
              Yassin
            </h1>
            <p>
              I am working as a <b>Business Analyst</b> and{' '}
              <b>Software Engineer</b> at&nbsp;Vitol, Geneva - Switzerland
            </p>
            <p>
              I enjoy exploring the intersection of technology, art and design
            </p>

            <p>Connect with me using the links below</p>

            <Outbounds />
          </div>
        </div>
      </Wrapper>
    </animated.div>
  )
}
