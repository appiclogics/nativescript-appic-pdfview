import { AppicPdfViewCommon } from './appic-pdfview.common';
export declare class AppicPdfView extends AppicPdfViewCommon {
   // define your typings manually
  // or..
  // use take the ios or android .d.ts files and copy/paste them here

  public loadPDF(src: string): void;

  public static loadEvent: string;
  public static notifyOfEvent(
    eventName: string,
    pdfViewRef: WeakRef<AppicPdfViewCommon>,
  ): void;
}