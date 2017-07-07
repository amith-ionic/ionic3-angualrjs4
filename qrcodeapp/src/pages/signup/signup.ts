import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the SignupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
	signup:any = {};
	private htmlVariable : any;
	constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, private storage: Storage) {
		this.http = http;
		this.signup.response = '';
		this.htmlVariable = "";
		this.signup.first_name = '';
		this.signup.last_name = '';
		this.signup.email = '';
		this.signup.password = '';
		this.signup.cfmpassword = '';
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad SignupPage');
	}
	loginpage() {
		this.navCtrl.push(LoginPage, {}, {animate: false});
	}
	signupForm() {
		
		if(this.signup.first_name.length == 0) {
			this.htmlVariable = "Please enter Your Name";
		} else if(this.signup.email.length == 0){
			this.htmlVariable = "Please Enter Your Email ";
		} else {
			var x = this.signup.email;
			var atpos = x.indexOf("@");
			var dotpos = x.lastIndexOf(".");
			if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
				this.htmlVariable = "Not a valid e-mail address";
			} else {
				if(this.signup.password.length == 0) {
					this.htmlVariable = "Please enter Your Password";
				} else if(this.signup.password != this.signup.cfmpassword) {
					this.htmlVariable = "Password Mismatch";
				} else {
					var myData = JSON.stringify({name: this.signup.first_name, firstname: this.signup.first_name, lastname: this.signup.last_name, email: this.signup.email, password: this.signup.password });
						/* console.log(myData); */
					this.http.post('http://spericorn.net/ionic3_test/public/registration', myData).subscribe(data => {
						this.signup.response = data["_body"]; 
						if(data.json().status == "success") {
							this.storage.set('email', '');
							this.loginpage();
						} else {
							console.log(data.json().status);
							this.htmlVariable = data.json().msg;
						}
					}, error => {
						this.htmlVariable = "Error...can't register";
					});
				}
			}
		} 
	}
	
}
