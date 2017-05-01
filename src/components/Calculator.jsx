import React from 'react';

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {curres: 0, value: "0", history: ""}
        this.digits = this.digits.bind(this);
        this.addZero = this.addZero.bind(this);
        this.clearAll = this.clearAll.bind(this);
        this.makeResult = this.makeResult.bind(this);
        this.operation = this.operation.bind(this);
        this.addDot = this.addDot.bind(this);
        this.check = this.check.bind(this);
        this.clearSome = this.clearSome.bind(this);
    }
    digits(e) {
        var state = this.state, curVal = e.target.value;
        if (state.history.search(/=/) > -1 || state.value === "0" && state.history === "") {
            state = {value: curVal, history: curVal, curres: 0};
        } else if (state.value.search(/[\+\-\*\/]/) > - 1) {
            state = {value: curVal, history: state.history + curVal};
        } else if (this.state.value.search(/[\+\-\*\/]/) < 0) {
            state = {value: state.value + curVal, history: state.history + curVal};
        }
        this.setState(state, function() {this.check()});
    }
    addZero(e) {
        if (this.state.value.search(/[1-9\.]\d*$/) > -1 && this.state.history.search(/=/) < 0) {
            this.setState({value: this.state.value + "0", history: this.state.history + "0"}, function() {this.check()} );
        }
    }
    addDot() {
        if(this.state.value.search(/\./) < 0) {
            var state;
            if (this.state.value.search(/[\+\-\*\/]/) > -1 || this.state.value === "0" || this.state.value === "") {
                state = {value: "0.", history: this.state.history + "0."};
            } else {
                state = {value: this.state.value + ".", history: this.state.history + "." };
            }
            this.setState(state, function() {this.check()});
        }
    }
    operation(e) {
        var hist = this.state.history;
        if (hist.search(/=/) > -1) {
            this.setState({value: e.target.value, history: this.state.curres + e.target.value});
        } else if ((!isNaN(Number.parseFloat(this.state.value)) || !/[\+\-\*\/!]/.test(hist.split("").pop())) && this.state.value !== "0") {
            this.setState({value: e.target.value, history: this.state.history + e.target.value});
        }
    }
    makeResult() {
        var init = this.state.history;
        if (init.search(/[\+\-\*\/]$|=/) < 0 && init !== "") {
            var numbers = init.match(/(?:\d+\.\d+)|(?:\d+)/gi).map((a) => Number.parseFloat(a));
            var operations = init.match(/\+|\-|\*|\//g);
            if (this.state.curres < 0) {
                numbers[0] *= -1;
                operations.splice(0,1);
            }
            var result = numbers.reduce(function(a,b,c) {
                switch(operations[c-1]) {
                    case "+":
                      return a + b;
                    break;
                    case "-":
                      return a - b;
                    case "*":
                      return a * b;
                    break;
                   case "/":
                      return a / b;
                   break;
               }
           });
            result = (!Number.isInteger(result)) ? Math.round(result * 10000) / 10000 : result;
            result = result.toString();
            this.setState({value: result, history: init + "=" + result, curres: result}, function() {this.check()});
        }
    }
    check() {
        (this.state.value.length > 8 || this.state.history.length > 20) ?
            this.setState({curres: 0, value: "0", history: "Error! Digit Limit Met!"}) : -1;
    }
    clearSome() {
        if (/=|[a-z]/.test(this.state.history) || this.state.value === "0" || this.state.value === "") {
            this.clearAll();
        } else {
            var newValue = this.state.value.split("").slice(0, -1).join("");
            var newHistory = this.state.history.split("").slice(0, -1).join("");
            this.setState({value: newValue, history: newHistory});
        }
    }
    clearAll() {
        this.setState({ curres: 0, value: "0", history: ""});
    }
    render() {
        return (
            <div className="bord p-1">
                <div className="calculations text-left">
                    <p className="mystin main">{this.state.value}</p>
                    <p className="history">{this.state.history}</p>
                </div>
                <div className="text-center" id="buttons">
                    <button className="btn btn-danger mybut" onClick={this.clearAll}>ac</button>
                    <button className="btn btn-danger mybut" onClick={this.clearSome}>ce</button>
                    <button className="btn btn-primary mybut" value="/" onClick={this.operation}>/</button>
                    <button className="btn btn-primary mybut" value="*" onClick={this.operation}>*</button>
                    <button className="btn btn-primary mybut" value="7" onClick={this.digits}>7</button>
                    <button className="btn btn-primary mybut" value="8" onClick={this.digits}>8</button>
                    <button className="btn btn-primary mybut" value="9" onClick={this.digits}>9</button>
                    <button className="btn btn-primary mybut" value="-" onClick={this.operation}>-</button>
                    <button className="btn btn-primary mybut" value="4" onClick={this.digits}>4</button>
                    <button className="btn btn-primary mybut" value="5" onClick={this.digits}>5</button>
                    <button className="btn btn-primary mybut" value="6" onClick={this.digits}>6</button>
                    <button className="btn btn-primary mybut" value="+" onClick={this.operation}>+</button>
                    <button className="btn btn-primary mybut" value="1" onClick={this.digits}>1</button>
                    <button className="btn btn-primary mybut" value="2" onClick={this.digits}>2</button>
                    <button className="btn btn-primary mybut" value="3" onClick={this.digits}>3</button>
                    <button className="btn btn-success mybut larheight" onClick={this.makeResult}>=</button>
                    <button className="btn btn-primary mybut larwidth" value="0" onClick={this.addZero}>0</button>
                    <button className="mybut btn btn-warning mybut" onClick={this.addDot}>.</button>
                </div>
            </div>

        )
    }
}

module.exports = Calculator;
