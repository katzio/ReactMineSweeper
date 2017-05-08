import React from 'react';
import ReactList from 'react-list';
import Loader from 'react-loader';
import Row from './Row';

/* eslint-disable */
/**
 * Grid component
 */

export default class Grid extends React.Component{

	/**
	 * get rows and cols, create grid
	 * @param  {[type]} props [description]
	 * @return {[type]}       [description]
	 */
	constructor(props) {
		super(props);
		this.openCell = this.openCell.bind(this);
		this.setFlag = this.setFlag.bind(this);
		this.renderItem = this.renderItem.bind(this);
		this.superMan = this.superMan.bind(this);
		
		this.state = { 
			superstate : this.props.superstate,
			loaded : this.props.loaded,
			zero_stack : [],
			grid  : this.build(props) 
		}
	}

	/**
	 * [superMan description]
	 * @return {[type]} [description]
	 */
	superMan(){
		var _grid = this.state.grid;
		for (var row = 0; row < this.props.rows; row++){
			for (var col = 0; col < this.props.cols; col++){
				_grid[row][col].isOpen = true;
			}
		}
		this.setState ({grid: _grid});
	}

	componentDidMount(){
		this.setState ({loaded: true})
	}
	/**
	 * create a 2D array of cells
	 * @param  {[type]} props [description]
	 * @return {[type]}       [description]
	 */
	build(props){

		var grid = [];

		for (var i = 0; i < props.rows; i++){
			var cells = [];
			for (var j = 0; j < props.cols; j++){
				var data = {
					key			: i + "," + j,
					row_id		: i,
					col_id		: j,
					isMine 		: false, // will be randomed
            		flagged 	: false,
            		isOpen 		: false,
            		minesCount  : 0 // will be calculated when opened
				};
				cells.push(data);
			}
			grid.push(cells);
		}


		// set random mines
		for (i = 0; i < props.minesCount;){
			// pick a mineless cell
			var cell = grid[Math.floor(Math.random() * props.rows)][Math.floor(Math.random() * props.cols)];
			if (!cell.isMine)
			{
				// set to mine
				cell.isMine = true;
				// now update counters around
				for (var row = cell.row_id - 1; row <= cell.row_id + 1; row++){
					for (var col = cell.col_id - 1; col <= cell.col_id + 1; col++){
						if (
							// if we are in grid limits
							row >= 0 && col >= 0 &&
							row < props.rows && col < props.cols){
							// and if that cell is not a mine
							var tmp_cell = grid[row][col];

							if (!tmp_cell.isMine && tmp_cell !== cell){
								tmp_cell.minesCount++;

							}
						}
					}
				}
				i++;
			}
		}
		return grid;
	}
	/**
	 * [openCell description]
	 * @param  {[type]} _cell [description]
	 * @return {[type]}       [description]
	 */
	openCell(_cell){	
		console.log(this.props.openCellsCount);
		var _grid = this.state.grid;
		if (!_cell.flagged && this.props.status !== "Game Over"){
			// show mine incon
			if (_cell.isMine){
				this.props.incOpenCellsCounter(); // for reset state
				for(var row =0; row < this.props.rows; row++) {
					for(var col = 0; col < this.props.cols; col++) {
						if (_grid[row][col].isMine)
							_grid[row][col].isOpen = true;
					}
				}
				this.props.gameOver();
			} else {
				this.props.incOpenCellsCounter();
				_grid[_cell.row_id][_cell.col_id].isOpen = true;
				if (_cell.minesCount == 0){
					this.openAround(_cell);				
				}
			}	
		}
		// clear the stack
		while (this.state.zero_stack.length > 0){
			var _zero_cell = this.state.zero_stack.pop();
			this.openAround(_zero_cell);
		}


		this.setState({grid : _grid});
	}

	/**
	 * open cells aruond 0
	 * @param  {[type]} cell [description]
	 * @return {[type]}      [description]
	 */
	openAround(_cell){
		var _grid = this.state.grid;
		for(var row = _cell.row_id - 1; row <= _cell.row_id + 1; row++) {
			for(var col = _cell.col_id - 1; col <= _cell.col_id + 1; col++) {
				if (row >= 0 && col >= 0 && this.props.rows > row && this.props.cols > col && _grid[row][col] !== _cell && !_grid[row][col].isOpen)
				{
					_grid[row][col].isOpen = true;	
					this.props.incOpenCellsCounter();
					if(_grid[row][col].minesCount == 0){
						this.state.zero_stack.push(_grid[row][col]);
					}

				}
			}
		}
	}

	/**
	 * scan around the cell to get mines count
	 * @param  {[type]} cell [description]
	 * @return {[type]}      [description]
	 */
	scanMine(cell){
		var minesCount = 0;
        var _grid = this.state.grid;
        for(var row = cell.row_id - 1; row <= cell.row_id + 1; row++) {
			for(var col = cell.col_id - 1; col <= cell.col_id + 1; col++) {
        		if (row >= 0 
        			&& col >= 0
        			&& this.props.rows > row 
        			&& this.props.cols > col
        			&& _grid[row][col].isMine)
        			minesCount++;
        	}        	
        }
        return minesCount;
	}

	/**
	 * the grid will handle the open of cells
	 * @return {[type]} [description]
	 */
    setFlag(_cell) {
        var _grid = this.state.grid;
			_grid[_cell.row_id][_cell.col_id].flagged = !_cell.flagged;
			this.props.updateFlagsCounter(_grid[_cell.row_id][_cell.col_id].flagged ? 1 : -1);
			this.setState({grid : _grid});	
    }

    /**
     * [componentWillReceiveProps description]
     * @param  {[type]} nextProps [description]
     * @return {[type]}           [description]
     */
    componentWillReceiveProps(nextProps) {
    	if(nextProps.superstate)
    		this.superMan();
        if((this.props.openCellsCount > nextProps.openCellsCount || this.props.cols !== nextProps.cols || this.props.rows !== nextProps.rows || this.props.minesCount !== nextProps.minesCount) && this.state.loaded == true){
            this.setState({
                grid : this.build(nextProps),
                zero_stack : []
            });
        }
    }


    renderItem(index, key) {
    	var rows = this.state.grid.map((row, index) => {
            return(
                <Row
                setLoader={this.setLoader} 
                cells={row} 
                openCell={this.openCell} 
                setFlag={this.setFlag} 
                row_id={index}
                key={index}/>
            );
        });

    	return <div key={key}>{rows}</div>;
  	}

	/**
	 * render will take every row and generate Row componenet
	 * @return {[type]} [description]
	 */
	render(){
		return (
				<div className="grid" style={{height: 700}}>
				<Loader loaded={this.state.loaded}>
					<ReactList
					itemRenderer={this.renderItem}
					length={this.props.rows * this.props.rows.cols}
					type='uniform'
					useTranslate3d={true} />
				</Loader>
				</div>
			);
	}
}