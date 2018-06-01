# Ng Elevator

[![npm version](https://badge.fury.io/js/%40greg-md%2Fgreg-elevator.svg)](https://badge.fury.io/js/%40greg-md%2Fgreg-elevator)
[![Build Status](https://travis-ci.org/greg-md/greg-elevator.svg?branch=master)](https://travis-ci.org/greg-md/greg-elevator)

Make a container to elevate on the screen while scrolling with Angular.

# Table of Contents:

* [Installation](#installation)
* [How It Works](#how-it-works)
* [Component Attributes](#component-attributes)
* [License](#license)
* [Huuuge Quote](#huuuge-quote)

# Installation

```bash
npm install @greg-md/greg-elevator --save
```

# How It Works

### Setting up in a module

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// 1. Import elevator module;
import { ElevatorModule } from '@greg-md/greg-elevator';

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
      <greg-elevator>
        You will see me while scrolling.
      </greg-elevator>
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
<greg-elevator [marginTop]="20">
  Hello! I am elevating.
</greg-elevator>
```

## marginBottom

If the elevator height is bigger than the screen height,
elevator by default is fixed on the bottom of the screen while scrolling down.
You could set a margin bottom for the elevator.

_Example:_

```html
<greg-elevator [marginBottom]="20">
  Hello! I am elevating.
</greg-elevator>
```

# License

MIT © [Grigorii Duca](http://greg.md)

# Huuuge Quote

![I fear not the man who has practiced 10,000 programming languages once, but I fear the man who has practiced one programming language 10,000 times. #horrorsquad](http://greg.md/huuuge-quote-fb.jpg)
