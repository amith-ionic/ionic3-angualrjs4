import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	private myValue: any;
	name : any;
	private htmlVariable : any;
	
	constructor(public navCtrl: NavController) {
		this.myValue = "";
		this.htmlVariable = "0";
	}
	
	addDigits(name){
		this.myValue = "" + this.myValue + name;
		this.htmlVariable = this.myValue;
    }
	
	equalto() {
		console.log(this.myValue);
		let numtotal = this.myValue;
		let sumTotal = 0;
		if(numtotal.includes("+")) {
			let res = numtotal.split("+");
			sumTotal = Number(res[0])+Number(res[1]);
		};
		if(numtotal.includes("-")) {
			let res = numtotal.split("-");
			sumTotal = Number(res[0])-Number(res[1]);
		};
		if(numtotal.includes("*")) {
			let res = numtotal.split("*");
			sumTotal = Number(res[0])*Number(res[1]);
		};
		if(numtotal.includes("/")) {
			let res = numtotal.split("/");
			sumTotal = Number(res[0])/Number(res[1]);
		};
		
		this.htmlVariable = sumTotal;
		this.myValue = sumTotal;
	}
	operate(op) {
		if (op.indexOf("+") > -1) {
			this.myValue = this.myValue + "+";
			this.htmlVariable = this.myValue;
		};       
		if (op.indexOf("-") > -1) {
			this.myValue = this.myValue + "-";
			this.htmlVariable = this.myValue;
		}; 
		if (op.indexOf("*") > -1) { 
			this.myValue = this.myValue + "*";
			this.htmlVariable = this.myValue;
		};       
		if (op.indexOf("/") > -1) {
			this.myValue = this.myValue + "/";
			this.htmlVariable = this.myValue;
		};  
	}
	clearNum() {
		this.myValue = "";
		this.htmlVariable = "0";
	}
	
}
