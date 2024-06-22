import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ButtonComponent } from './components/button/button.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { EditorComponent } from './editor/editor.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingPageComponent,
  },
  { path: 'button', component: ButtonComponent },
  { path: 'landingPageComponent', component: LandingPageComponent },
  { path: 'editorComponent', component: EditorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
