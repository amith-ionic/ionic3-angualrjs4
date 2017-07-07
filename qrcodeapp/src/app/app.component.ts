import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { DataServiceProvider } from '../providers/data-service/data-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
	pages: any;
	showLevel1 = null;
showLevel2 = null;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public dataService: DataServiceProvider) {
    platform.ready().then(() => {
		/* this.initializeApp(); */

		this.dataService.getMenus()
		.subscribe((response)=> {
			this.pages = response;
			console.log(this.pages);
		});
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
	toggleLevel1(idx) {
	  if (this.isLevel1Shown(idx)) {
		this.showLevel1 = null;
	  } else {
		this.showLevel1 = idx;
	  }
	};

	toggleLevel2(idx) {
	  if (this.isLevel2Shown(idx)) {
		this.showLevel1 = null;
		this.showLevel2 = null;
	  } else {
		this.showLevel1 = idx;
		this.showLevel2 = idx;
	  }
	};
	isLevel1Shown(idx) {
	  return this.showLevel1 === idx;
	};

isLevel2Shown(idx) {
  return this.showLevel2 === idx;
};
}
