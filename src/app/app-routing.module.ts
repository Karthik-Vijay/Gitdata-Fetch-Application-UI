import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GithubPRComponent } from './github-pr/github-pr.component';

const routes: Routes = [
  { path : '', component :GithubPRComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
