import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BikesiteListComponent } from './bike-site-list/bikesite-list.component';
import { OsloBikeMapComponent } from './oslo-bike-map/oslo-bike-map.component';

@NgModule({
  declarations: [
    AppComponent,
    BikesiteListComponent,
    OsloBikeMapComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
