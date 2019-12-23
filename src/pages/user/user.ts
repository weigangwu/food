import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Register2Page } from '../register2/register2';
import { RegisterPage } from '../register/register';
import { PersonalPage } from "../personal/personal";
import { HttpServicesProvider } from "../../providers/http-services/http-services";
import { StorageProvider } from "../../providers/storage/storage";
import { OrdersPage } from '../orders/orders';
import { ToolsProvider } from '../../providers/tools/tools';

/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {
  public LoginPage = LoginPage;
  public Register2Page = Register2Page;
  public RegisterPage = RegisterPage;
  public PersonalPage = PersonalPage;
  public OrdersPage = OrdersPage;
  // public isLogin=false;
  public userInfo = '';
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageProvider,
    public httpservices: HttpServicesProvider,
    private toolsProvider: ToolsProvider
  ) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
  }
  
  ionViewDidEnter() {
    this.userInfo = this.toolsProvider.getUserInfo();
  }

}
