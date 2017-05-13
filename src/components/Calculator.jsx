import React from 'react';

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.value = "0"
        this.curres = 0;
        this.history = "";
        this.init = this.init.bind(this);
        this.digits = this.digits.bind(this);
        this.addZero = this.addZero.bind(this);
        this.addDot = this.addDot.bind(this);
        this.operation = this.operation.bind(this);
        this.makeResult = this.makeResult.bind(this);
        this.check = this.check.bind(this);
        this.clearSome = this.clearSome.bind(this);
    }
    init() {
        this.value = "0"; this.curres = 0; this.history = "";
        this.setState({});
    }
    digits(e) {
        var curVal = e.target.value;
        if (this.history.search(/=/) > -1) {
            this.value = curVal;
            this.history = "";
        } else if (this.value === "0" || this.value.search(/[\+\-\*\/]/) > - 1) {
           this.value = curVal;
       } else if (this.value.search(/[\+\-\*\/]/) < 0) {
           this.value += curVal;
       }
       this.check();
       this.setState({});
    }
    addZero(e) {
        if (this.value.search(/[1-9\.]\d*$/) > -1 && this.history.search(/=/) < 0) {
            this.value += "0";
            this.check();
            this.setState({});
        }
    }
    addDot() {
        if(this.value.search(/\./) < 0) {
            (this.value.search(/[\+\-\*\/]/) > -1) ?
                this.value = "0." : this.value += ".";
            this.check();
            this.setState({});
        }
    }
    operation(e) {
        var curVal = e.target.value;
        if (this.history.search(/=/) > -1) {
            this.value = curVal;
            this.history = this.curres + curVal;
        } else if (!isNaN(Number.parseFloat(this.value))) {
            if (Number.parseFloat(this.value)) {
                this.history += this.value;
            }
            if (!/[\+\-\*\/!]/.test(this.history.split("").pop())) {
                this.value = curVal;
                this.history += curVal;
            }
        }
        this.setState({});
    }
    makeResult() {
        if (!isNaN(Number.parseFloat(this.value))) {
            this.history += this.value;
        }
        if (this.history.search(/[\+\-\*\/]$|=/) < 0 && this.history !== "") {
            var numbers = this.history.match(/(?:\d+\.\d+)|(?:\d+)/gi).map((a) => Number.parseFloat(a));
            var operations = this.history.match(/\+|\-|\*|\//g);
            if (this.curres < 0) {
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
            this.value = result;
            this.history += ("=" + result);
            this.curres = result;
            this.check();
            this.setState({});
        }
    }
    check() {
        if (this.value.length > 8 || this.history.length > 20) {
            this.init();
            this.history = "Error! Digit Limit Met!";
        }
        this.setState({});
    }
    clearSome() {
        if (this.history.search(/[\+\-\*\/]$/) > -1 && this.value.search(/[\+\-\*\/]/) > -1) {
            this.value = "0";
            this.history = this.history.split("").slice(0, -1).join("");
        } else if (/=|[a-z]/.test(this.history) || this.value === "0") {
            this.init();
        } else if (this.value.length === 1) {
            this.value = "0";
        } else {
            this.value = this.value.split("").slice(0, -1).join("");
        }
        this.setState({});
    }
    render() {
        return (
            <div className="bord p-1">
                <div className="calculations text-left">
                    <p className="mystin main">{this.value}</p>
                    <p className="history">{this.history}</p>
                </div>
                <div className="text-center" id="buttons">
                    <button className="btn btn-danger mybut" onClick={this.init}>ac</button>
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
