import { Component, Input } from '@angular/core';
import { SafeUrlPipe } from '../pipes/safe-url.pipe'; // Adjust path as necessary

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [SafeUrlPipe],
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent {
  // component code...
}
