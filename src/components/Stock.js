import React from 'react';

class Stock extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            intValue: (this.props.values.eps * (8.5 + 2 * 1.6) * 4.4) / 2.9
        }
    }
    render() {
        return(
            <div className="Stock">
                <h2>{this.props.values.date}</h2>
                <h2>{this.props.values.symbol}</h2>
                <h2>{this.props.values.eps}</h2>
                <h2>{this.state.intValue}</h2>
            </div>
        )
    }
}
export default Stock