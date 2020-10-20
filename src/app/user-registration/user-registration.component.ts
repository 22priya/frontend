import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
//import {​​​​​Observable}​​​​​ from 'rxjs/Observable';
import { Cardholder } from '../shared/cardholder.model';
import { CardholderService } from '../shared/cardholder.service';
import { ServerConnectService } from '../server-connect.service'
import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';
declare var require: any


//import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
//import { FileUploadModule } from 'ng2-file-upload/file-upload/file-upload.module';

//const uploadAPI = 'http://localhost:4000/api/upload';
@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  imageError: string;
  isImageSaved: boolean;
  cardImageBase64_1: string;
  cardImageBase64_2: string;
  userData: {
    'bioToken': string,
    'pan': string
  };

  bioToken: string;
  pan: string;

  private base64textString_1: String = "";

  scan_array = [];

  sha256_1 = "f294c4573c33a3484eeea644d7cbf62191cc99b67f65d2490f413fda3d854d11";  // png
  sha256_2 = "f614ff0dd652d5761353973db5340cac46c26ab0d03b6e2e2b0445c1ad29ba13";  // jpg
  sha256_3 = "g684uf0dd652d5761353973db5340cac46c26ab0d03b6e2e2b0445c1ad29ba13";  // jpg
  sha256_4 = "e561tf0dd652d5761353973db5340cac46c26ab0d03b6e2e2b0445c1ad29ba13";  // jpg
  sha256_5 = "q239qf0dd652d5761353973db5340cac46c26ab0d03b6e2e2b0445c1ad29ba13";  // jpg



  cardholder_arr: Cardholder[];
  signupForm: FormGroup;
  constructor(private cardholderService: CardholderService,
    private serverConnectService: ServerConnectService) { }
  onSubmit(form: FormGroup) {
    var cardholder: Cardholder = form.value;
    this.cardholderService.addCardholder(cardholder);
    this.cardholderService.cardholder_added.subscribe(
      (arr: Cardholder[]) => {
        this.cardholder_arr = arr;
      }
    );
    this.enterCustomerData(cardholder);
  }
  ngOnInit() {
    this.cardholderService.cardholder_added.subscribe(
      (arr: Cardholder[]) => {
        this.cardholder_arr = arr;
      });

    this.signupForm = new FormGroup(
      {
        'name': new FormControl('', Validators.required),
        'number': new FormControl(null, [Validators.required, Validators.min(1000000000), Validators.max(9999999999)]),
        'email': new FormControl('', [Validators.required, Validators.email]),
        'cardNo': new FormControl('', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]),
        'fingerprint': new FormControl('', Validators.required),
        'faceimg': new FormControl('', Validators.required)
      }
    );
  }


  private imageSrc: string = '';


  fileChangeEvent_1(fileInput: any) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 15200;
      const max_width = 25600;

      if (fileInput.target.files[0].size > max_size) {
        this.imageError =
          'Maximum size allowed is ' + max_size / 1000 + 'Mb';

        return false;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];

          console.log(img_height, img_width);


          if (img_height > max_height && img_width > max_width) {
            this.imageError =
              'Maximum dimentions allowed ' +
              max_height +
              '*' +
              max_width +
              'px';
            return false;
          } else {
            const imgBase64Path = e.target.result;
            this.cardImageBase64_1 = imgBase64Path;
            this.isImageSaved = true;

            var reader = new FileReader();

            reader.onload = this._handleReaderLoaded.bind(this);

            reader.readAsBinaryString(fileInput.target.files[0]);

          }
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString_1 = btoa(binaryString);


    var SHA256 = require("crypto-js/sha256");


    this.bioToken = this.sha256_2;

    /*this.serverConnectService.test().subscribe(data => {
      //console.log(data);

    });*/

  }

  removeImage_1() {
    this.cardImageBase64_1 = null;
    this.isImageSaved = false;
  }


  fileChangeEvent_2(fileInput: any) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 15200;
      const max_width = 25600;

      if (fileInput.target.files[0].size > max_size) {
        this.imageError =
          'Maximum size allowed is ' + max_size / 1000 + 'Mb';

        return false;
      }

      // if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
      //   this.imageError = 'Only Images are allowed ( JPG | PNG )';
      //   return false;
      // }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];

          console.log(img_height, img_width);


          if (img_height > max_height && img_width > max_width) {
            this.imageError =
              'Maximum dimentions allowed ' +
              max_height +
              '*' +
              max_width +
              'px';
            return false;
          } else {
            const imgBase64Path = e.target.result;
            this.cardImageBase64_2 = imgBase64Path;
            this.isImageSaved = true;
            // this.previewImagePath = imgBase64Path;

            var reader = new FileReader();

            reader.onload = this._handleReaderLoaded.bind(this);

            reader.readAsBinaryString(fileInput.target.files[0]);


          }
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  removeImage_2() {
    this.cardImageBase64_2 = null;
    this.isImageSaved = false;
  }


  enterCustomerData(cardholder) {
    // console.log(userName, mobileNo, emailId, cardNo);
    console.log(cardholder);
    this.pan = cardholder.cardNo;

    console.log(this.bioToken, this.pan);

    this.userData = {
      'bioToken': this.bioToken,
      'pan': this.pan
    }

    console.log(this.userData);

    this.serverConnectService.userRegisteration(this.userData).subscribe(data => {
      console.log(data);

    });

  }


}
