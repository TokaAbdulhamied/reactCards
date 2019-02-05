import React,{Component} from 'react' ;
import ReactHtmlParser from 'react-html-parser';
import Countdown from 'react-countdown-now';


class Timer extends Component {
    shouldComponentUpdate() {
        return false;
    }
  render() {
    return (
        <Countdown daysInHours={true} date={Date.now() + this.props.date} renderer={this.props.renderer} />
    );
  }
}

export default Timer;