
import { Injectable } from '@angular/core';

import { Http, Jsonp, Headers } from "@angular/http";
import { ConfigProvider } from '../../providers/config/config';
/*
  Generated class for the HttpServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpServicesProvider {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http,
    private jsonp: Jsonp,
    public Config: ConfigProvider,
  ) {
    console.log('Hello HttpServicesProvider Provider');
  }

  // 下面是封装的公共请求数据方法
  // apiUrl：api/focus   用&拼接callback
  // apiUrl：api/plist?page=1   用?拼接callback

  requestData(apiUrl, callback) {
    let api;
    if (apiUrl.indexOf('?') == -1) {
      api = this.Config.apiUrl + apiUrl + '?callback=JSONP_CALLBACK'  /*  没有问号 */
    } else {
      api = this.Config.apiUrl + apiUrl + '&callback=JSONP_CALLBACK'  /*   有问号  */
      // http://39.108.159.135/  +  paid/plist?is_best=1  +  &callback=JSONP_CALLBACK
    }
    // api是config的地址前缀+上apiUrl传过来的参数+上是否回调
    this.jsonp.get(api).subscribe(function (data) {
      // console.log(data);
      callback(data['_body']);        /*回调函数*/
    }, function (err) {
      console.log(err);
    })
  }

  // 封装post提交数据的方法
  doPost(apiUrl, data): Promise<any> {
    var api = this.Config.apiUrl + apiUrl;
    return new Promise((resolve, reject) => {
      this.http.post(api, JSON.stringify(data), { headers: this.headers })
        .subscribe((res) => {
          resolve(res.json());
        }, err => {
          console.log(err);
          reject(err);
        });
    });
  }
}
