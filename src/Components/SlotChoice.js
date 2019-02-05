import React, { Component } from "react";
import { Select, Button,notification } from 'antd';
const Option = Select.Option;


class SlotChoice extends Component {

	render() 
	{

		const DateOptions = this.props.dates.map((date) => <Option key={date.id} value={date.id}>{date.time}</Option>);
		return(
			<div style={{marginLeft: 'auto',marginRight: 'auto',marginTop:30}} >
				<Select
					    style={{ width: 250 }}
					    placeholder="Select a Slot"
					    size="large"
					    optionFilterProp="children"
					    filterOption={(input, option) => {if(option.props.Date) option.props.Date.toLowerCase().indexOf(input.toLowerCase()) >= 0}}
						onChange={this.props.onChange}
					  >
				    {DateOptions}
				</Select>
			</div>
			)
	}
}
export default SlotChoice;