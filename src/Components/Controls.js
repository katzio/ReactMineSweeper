import React from 'react';
/* eslint-disable */
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

		if(this.props.status == "clear")
			return "btn btn-md btn-success"
		else if(this.props.status == "Game Over")
			return "btn btn-md btn-danger"
		return "btn btn-md btn-info"
	}
	/**
	 * [setStateText description]
	 * @param {[type]} state [description]
	 */
	setStateText(){
		if(this.props.status == "clear")
			return "You have won!"
		else if(this.props.status == "Game Over")
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

			if (this.state.rows > 0 && this.state.cols > 0 && this.state.minesCount >= 0){
				if (this.state.minesCount <= this.state.rows * this.state.cols ){
					if (this.state.rows * this.state.cols  > 10000)
						alert("It's will take a sec or 2 (or 10)\nbut it works, be patient :)")
					this.props.setGrid(this.state.rows, this.state.cols, this.state.minesCount);
				}
				else {
					alert("to many mines!");
				}
			}
			else {
				alert("Negative values?");
			}
	}

	render(){
		var minesPlaceHolder = "Mines: " +this.props.minesCount; 
		var rowsPlaceHolder = "Rows: " +this.props.rows; 
		var colsPlaceHolder = "Columns: " +this.props.cols; 

		return (
			<div className="controls row">
				<div className="col-sm-6">
					<div className="row">
						<div className="col-sm-3">
							<button className={this.setStateStyle(this.props.status)}>{this.setStateText(this.props.status)}</button>
						</div>
						<div className="col-sm-3">
							<button className="btn btn-success" onClick={this.props.superControl}>Superman!</button>
						</div>
						<div className="col-sm-3">	
						<button className="btn btn-primary" type="button"> Flags left: <span className="badge">{this.props.flagsLeft}</span> </button>
						</div>
						<div className="col-sm-3">	
							<button className="btn btn-md btn-warning" onClick={this.props.restBtn}>Reset Game</button>
						</div>
					</div>
				</div>
				<div className="col-sm-6">
					<div className="row">
						<div className="col-sm-3">
							<span className="sr-only">Rows:</span>
							<input class="form-control" is type="text" value={this.state.rows} placeholder={rowsPlaceHolder} onChange={this.updateRows}/>
						</div>
						<div className="col-sm-3">
							<span className="sr-only">Columns:</span>
							<input class="form-control" is type="text" value={this.state.cols} placeholder={colsPlaceHolder} onChange={this.updateCols}/>
						</div>
						<div className="col-sm-3">
							<span className="sr-only">Mines:</span>
							<input class="form-control" is type="text" value={this.state.minesCount} placeholder={minesPlaceHolder}  onChange={this.updateMines}/>
						</div>
						<div className="col-sm-3">
							<button className="btn btn-md btn-info" onClick={this.update}>Update Grid Params</button>
						</div>
					</div>				
				</div>	
			</div>
			);
	}
}