import {Component, OnInit} from '@angular/core';
import {UserService} from "../../Services/User/user.service";
import {Router} from "@angular/router";
import {ProjectService} from "../../Services/Project/project.service";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent  implements OnInit {
  ngOnInit(): void {

  }
  email: string;
  password: string;
  loginError: string = '';
  passwordVisible: boolean = false;
  rr: string | null;
  constructor(private userService: UserService, private router: Router) { }
  login() {
    this.userService.login(this.email, this.password).subscribe(
      (response: any) => {
        const role = response.roleName;
        console.log(response);

        sessionStorage.setItem('idUser', response.idUser);
        sessionStorage.setItem('role', response.roleName);

        if (role === 'Directeur') {
          this.router.navigate(['/Directeur']);
        } else if (role === 'Chef de service') {
          this.router.navigate(['/ChefService']);
        } else if (role === 'Employe') {
          this.router.navigate(['/Employe']);
        }
        else {
          this.router.navigate(['/login']);
        }
      },
      (error: any) => {
        this.loginError = 'Login or password is incorrect. Please try again.';
      }
    );
  }
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

}
