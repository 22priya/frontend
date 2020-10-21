import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Merchant } from '../shared/merchant.model';
import { MerchantService } from '../shared/merchant.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CardholderService } from '../shared/cardholder.service';
import { ServerConnectService } from '../server-connect.service'


@Component({
  selector: 'app-merchant-dashboard',
  templateUrl: './merchant-dashboard.component.html',
  styleUrls: ['./merchant-dashboard.component.css']
})
export class MerchantDashboardComponent implements OnInit {
  id;
  merchant: Merchant;
  signupForm: FormGroup;
  status: boolean = false;
  validationDone = false;


  imageError: string;
  isImageSaved: boolean;
  cardImageBase64_1: string;
  cardImageBase64_2: string;
  userData: {
    'bioToken': string,
    'amount': string
  };

  bioToken: string;
  amount: string;

  private base64textString_1: String = "";

  scan_array = [];

  sha256_1 = "f294c4573c33a3484eeea644d7cbf62191cc99b67f65d2490f413fda3d854d11";  // png
  sha256_2 = "f614ff0dd652d5761353973db5340cac46c26ab0d03b6e2e2b0445c1ad29ba13";  // jpg
  sha256_3 = "g684uf0dd652d5761353973db5340cac46c26ab0d03b6e2e2b0445c1ad29ba13";  // jpg
  sha256_4 = "e561tf0dd652d5761353973db5340cac46c26ab0d03b6e2e2b0445c1ad29ba13";  // jpg
  sha256_5 = "q239qf0dd652d5761353973db5340cac46c26ab0d03b6e2e2b0445c1ad29ba13";  // jpg



  constructor(private route: ActivatedRoute,
              private merchntService: MerchantService,
              private cardholderService: CardholderService,
              private serverConnectService: ServerConnectService) { }

  onSubmit(form: FormGroup) {
    var fingerprint = form.value.fingerprint;
    var face_img = form.value.img;
    var amount = form.value.amount;
    this.status = true;
    //this.cardholderService.validateCardholder(fingerprint, face_img);
    this.validationDone = true;
    this.enterCustomerData(form);
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.merchant = this.merchntService.getMerchant(this.id);
      }
    );
    this.signupForm = new FormGroup(
      {
        'fingerprint': new FormControl('', Validators.required),
        'img': new FormControl('', Validators.required),
        'amount': new FormControl(null, Validators.required)
      }
    );
  }

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


    this.bioToken = this.sha256_2;

    this.serverConnectService.test().subscribe(data => {
      console.log(data);

    });

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

  enterCustomerData(paymentAmount) {
    // console.log(userName, mobileNo, emailId, cardNo);
    console.log(paymentAmount);
    this.amount = paymentAmount.value.amount;

    console.log(this.bioToken, this.amount);

    this.userData = {
      'bioToken': this.bioToken,
      'amount': this.amount
    }

    console.log(this.userData);
    let paymentData = 
      {
      "surcharge": "11.99",
      "amount": this.amount,
      "localTransactionDateTime": "2020-10-19T02:53:42",
      "cpsAuthorizationCharacteristicsIndicator": "Y",
      "riskAssessmentData": 
      {
      "traExemptionIndicator": true,
      "trustedMerchantExemptionIndicator": true,
      "scpExemptionIndicator": true,
      "delegatedAuthenticationIndicator": true,
      "lowValueExemptionIndicator": true
      },
      "colombiaNationalServiceData": {
      "addValueTaxReturn": "10.00",
      "taxAmountConsumption": "10.00",
      "nationalNetReimbursementFeeBaseAmount": "20.00",
      "addValueTaxAmount": "10.00",
      "nationalNetMiscAmount": "10.00",
      "countryCodeNationalService": "170",
      "nationalChargebackReason": "11",
      "emvTransactionIndicator": "1",
      "nationalNetMiscAmountType": "A",
      "costTransactionIndicator": "0",
      "nationalReimbursementFee": "20.00"
      },
      "cardAcceptor": {
      "address": {
      "country": "USA",
      "zipCode": "94404",
      "county": "081",
      "state": "CA"
      },
      "idCode": "ABCD1234ABCD123",
      "name": "Visa Inc. USA-Foster City",
      "terminalId": "ABCD1234"
      },
      "acquirerCountryCode": "840",
      "acquiringBin": "408999",
      "senderCurrencyCode": "USD",
      "retrievalReferenceNumber": "330000550000",
      "addressVerificationData": {
      "street": "XYZ St",
      "postalCode": "12345"
      },
      "cavv": "0700100038238906000013405823891061668252",
      "systemsTraceAuditNumber": "451001",
      "businessApplicationId": "AA",
      "senderPrimaryAccountNumber": "y294c4573c33a3484eeea644d7cbf62191cc99b67f65d2490f413fda3d854d11",
      "settlementServiceIndicator": "9",
      "visaMerchantIdentifier": "73625198",
      "foreignExchangeFeeTransaction": "11.99",
      "senderCardExpiryDate": "2015-10",
      "nationalReimbursementFee": "11.22"
      }
      
    console.log(this.userData);

    this.serverConnectService.paymentVerification(paymentData).subscribe(data => {
      console.log(data);
    });

  }
}
