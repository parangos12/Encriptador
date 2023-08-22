import { Component } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  options: AnimationOptions = {
    path: '../../assets/animation_llld100f.json',
  };

  onAnimate(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

}
