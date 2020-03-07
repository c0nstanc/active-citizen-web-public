import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CamImage } from 'src/app/shared/component/camera/model/cam-image.model';


@Component({
  selector: 'app-enter-incident-photo',
  templateUrl: './enter-incident-photo.component.html',
  styleUrls: ['./enter-incident-photo.component.scss']
})
export class EnterIncidentPhotoComponent implements OnInit {

  camImage: CamImage;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onNxtBtnClicked(): void {
    this.router.navigate(['incidents/new-incident/']);
  }

  onPictureTaken(camImage: CamImage) {
    console.log('cheeess!!!' + camImage.imageAsDataUrl);
    this.camImage = camImage;
  }

}
