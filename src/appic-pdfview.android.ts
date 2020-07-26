/// <reference path="./AndroidPdfViewer.d.ts" />
import {
    AppicPdfViewCommon,
    srcProperty
  } from "./appic-pdfview.common";
  import * as fs from "tns-core-modules/file-system";
  import pdfviewer = com.github.appiclogics.pdfviewer;
  import * as http from "tns-core-modules/http";
  
 
  
  export class AppicPdfView extends AppicPdfViewCommon {
   
    private promise: Promise<void>;
  private tempFolder = fs.knownFolders.temp().getFolder('PDFViewer.temp/');

  private onLoadHandler = (() => {
    const pdfViewRef = new WeakRef(this);

    return new pdfviewer.listener.OnLoadCompleteListener({
      loadComplete: numPages => {
        AppicPdfViewCommon.notifyOfEvent(AppicPdfViewCommon.loadEvent, pdfViewRef);
      },
    });
  })();

  public get android() {
    return this.nativeView as pdfviewer.PDFView;
  }

  public set android(value) {
    this.nativeView = value;
  }

  public createNativeView() {
    // tslint:disable-next-line:no-unsafe-any
    return new pdfviewer.PDFView(this._context, void 0);
  }

  public [srcProperty.setNative](value: string) {
    this.loadPDF(value);
  }

  public loadPDF(src: string) {
    if (!src || !this.android) {
      return;
    }

    // reset any previous promise since we've called loadPDF again
    this.promise = void 0;

    if (src.indexOf('://') === -1) {
      src = 'file://' + src;
    } else if (src.indexOf('file://') !== 0) {
      // AndroidPdfViewer cannot load from remote URLs, download to cache
      this.cacheThenLoad(src);
      return;
    }

    const uri = android.net.Uri.parse(src);

    const defaultSpacingDP = 8;
    this.android
      .fromUri(uri)
      .onLoad(this.onLoadHandler)
      .spacing(defaultSpacingDP)
      .enableAnnotationRendering(this.enableAnnotationRendering)
      .fitEachPage(true)
      .load();
  }

  private cacheThenLoad(url: string) {
    // clear everything in cache
    this.tempFolder.clear().then(() => {

      // download to cache
      const promise = this.promise = http
        .getFile(url, `${this.tempFolder.path}/${Date.now()}.pdf`)
        .then(file => {
          if (this.promise === promise) {  // make sure we haven't switched
            this.loadPDF(file.path);
          }
        }).catch(error => {
          console.error(error);
        });
    });
  }
  }
  