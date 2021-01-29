import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-markdown',
  templateUrl: './input-markdown.component.html',
  styleUrls: ['./input-markdown.component.css']
})
export class InputMarkdownComponent implements OnInit {

  @Input()
  contenidoMarkdown : string | undefined = '';

  @Input()
  placeHoldertextArea:string='texto';

  @Output()
  changeMarkdown: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  inputTextArea(event: any){
    const texto = (event.target as HTMLTextAreaElement).value;
    // this.contenidoMarkdown = texto;
    this.changeMarkdown.emit(texto);
  }
}
