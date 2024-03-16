import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpServerService } from 'src/app/Services/http-server.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // public errorMessage = '';
  public formLogin = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })
  // public isDisplayed: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    // private httpServerService: HttpServerService,
    private httpClient: HttpClient,
    private router: Router,
    private snackbar: SnackbarService
  ) { }
  ngOnInit(): void {

  }

  // public hideAnimatedDiv() {
  //   setTimeout(() => {
  //       this.isDisplayed = false;
  //   }, 2000);
  // }

  public submitLogin(): void {
    console.log("login: ", this.formLogin.value.username);
    console.log("login: ", this.formLogin.value.password);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(this.formLogin.value.username + ":" + this.formLogin.value.password)
      })
    }
    this.httpClient.post('https://housemanage-f4f94a4bfa42.herokuapp.com/api/acc/login', this.formLogin.value, httpOptions).subscribe((data: any) => {
      console.log(data)
      if (data.message == 'Login successfully') {
        localStorage.setItem('currentUser', JSON.stringify(this.formLogin.value));
        // setTimeout(() =>{
        //   window.location.reload();
        // },10)
        this.snackbar.openSnackBar(data.message, '')
        this.router.navigateByUrl('/dashboard');
      } else {
        // console.log('else')
        // this.errorMessage = data.message;
        this.snackbar.openSnackBar(data.message, 'error')
        // this.hideAnimatedDiv();
        // this.isDisplayed=true
      }
    }, error => {
      // console.log('error')
      // console.log(error)
      // this.errorMessage = 'username or password not match';
      this.snackbar.openSnackBar('Username or password not match', 'error')
      // this.hideAnimatedDiv();
      // this.isDisplayed=true
    })
  }
}
