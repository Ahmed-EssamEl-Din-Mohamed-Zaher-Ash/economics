import { Component } from '@angular/core';
import { NavBlankComponent } from "../../component/nav-blank/nav-blank.component";
import { RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../component/footer/footer.component";

@Component({
  selector: 'app-blank-layout',
  standalone: true,
  imports: [RouterOutlet, NavBlankComponent, RouterLink, FooterComponent],
  templateUrl: './blank-layout.component.html',
  styleUrl: './blank-layout.component.css'
})
export class BlankLayoutComponent {
  constructor(){}

}
