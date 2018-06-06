import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Howl, Howler } from 'howler';
import { PaperScope, Project, Path, Point, view } from 'paper';


@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {
  @ViewChild('canvasElement') canvasElement: ElementRef;
  @ViewChild('nameit') private elementRef: ElementRef;

    scope: PaperScope;
    project: Project;
    inputt = '';

  circles = [];


   keyData = {
    q: {
      sound: new Howl({
        src: '../../assets/sounds/sounds/bubbles.mp3'
      }),
      color: '#1abc9c'
    },
    w: {
      sound: new Howl({
        src: ['../../assets/sounds/sounds/clay.mp3']
      }),
      color: '#2ecc71'
    },
    e: {
      sound: new Howl({
        src: ['../../assets/sounds/sounds/confetti.mp3']
      }),
      color: '#3498db'
    },
    r: {
      sound: new Howl({
        src: ['../../assets/sounds/sounds/corona.mp3']
      }),
      color: '#9b59b6'
    },
      t: {
      sound: new Howl({
        src: ['../../assets/sounds/sounds/dotted-spiral.mp3']
      }),
      color: '#34495e'
    },
    y: {
      sound: new Howl({
        src: ['../../assets/sounds/sounds/flash-1.mp3']
      }),
      color: '#16a085'
    },
    u: {
      sound: new Howl({
        src: ['../../assets/sounds/sounds/flash-2.mp3']
      }),
      color: '#27ae60'
    },
    i: {
      sound: new Howl({
        src: ['../../assets/sounds/sounds/flash-3.mp3']
      }),
      color: '#2980b9'
    },
    o: {
      sound: new Howl({
        src: ['../../assets/sounds/sounds/glimmer.mp3']
      }),
      color: '#8e44ad'
    },
    p: {
      sound: new Howl({
        src: ['../../assets/sounds/sounds/moon.mp3']
      }),
      color: '#2c3e50'
    },
    a: {
      sound: new Howl({
        src: ['../../assets/sounds/sounds/pinwheel.mp3']
      }),
      color: '#f1c40f'
    },
    s: {
      sound: new Howl({
        src: ['../../assets/sounds/sounds/piston-1.mp3']
      }),
      color: '#e67e22'
    },
      d: {
      sound: new Howl({
        src: ['../../assets/sounds/sounds/piston-2.mp3']
      }),
      color: '#e74c3c'
    },
    f: {
      sound: new Howl({
        src: ['../../assets/sounds/sounds/prism-1.mp3']
      }),
      color: '#95a5a6'
    },
    g: {
      sound: new Howl({
        src: ['../../assets/sounds/sounds/prism-2.mp3']
      }),
      color: '#f39c12'
    },
    h: {
      sound: new Howl({
        src: ['../../assets/sounds/sounds/prism-3.mp3']
      }),
      color: '#d35400'
    },
    j: {
      sound: new Howl({
        src: ['../../assets/sounds/sounds/splits.mp3']
      }),
      color: '#1abc9c'
    },
    k: {
      sound: new Howl({
        src: ['../../assets/sounds/sounds/squiggle.mp3']
      }),
      color: '#2ecc71'
    },
    l: {
      sound: new Howl({
        src: ['../../assets/sounds/sounds/strike.mp3']
      }),
      color: '#3498db'
    },
    z: {
      sound: new Howl({
        src: ['../../assets/sounds/sounds/suspension.mp3']
      }),
      color: '#9b59b6'
    },
    x: {
      sound: new Howl({
        src: ['../../assets/sounds/sounds/timer.mp3']
      }),
      color: '#34495e'
    },
    c: {
      sound: new Howl({
        src: ['../../assets/sounds/sounds/ufo.mp3']
      }),
      color: '#16a085'
    },
    v: {
      sound: new Howl({
        src: ['../../assets/sounds/sounds/veil.mp3']
      }),
      color: '#27ae60'
    },
    b: {
      sound: new Howl({
        src: ['../../assets/sounds/sounds/wipe.mp3']
      }),
      color: '#2980b9'
    },
    n: {
      sound: new Howl({
        src: ['../../assets/sounds/sounds/zig-zag.mp3']
      }),
      color: '#8e44ad'
    },
    m: {
      sound: new Howl({
        src: ['../../assets/sounds/sounds/moon.mp3']
      }),
      color: '#2c3e50'
    }
  };


  constructor() { }

  ngOnInit() {
    this.scope = new PaperScope();
    this.project = new Project(this.canvasElement.nativeElement);
    this.onFrame(event);

  }

   // tslint:disable-next-line:use-life-cycle-interface
   ngAfterViewInit(): void {
    this.elementRef.nativeElement.focus();
  }

   onKeyDown(event) {

    const a = Math.floor(Math.random() * 85 );
    const b = Math.floor(Math.random() * 85);
    const c = Math.floor(Math.random() * 100);
    const d = Math.floor(Math.random() * 100);

    console.log ('circles', c);
    // tslint:disable-next-line:prefer-const
    let point: Point;
    // tslint:disable-next-line:prefer-const
    let maxPoint: Point;
    // tslint:disable-next-line:prefer-const
    let randomPoint: Point;
    if (this.keyData[event.key]) {
      maxPoint = new Point(c, d);
      randomPoint = Point.random();
      // point = maxPoint * randomPoint;
      point =  new Point(a, b);
      // tslint:disable-next-line:prefer-const
      let newCircle = new Path.Circle(randomPoint, 9 * a);
      newCircle.fillColor = this.keyData[event.key].color;
      this.keyData[event.key].sound.play();
      this.circles.push(newCircle);
      this.onFrame(event);
    }
  }


   onFrame(event) {
    for (let i = 0; i < this.circles.length; i ++ ) {
      this.circles[i].scale(0.8);
      console.log('area', this.circles[i].area);
      this.circles[i].fillColor.hue += 1;
      if (this.circles[i].area < 1) {
        this.circles[i].remove();
        this.circles.splice(i, 1);
        // console.log('onFrame', this.circles);
      }
    }
  }

  onSearchChange(searchValue: string ) {
    console.log(searchValue);
  }

  onValueChange() {
    return this.inputt;
  }

}
