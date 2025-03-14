import { Injectable, inject } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  private onRouteChangeList: Array<(event: NavigationEnd) => void> = [];
  private _currentUrl!: string;

  constructor() {

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      const ev = event as NavigationEnd;
      this.onRouteChangeList.forEach(onChange => onChange(ev));
      this._currentUrl = ev.url;
  });

  }

  public onRouteChange(onChange: (event: NavigationEnd) => void) {
    this.onRouteChangeList.push(onChange);
  }

  public reload() {
    this.router.navigate([this.router.url]);
  }

  public navigate(url: string[]) {
    this.router.navigate(url);
  }

  public get currentUrl() {
    return this._currentUrl;
  }

}