#![feature(proc_macro, wasm_custom_section, wasm_import_module)]

extern crate wasm_bindgen;
extern crate rand;

use std::fmt;

use wasm_bindgen::prelude::*;

#[wasm_bindgen(module = "./index")]
extern {
    fn get_shuffled_cards() -> String;
}

#[wasm_bindgen]
extern {
    type HTMLDocument;
    static document: HTMLDocument;
    #[wasm_bindgen(method, getter)]
    fn body(this: &HTMLDocument) -> HTMLElement;
    #[wasm_bindgen(method)]
    fn createElement(this: &HTMLDocument, tag_name: &str) -> HTMLElement;
    #[wasm_bindgen(method, js_name = getElementById)]
    fn get_element_by_id(this: &HTMLDocument, id: &str) -> HTMLElement;

    type HTMLElement;
    #[wasm_bindgen(method, setter = id)]
    fn set_id(this: &HTMLElement, id: &str);
    #[wasm_bindgen(method, setter = className)]
    fn set_class(this: &HTMLElement, class: &str);
    #[wasm_bindgen(method, setter = innerHTML)]
    fn set_inner_html(this: &HTMLElement, html: &str);
    #[wasm_bindgen(method, js_name = appendChild)]
    fn append_child(this: &HTMLElement, other: HTMLElement);
    #[wasm_bindgen(method, setter)]
    fn set_onclick(this: &HTMLElement, cb: &Closure<FnMut()>);
}

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub enum CardState {
    Opened = 1,
    Closed = 0
}

#[derive(Clone, Copy)]
pub struct Card {
    pub id: usize,
    pub value: char,
    pub state: CardState
}

#[wasm_bindgen]
pub struct Memory {
    cards: Vec<Card>,
    width: u32,
    height: u32
}

impl Card {
    pub fn new(id: usize, value: char) -> Card {
        Card {
            id,
            value,
            state: CardState::Closed
        }
    }
}


#[wasm_bindgen]
impl Memory {
    pub fn new() -> Memory {
        let mut cards = Vec::new();
        let chars: Vec<char> = get_shuffled_cards().chars().collect();

        for (i, ch) in chars.into_iter().enumerate() {
            cards.push(Card::new(i, ch));
        };

        Memory {
            cards,
            width: 7,
            height: 4
        }
    }

    pub fn start(&mut self) {
        let container = document.createElement("div");

        container.set_id("memory");

        document.body().append_child(container);

        for card in self.cards.as_mut_slice().iter_mut() {
            let container = document.get_element_by_id("memory");
            let card_element = document.createElement("div");
            card_element.set_class("card");
            card_element.set_id(&card.id.to_string());

            let card_value = match card.state  {
                CardState::Opened => card.value.to_string(),
                CardState::Closed => "".to_string()
            };
            card_element.set_inner_html(&card_value);

            let mut card_clone = card.clone();
            
            let on_click = Closure::new(move || {
                card_clone.state = CardState::Opened;
                log(&card_clone.value.to_string());
            });
            card_element.set_onclick(&on_click);

            on_click.forget();

            container.append_child(card_element);
        };
    }

    pub fn render(&self) -> String {
        self.to_string()
    }
}

impl fmt::Display for Memory {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        for row in self.cards.as_slice().chunks(self.width as usize) {
            for &card in row {
                let symbol = if card.state == CardState::Closed { "🏿".chars().next().unwrap() } else { card.value };
                write!(f, "{}", symbol)?;
            }
            write!(f, "\n")?;
        }

        Ok(())
    }
}