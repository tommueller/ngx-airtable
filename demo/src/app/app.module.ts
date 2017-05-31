import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './components/app/app.component';
import {NgxAirtableModule} from 'ngx-airtable';
import {BugsComponent} from './components/bugs/bugs.component';
import {MembersComponent} from './components/members/members.component';
import {FeaturesComponent} from './components/features/features.component';

@NgModule({
  declarations: [
    AppComponent,
    BugsComponent,
    MembersComponent,
    FeaturesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgxAirtableModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
