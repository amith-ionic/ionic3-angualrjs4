import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup/signup';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
	loginData:any = {};
	private htmlVariable : any;
	private errorText : any;
	constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, private storage: Storage) {
		this.http = http;
		this.loginData.response = '';
		this.loginData.email = '';
		this.loginData.password = '';
		this.storage = storage;
		this.errorText = "";
		this.htmlVariable = "";
	}
	signup(){
		this.navCtrl.push(SignupPage);
	}
	login(){
	
		this.navCtrl.push(TabsPage, {}, {animate: false});
		this.storage.get('email').then((email) => {
			this.htmlVariable = email;
		}); 
	}
	ionViewDidLoad() {
		this.storage.get('email').then((email) => {
			if(email.length != 0){
				this.htmlVariable = email;
				this.login();
			} else {
				console.log(email);
			}
		});
		if(this.htmlVariable != 0) {
			this.login();
		} 
		
	}
	loginForm() {
		
		/* console.log(this.loginData); */
		if(this.loginData.email.length == 0){
			this.errorText = "Please Enter Your Email ";
			console.log(this.loginData.email.length);
		} else {
			var myData = JSON.stringify({email: this.loginData.email, password: this.loginData.password });
			console.log(myData);
			
			this.http.post('http://spericorn.net/ionic3_test/public/checklogin', myData).subscribe(data => {
		
				this.loginData.response = data["_body"]; 
				
				if(this.loginData.response) {
					console.log(this.loginData.response);
					if(data.json().status == "success") {
						this.storage.set('email', data.json().email);
						this.login();
					} else {
						console.log(data.json().status);
						this.errorText = data.json().msg;
						console.log(this.errorText);
					}
					
				} else {
					console.log(this.loginData.response);
				}
				
			}, error => {
				console.log("Oooops!");
			});
		}
		
	}
}
