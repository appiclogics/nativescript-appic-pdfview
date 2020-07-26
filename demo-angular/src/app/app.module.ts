import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import {
    android,
    AndroidApplication,
    AndroidActivityBundleEventData,
    AndroidActivityEventData,
    AndroidActivityResultEventData,
    AndroidActivityBackPressedEventData,
} from "tns-core-modules/application";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})


export class AppModule { }
