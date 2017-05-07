import React from 'react';
import Controls from './Controls'
import Grid from './Grid'

/**
 * Game component
 */

export default class Game extends React.Component{
	/**
	 * set game default stats
	 * @param  {[type]} props [description]
	 * @return {[type]}       [description]
	 */
	constructor() {
		super();
		this.reset = this.reset.bind(this);
		this.gameOver = this.gameOver.bind(this);
		this.incOpenCellsCounter = this.incOpenCellsCounter.bind(this);
		this.updateFlagsCounter = this.updateFlagsCounter.bind(this);
		this.setGrid = this.setGrid.bind(this);
		this.superControl = this.superControl.bind(this);

		this.state = {
			superstate : false,
			// size
			rows : 3,
			cols : 3,
			// mines
			minesCount : 1,
			flagsCount: 0,
			openCellsCount: 0,
			status : "playing"   // playing, clear, gameover
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			superstate: nextProps.superstate,
			// size
		rows : nextProps.row,
		cols : nextProps.cols,
		// mines
		minesCount : nextProps.minesCount,
		flagsCount: nextProps.flagsCount,
		openCellsCount: nextProps.openCellsCount,
		status : nextProps.status  // playing, clear, gameover
	});
	}

	/**
	 * [componentWillUpdate description]
	 * @return {[type]} [description]
	 */
	componentWillUpdate() {
        if(this.state.status === "playing"){
            this.checkWin();
        }
    }
    /**
     * [checkWin description]
     * @return {[type]} [description]
     */
    checkWin() {

        if(this.state.rows * this.state.cols - this.state.minesCount === this.state.openCellsCount && this.state.minesCount == this.state.flagsCount){
            this.setState({status: "clear"});
        }
    }
    /**
     * [gameOver description]
     * @return {[type]} [description]
     */
    gameOver() {
        this.setState({status: "Game Over"});
    }

    /**
     * [checkFlagNum description]
     * @param  {[type]} update [description]
     * @return {[type]}        [description]
     */
    updateFlagsCounter(newCount) {
    	if (newCount === -1)
        	this.setState({flagsCount: --this.state.flagsCount });
        if (newCount === 1)
        	this.setState({flagsCount: ++this.state.flagsCount });
    }

    /**
     * [incOpenCellsCounter description]
     * @return {[type]} [description]
     */
    incOpenCellsCounter() {
    	this.setState({openCellsCount :++this.state.openCellsCount})
    	console.log(this.state.openCellsCount)
    }
    /**
     * [reset description]
     * @return {[type]} [description]
     */
    reset() {
        this.setState({
        	status: "playing", 
        	flagsCount: 0, 
        	openCellsCount: 0, 
        	superstate: false
        });
    }

    /**
     * [setBoard description]
     * @param {[type]} _rows       [description]
     * @param {[type]} _cols       [description]
     * @param {[type]} _minesCount [description]
     */
    setGrid(_rows,_cols,_minesCount) {
            this.setState({
        	rows: _rows, 
        	cols: _cols, 
        	minesCount: _minesCount, 
        	openCellsCount: 0, 
        	flagsCount: 0, 
        	status: "playing",
        	superstate: false});
    }

    /**
     * 
     */
    superControl()
    {
    	console.log("update")
    	this.setState({superstate : true});
    }

	/**
	 * render controls and grid
	 * @return {[type]} [description]
	 */
	render(){return (
		<div>
		<div className="row">
			<div className="col-sm-12">
			<Controls 
				setGrid={this.setGrid}
				flagsLeft={this.state.minesCount - this.state.flagsCount} 
				restBtn={this.reset} 
				status={this.state.status} 
				rows={this.state.rows} 
				cols={this.state.cols}
				minesCount={this.state.minesCount}
				superControl={this.superControl}
			/>
			</div>
		</div>
		<div className="row">
			<div className="col-sm-12">
				<Grid 
					loaded={false}
					rows={this.state.rows} 
					cols={this.state.cols}
					openCellsCount={this.state.openCellsCount} 
					minesCount={this.state.minesCount}  
					gameOver={this.gameOver}
					incOpenCellsCounter={this.incOpenCellsCounter}
					updateFlagsCounter={this.updateFlagsCounter}
					status={this.state.status}
					flagsCount={this.state.flagsCount}
					superstate={this.state.superstate}
				/>
			</div>
		</div>
		</div>
		);}
}