import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { AngularFireModule } from "@angular/fire/compat"
import { environment } from "../environment/environment";
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { RouterModule } from "@angular/router";
import { routes } from "./app.routes";
import { QuillModule } from 'ngx-quill';

@NgModule({
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    imports: [BrowserModule, 
        FormsModule, 
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        RouterModule.forRoot(routes),
        QuillModule.forRoot() ,
        FormsModule,
    ],
    exports: []
})
export class AppModule{}