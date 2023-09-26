import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dragdrop-fileupload';

  fileArr: any[] = [];
  imgArr: any[] = [];
  fileObj : any[]= [];
  form: FormGroup;
  public msg: string ='';
  progress: number = 0;
  constructor(
    public fb: FormBuilder,
    private sanitizer: DomSanitizer,
    // public dragdropService: DragdropService
  ) {
    this.form = this.fb.group({
      avatar: [null],
    });
  }
  ngOnInit() {}
  upload(e: any) {
    const fileListAsArray = Array.from(e);
    fileListAsArray.forEach((item, i) => {
      const file: any = e as HTMLInputElement;
      const url = URL.createObjectURL(file[i]);
      this.imgArr.push(url);
      this.fileArr.push({ item, url: url });
    });
    this.fileArr.forEach((item) => {
      this.fileObj.push(item.item);
    });
    // Set files form control
    this.form.patchValue({
      avatar: this.fileObj,
    });
    // this.form.get('avatar').updateValueAndValidity();
    // Upload to server
    
  }
  // Clean Url
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
