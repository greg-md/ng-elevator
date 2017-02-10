# Elevator for Angular2

[![npm version](https://badge.fury.io/js/%40greg-md%2Fng-elevator.svg)](https://badge.fury.io/js/%40greg-md%2Fng-elevator)
[![Build Status](https://travis-ci.org/greg-md/ng-elevator.svg?branch=master)](https://travis-ci.org/greg-md/ng-elevator)

Make a container to elevate on screen while scrolling with Angular2.

# Table of contents:

* [Installation](#installation)
* [How It Works](#how-it-works)
* [Component Attributes](#component-attributes)
* [License](#license)
* [Huuuge Quote](#huuuge-quote)

# Installation

```bash
npm install @greg-md/ng-elevator --save
```

# How It Works

### Setting up in a module

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// 1. Import elevator module;
import { ElevatorModule } from '@greg-md/ng-elevator';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    // 2. Register elevator module.
    ElevatorModule,
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Using in templates

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styles: `
    .sidebar {
        width: 200px;
        height: 500px;
    }
  `,
  template: `
    <section class="sidebar">
      <gg-elevator>
        You will see me while scrolling.
      </gg-elevator>
    </section>
  `,
})
export class AppComponent { }
```

# Component Attributes

## marginTop

Elevator by default is fixed on the top of the screen while scrolling up.
You could set a margin top for the elevator.

_Example:_

```html
<gg-elevator marginTop="20">
  Hello! I am elevating.
</gg-elevator>
```

## marginBottom

If the elevator height is bigger than the screen height,
elevator by default is fixed on the bottom of the screen while scrolling down.
You could set a margin bottom for the elevator.

_Example:_

```html
<gg-elevator marginBottom="20">
  Hello! I am elevating.
</gg-elevator>
```

# License

MIT © [Grigorii Duca](http://greg.md)

# Huuuge Quote

![I fear not the man who has practiced 10,000 programming languages once, but I fear the man who has practiced one programming language 10,000 times. #horrorsquad](http://greg.md/huuuge-quote-fb.jpg)
