import { Component} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared.module';
import { AuthService } from '../../services/auth.service';
import { Routing } from '../../entities/routing.entity';

@Component({
  selector: 'app-app-layout',
  standalone: true,
  imports: [RouterModule, SharedModule],
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent  {

  constructor(private auth: AuthService, private router: Router) {}

  links = Object.values(Routing.ROUTES_MENU);

  public exit(event: MouseEvent) {
    event.preventDefault()
    this.auth.logout();
    this.router.navigate(['/login'])
  }
}
