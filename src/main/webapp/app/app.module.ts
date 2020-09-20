import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { Sampleapp1SharedModule } from 'app/shared/shared.module';
import { Sampleapp1CoreModule } from 'app/core/core.module';
import { Sampleapp1AppRoutingModule } from './app-routing.module';
import { Sampleapp1HomeModule } from './home/home.module';
import { Sampleapp1EntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    Sampleapp1SharedModule,
    Sampleapp1CoreModule,
    Sampleapp1HomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    Sampleapp1EntityModule,
    Sampleapp1AppRoutingModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent],
})
export class Sampleapp1AppModule {}
