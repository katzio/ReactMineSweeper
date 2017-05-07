import React from 'react';
import Cell from './Cell';
/**
 * Row component
 */

export default class Row extends React.Component{
	constructor(props) {
        super(props);
        this.state = {
            cells : props.cells
        };
    }

	componentWillReceiveProps(nextProps) {
        this.setState({
            cells : nextProps.cells
        });
    }
	/**
	 * generate cells component
	 * @return {[type]} [description]
	 */
	render(){
		var Cells = this.state.cells.map((cell,index) => {
				return (<Cell 
					minesCount={cell.minesCount} 
					openCell={this.props.openCell} 
					setFlag={this.props.setFlag} 
					data={cell}
					key={index}/>)
			});
		return (
			<div className="table-row">
				{Cells}
			</div>
		);
	}
}