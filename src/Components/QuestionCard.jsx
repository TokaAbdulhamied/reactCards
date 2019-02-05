import React,{Component} from 'react' ;
import { Radio , Input} from 'antd';
import ReactHtmlParser from 'react-html-parser';
const RadioGroup = Radio.Group
const { TextArea } = Input;


class QuestionCard extends Component {
state = {question:this.props.question,value:null}
onChange = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
    this.props.changeAnswerValues(this.state.question.id,e.target.value)
  }

mcqRender = () => {
  return (
    <RadioGroup onChange={this.onChange} value={this.state.value}>
        {
          this.state.question.choices.map((choice)=> {
         return <Radio style={{color:'white'}} key={choice.text} value={choice.text}>{choice.text}</Radio>

        })
        }
        </RadioGroup>
  );
}
essayRender = ()=> {
  return <TextArea placeholder="Type your answer here" autosize={{ minRows: 2, maxRows: 8 }} onChange={this.onChange} value={this.state.value} />
  
}
  render() {
    return (
      <div style={{color:'white',backgroundColor:'#008F47',padding:5,borderRadius:5,fontWeight:700,margin:10}}>
        <p>{ReactHtmlParser(this.state.question.question)}</p>
        {this.state.question.question_type=='MCQ'?this.mcqRender():this.essayRender()}
      </div>
    );
  }
}

export default QuestionCard;