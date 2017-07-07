import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { BarcodeScanner ,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
	private htmlVariable : any;
	private displayData : any;
	scanData : {};
	private encodeData:any;
	encodedData:any;
	options: any;
	constructor(public navCtrl: NavController, public navParams: NavParams, private barcodeScanner: BarcodeScanner, public app: App, private storage: Storage) {
		
		this.encodeData = "";
		this.encodedData = "";
		this.options = "";
		this.storage = storage;
		this.displayData = "";
		
	}
	scan(){
		this.options = {
			prompt : "Scan your barcode "
		}
		this.barcodeScanner.scan(this.options).then((barcodeData) => {

			console.log(barcodeData);
			this.scanData = barcodeData;
		}, (err) => {
			console.log("Error occured : " + err);
		});         
	}    
	encodeText(){
		this.storage.get('email').then((email) => {
			this.encodeData = email;
		});
		this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE,this.encodeData).then((encodedData) => {

			console.log(encodedData);
			this.encodedData = encodedData;
			

		}, (err) => {
			console.log("Error occured : " + err);
		});                 
	}
	
	ionViewDidLoad() {
		console.log('ionViewDidLoad AboutPage');
		
		this.storage.get('email').then((email) => {
			this.encodeData = email;
		});
		
		this.storage.get('email').then((email) => {
			this.encodeData = email;
			console.log(this.encodeData);
			this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE,this.encodeData).then((encodedData) => {
			
				console.log(encodedData);
				this.encodedData = encodedData;
				this.displayData = this.encodedData;

			}, (err) => {
				console.log("Error occured : " + err);
			});
		});
		
	}
	logout(){
        // Remove API token 
		this.storage.set('email', '');
        const root = this.app.getRootNav();
        root.popToRoot();
	}
	
}
