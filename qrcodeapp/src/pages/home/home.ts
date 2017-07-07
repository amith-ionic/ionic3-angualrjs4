import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	private htmlVariable : any;
	constructor(public navCtrl: NavController, public app: App, public storage: Storage) {
		this.storage = storage;
		this.htmlVariable = "";
	}
	ionViewDidLoad() {
		
		this.storage.get('email').then((email) => {
			this.htmlVariable = email;
			console.log('Your name is', email);
		}); 
	}
	
	logout(){
        // Remove API token 
		this.storage.set('email', '');
        const root = this.app.getRootNav();
        root.popToRoot();
	}
}
