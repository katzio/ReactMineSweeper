import React from 'react';

/**
 * 
 */
export default class Controls extends React.Component{

	constructor(props) {
		super(props);
		this.update = this.update.bind(this);
		this.updateRows = this.updateRows.bind(this);
		this.updateCols = this.updateCols.bind(this);
		this.updateMines = this.updateMines.bind(this);
		this.state = {
			status 	: props.status,
			rows 	:  props.rows,
			cols 	:  props.cols,
			minesCount : props.minesCount
		}
	}
	/**
	 * [setStateStyle description]
	 * @param {[type]} status [description]
	 */
	setStateStyle(){

		if(this.state.status === "clear")
			return "won"
		else if(this.props.status === "Game Over")
			return "lost"
		return "playing"
	}
	/**
	 * [setStateText description]
	 * @param {[type]} state [description]
	 */
	setStateText(){
		if(this.state.status === "clear")
			return "You have won!"
		else if(this.props.status === "Game Over")
			return "You have lost!"
		return "playing"
	}

	updateRows(event){
		this.setState({rows: event.target.value});
	}

	updateCols(event){
		this.setState({cols: event.target.value});
	}

	updateMines(event){
		this.setState({minesCount: event.target.value});
	}

	update(event){
		this.props.setGrid(this.state.rows, this.state.cols, this.state.minesCount);
	}

	render(){
		return (
			<div className="controls">
				<lable className="{this.setStateStyle(this.props.status)}">{this.setStateText(this.props.status)}</lable>
				<label>Flags left: {this.props.flagsLeft}</label>
				
				<button onClick={this.props.restBtn}>Reset</button>
				<label>Rows:</label>
				<input is type="text" defaultValue={this.props.rows} onChange={this.updateRows}/>
				<label>Columns:</label>
				<input is type="text" defaultValue={this.props.cols} onChange={this.updateCols}/>
				<label>Mines:</label>
				<input is type="text" defaultValue={this.props.minesCount} onChange={this.updateMines}/>
				<button onClick={this.update}>Update table</button>
				
				
			</div>
			);
	}
}