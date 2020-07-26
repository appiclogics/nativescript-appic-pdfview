import { Property, View } from "tns-core-modules/ui/core/view";

export abstract class AppicPdfViewCommon extends View {
  public static loadEvent = 'load';

  /**
   * Render annotations (such as comments, colors or forms) on Android
   */
  public enableAnnotationRendering: boolean;

  /**
   * the source url of the PDF to show
   */
  public src: string;

  public static notifyOfEvent(
    eventName: string,
    pdfViewRef: WeakRef<AppicPdfViewCommon>,
  ) {
    const viewer = pdfViewRef.get();

    if (viewer) {
      viewer.notify({ eventName, object: viewer });
    }
  }
}

export const enableAnnotationRenderingProperty = new Property<AppicPdfViewCommon, boolean>({
  name: 'enableAnnotationRendering',
  defaultValue: false,
});
enableAnnotationRenderingProperty.register(AppicPdfViewCommon);

export const srcProperty = new Property<AppicPdfViewCommon, string>({
  name: 'src',
});
srcProperty.register(AppicPdfViewCommon);