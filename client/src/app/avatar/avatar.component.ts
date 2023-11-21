import { Component, Input } from '@angular/core';
import { User } from '@infoscreen/shared';

@Component({
  selector: 'infoscreen-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent {

@Input() url!: string;

}
