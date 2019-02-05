import React,{Component} from 'react' ;
import { Card ,Col,Collapse} from 'antd';
import ReactHtmlParser from 'react-html-parser';
const Panel = Collapse.Panel


class PreferenceCard extends Component {

  render() {
    return (
      <div>
      <Col xl={8} lg={8} md={12} sm={24} xs={24}>
        <Card
          title={<span style={{color:'white',fontSize: 'x-large ',textAlign:'center',margin:'auto'}}>{this.props.name}</span>}
          cover={<img style={{width:'100%',paddingLeft:80,paddingRight:80,}} src={this.props.image} />}
        >
         <Collapse bordered={true}>
          <Panel header="Description">
          <p>{ReactHtmlParser(this.props.description)}</p>
          </Panel>
         </Collapse>
        </Card>
        </Col>
      </div>
    );
  }
}

export default PreferenceCard;