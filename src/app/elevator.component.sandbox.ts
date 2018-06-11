import { sandboxOf } from 'angular-playground';
import { ElevatorComponent } from '@greg-md/ng-elevator';

export default sandboxOf(ElevatorComponent)
.add('default', {
  styles: [`
    .container {
        width: 200px;
        height: 2000px;
        border: 1px solid red;
    }
  `],
  template: `
    <section class="container">
      <greg-elevator>
        You will see me while scrolling.
      </greg-elevator>
    </section>
  `,
});
