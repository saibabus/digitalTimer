// Write your code here
import {Component} from 'react'

import './index.css'

const startingState = {
  thisMinutes: 25,
  thisSeconds: 0,
  isRunning: false,
}
class DigitalTimer extends Component {
  state = startingState

  componentWillUnmount() {
    this.clearTimeinterval()
  }

  clearTimeinterval = () => clearInterval(this.IntervalId)

  ondecCount = () => {
    const {thisMinutes} = this.state
    if (thisMinutes > 1) {
      this.setState(prevstate => ({thisMinutes: prevstate.thisMinutes - 1}))
    }
  }

  onincCount = () => {
    this.setState(prevstate => ({thisMinutes: prevstate.thisMinutes + 1}))
  }

  getElapsedtimeinFormat = () => {
    const {thisMinutes, thisSeconds} = this.state
    const timeReamainginseconds = thisMinutes * 60 - thisSeconds
    const Minutes = Math.floor(timeReamainginseconds / 60)
    const Seconds = Math.floor(timeReamainginseconds % 60)
    const stringMinutes = Minutes > 9 ? Minutes : `0${Minutes}`
    const stringSeconds = Seconds > 9 ? Seconds : `0${Seconds}`
    return `${stringMinutes}:${stringSeconds}`
  }

  onresetClick = () => {
    this.clearTimeinterval()
    this.setState(startingState)
  }

  increamentTimeelapsedinseconds = () => {
    const {thisMinutes, thisSeconds} = this.state
    const isTimecompleted = thisSeconds === thisMinutes * 60
    if (isTimecompleted) {
      this.clearTimeinterval()
      this.setState({isRunning: false})
    } else {
      this.setState(prevstate => ({thisSeconds: prevstate.thisSeconds + 1}))
    }
  }

  onStartOrpauseClick = () => {
    const {thisMinutes, thisSeconds, isRunning} = this.state
    const isTimecompleted = thisSeconds === thisMinutes * 60
    if (isTimecompleted) {
      this.setState({thisSeconds: 0})
    }
    if (isRunning) {
      this.clearTimeinterval()
    } else {
      this.IntervalId = setInterval(this.increamentTimeelapsedinseconds, 1000)
    }
    this.setState(prevstate => ({isRunning: !prevstate.isRunning}))
  }

  render() {
    const {thisMinutes, thisSeconds, isRunning} = this.state
    const isButtonsDisabled = thisSeconds > 0
    const startOrpauseImageUrl = isRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startOrPauseALtText = isRunning ? 'pause icon' : 'play icon'
    const TimerText = isRunning ? 'Running' : 'Paused'
    return (
      <div className="digitalTimeapp">
        <div className="digitalTime-contenet">
          <h1 className="heading">Digital Timer</h1>
          <div className="digitalTimerbg-container">
            <div className="digitalTimer-container">
              <div className="timer-container">
                <h1 className="timers">{this.getElapsedtimeinFormat()}</h1>
                <p className="timers-text">{TimerText}</p>
              </div>
            </div>
            <div className="digitalTimer-control-container">
              <div className="start-reset-con">
                <div className="start-reset-options-con">
                  <button
                    className="start-reset-button"
                    type="button"
                    onClick={this.onStartOrpauseClick}
                  >
                    <img
                      alt={startOrPauseALtText}
                      src={startOrpauseImageUrl}
                      className="play-pause-reset-icon"
                    />
                    <p className="start-pause-reset-status">
                      {isRunning ? 'Pause' : 'Start'}
                    </p>
                  </button>
                </div>
                <div className="start-reset-options-con">
                  <button
                    className="start-reset-button"
                    type="button"
                    onClick={this.onresetClick}
                  >
                    <img
                      alt="reset icon"
                      src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                      className="play-pause-reset-icon"
                    />
                    <p className="start-pause-reset-status">Reset</p>
                  </button>
                </div>
              </div>
              <p className="set-status">Set Timer Limit</p>
              <div className="inc-decr-options-con">
                <button
                  className="inc-decr-button"
                  type="button"
                  disabled={isButtonsDisabled}
                  onClick={this.ondecCount}
                >
                  <p className="inc-decr-option">-</p>
                </button>
                <div className="inc-decr-status-conta">
                  <p className="inc-decr-status">{thisMinutes}</p>
                </div>
                <button
                  className="inc-decr-button"
                  type="button"
                  disabled={isButtonsDisabled}
                  onClick={this.onincCount}
                >
                  <p className="inc-decr-option">+</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
