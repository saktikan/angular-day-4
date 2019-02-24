import { Component, OnInit } from '@angular/core';
import { Account } from '../account';
import { AccoutService } from '../accout.service';

@Component({
  selector: 'app-header-profile',
  templateUrl: './header-profile.component.html',
  styleUrls: ['./header-profile.component.scss']
})
export class HeaderProfileComponent implements OnInit {

  
  constructor(
    public accountServices: AccoutService
  ) { 
    console.log(this.accountServices.account)
  }
  ngOnInit() {
  }

}
