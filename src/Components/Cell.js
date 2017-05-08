import React from 'react';
/* eslint-disable */
/**
 * Cell component
 */
export default class Cell extends React.Component{
	/**
	 * get celss info, set it up
	 * @param  {[type]} props [description]
	 * @return {[type]}       [description]
	 */
	constructor(props) {
		super(props);
        this.clickHandler = this.clickHandler.bind(this);

		this.state = {
            key         : props.data.key,
			isMine 		: props.data.isMine,
            flagged 	: props.data.flagged,
            isOpen 		: props.data.isOpen,
            minesCount  : props.data.minesCount // will be calculated when opened

		}
	}
    /**
     * [componentWillReceiveProps description]
     * @param  {[type]} nextProps [description]
     * @return {[type]}           [description]
     */
    componentWillReceiveProps(nextProps) {
        this.setState({
            isMine      : nextProps.data.isMine,
            flagged     : nextProps.data.flagged,
            isOpen      : nextProps.data.isOpen,
            minesCount  : nextProps.data.minesCount
        }); 
    }


    clickHandler(e){
        if(e.shiftKey){
            // use Grid component
            if(!this.state.isOpen){
                this.props.setFlag(this.props.data);
            }
        }
        else{
            if (!this.state.flagged && !this.state.isOpen)
                this.props.openCell(this.props.data);
        }
    }

    render() {
        if(this.state.isOpen){
            if(this.state.isMine){return (<div className="table-cell mine"></div>);}
            else {
                if (this.state.minesCount == 0){
                    return (<div className="table-cell activated"></div>);
                }return (<div className="table-cell activated" is data-neighbors={this.state.minesCount}>{this.state.minesCount}</div>);
            }
        } 
        else if(this.state.flagged){
        return (<div className="table-cell flag" onClick={this.clickHandler}></div>);}
        else{return (<div className="table-cell" onClick={this.clickHandler}></div>);}    
    }
}