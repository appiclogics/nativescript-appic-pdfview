import { Component, OnInit } from "@angular/core";

import { AppicPdfView } from "nativescript-appic-pdfview";
import { registerElement } from "nativescript-angular";
registerElement("AppicPdfView", () => AppicPdfView);

import {
    Downloader,
    ProgressEventData,
    DownloadEventData,
} from "nativescript-downloader";

import {
    android,
    AndroidApplication,
    AndroidActivityBundleEventData,
    AndroidActivityEventData,
    AndroidActivityResultEventData,
    AndroidActivityBackPressedEventData,
} from "tns-core-modules/application";
import { Page } from "tns-core-modules/ui/page";

@Component({
    selector: "Home",
    templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit {
    downloader = new Downloader();
    pdflink = "";
    constructor(private page: Page) {
        // Use the component constructor to inject providers.

        // Android activity events
        if (android) {
            android.on(AndroidApplication.activityCreatedEvent, function (
                args: AndroidActivityBundleEventData
            ) {
                console.log(
                    "Event: " +
                        args.eventName +
                        ", Activity: " +
                        args.activity +
                        ", Bundle: " +
                        args.bundle
                );

                this.pdflink = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

              
            });

            android.on(AndroidApplication.activityDestroyedEvent, function (
                args: AndroidActivityEventData
            ) {
                console.log(
                    "Event: " + args.eventName + ", Activity: " + args.activity
                );
            });

            android.on(AndroidApplication.activityStartedEvent, function (
                args: AndroidActivityEventData
            ) {
                console.log(
                    "Event: " + args.eventName + ", Activity: " + args.activity
                );
            });

            android.on(AndroidApplication.activityPausedEvent, function (
                args: AndroidActivityEventData
            ) {
                console.log(
                    "Event: " + args.eventName + ", Activity: " + args.activity
                );
            });

            android.on(AndroidApplication.activityResumedEvent, function (
                args: AndroidActivityEventData
            ) {
                console.log(
                    "Event: " + args.eventName + ", Activity: " + args.activity
                );

             
                this.pdflink = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";



            });

            android.on(AndroidApplication.activityStoppedEvent, function (
                args: AndroidActivityEventData
            ) {
                console.log(
                    "Event: " + args.eventName + ", Activity: " + args.activity
                );
            });

            android.on(AndroidApplication.saveActivityStateEvent, function (
                args: AndroidActivityBundleEventData
            ) {
                console.log(
                    "Event: " +
                        args.eventName +
                        ", Activity: " +
                        args.activity +
                        ", Bundle: " +
                        args.bundle
                );
            });

            android.on(AndroidApplication.activityResultEvent, function (
                args: AndroidActivityResultEventData
            ) {
                console.log(
                    "Event: " +
                        args.eventName +
                        ", Activity: " +
                        args.activity +
                        ", requestCode: " +
                        args.requestCode +
                        ", resultCode: " +
                        args.resultCode +
                        ", Intent: " +
                        args.intent
                );
            });

            android.on(AndroidApplication.activityBackPressedEvent, function (
                args: AndroidActivityBackPressedEventData
            ) {
                console.log(
                    "Event: " + args.eventName + ", Activity: " + args.activity
                );
                // Set args.cancel = true to cancel back navigation and do something custom.
            });
        }

        // Downloader.setTimeout(120); //Increase timeout default 60s
    }

    ngOnInit(): void {
        // Init your component properties here.
        // const imageDownloaderId = this.downloader.createDownload({
        //     url:
        //         "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        // });
        // this.downloader
        //     .start(imageDownloaderId, (progressData: ProgressEventData) => {
        //         console.log(`Progress : ${progressData.value}%`);
        //         console.log(`Current Size : ${progressData.currentSize}%`);
        //         console.log(`Total Size : ${progressData.totalSize}%`);
        //         console.log(`Download Speed in bytes : ${progressData.speed}%`);
        //     })
        //     .then((completed: DownloadEventData) => {
        //         console.log(`Image : ${completed.path}`);
        //         this.pdflink = completed.path;
        //     })
        //     .catch((error) => {
        //         console.log(error.message);
        //     });

        this.pdflink = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

    }
}
