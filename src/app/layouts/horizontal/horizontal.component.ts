import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenubarComponent } from '../menubar/menubar.component';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-Horizontal',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MenubarComponent
  ],
  templateUrl: './Horizontal.component.html',
  styleUrls: ['./Horizontal.component.scss']
})
export class HorizontalComponent {
  constructor(public configService: ConfigService) { }

  public hideToast() {
    this.configService.isShowToast = false;
  }
}
