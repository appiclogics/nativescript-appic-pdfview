import { Component, OnInit } from "@angular/core";


import { AppicPdfView } from 'nativescript-appic-pdfview';
import { registerElement } from 'nativescript-angular';
registerElement('AppicPdfView', () => AppicPdfView);

@Component({
    selector: "Home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }
}
