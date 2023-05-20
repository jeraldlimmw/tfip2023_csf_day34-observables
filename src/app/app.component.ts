import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription, filter, map, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'day34';

  count = 0
  log = 0
  countEvent = new Subject<number>()
  // $ for an observable, subscription or promise:
  countSub$!: Subscription
  countObs$!: Observable<number>
  countObs2$!: Observable<number>

  // first in the lifecycle to be called
  ngOnInit(): void {
    // use pipe to conduct operations on the observable
    this.countObs$ = this.countEvent.pipe(
      // tap: perform a side effect on the stream
      // typically to log a stream
      tap(v => console.info('v = ', v)),
      filter(v => !(v%2)),
      map(v => v * 10)
    )
    this.countSub$ = this.countEvent.subscribe(
      (v) => {
        this.log = v
        if (!(v%2))
          this.count = v * 10
      }
    )
    this.countObs2$ = this.countEvent.pipe(
      map(v => v * 10)
    )
  }

  // last in the lifecycle to be called
  ngOnDestroy(): void {
    // components are destroyed when the view changes
    // must unsubscribe to avoid memory leak - think: closing streams
    this.countSub$.unsubscribe()
  }

  pressed() {
    const n = Math.floor(Math.random() * 100) + 1
    // send the event
    this.countEvent.next(n)
  }

}
