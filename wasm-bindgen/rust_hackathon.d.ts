/* tslint:disable */
export class Memory {
constructor(...args: any[]);
free(): void;
static  new(arg0: string): Memory;

 init(): void;

 render_title(arg0: any): void;

 render_cards(arg0: any): void;

 render_button(arg0: any): void;

 update_cards(): void;

 update_score(): void;

 update(): void;

 render(): string;

 close_cards(): void;

 reveal_card(arg0: number): void;

 set_card_style(arg0: string): void;

 set_button_style(arg0: string): void;

 check_match(): boolean;

 handle_match(): void;

 increase_score(): void;

 log(arg0: string): void;

}
