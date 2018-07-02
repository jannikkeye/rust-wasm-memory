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
    Opened,
    Closed,
    Matched
}

#[derive(Debug, Clone, Copy)]
pub struct Card {
    pub id: usize,
    pub value: char,
    pub state: CardState
}

#[wasm_bindgen]
pub struct Memory {
    cards: Vec<Card>,
    width: u32,
    height: u32,
    score: u8
}

impl Card {
    pub fn new(id: usize, value: char) -> Card {
        Card {
            id,
            value,
            state: CardState::Closed,
        }
    }

    pub fn is_matched(&self) -> bool {
        self.state == CardState::Matched
    }

    pub fn is_revealed(&self) -> bool {
        self.state == CardState::Opened
    }

    pub fn is_closed(&self) -> bool {
        self.state == CardState::Closed
    }

    pub fn set_matched(&mut self) {
        self.state = CardState::Matched;
    }

    pub fn set_revealed(&mut self) {
        self.state = CardState::Opened;
    }

    pub fn set_closed(&mut self) {
        self.state = CardState::Closed;
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
            width: 6,
            height: 4,
            score: 0
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
                CardState::Matched => "✅".to_string(),
                CardState::Closed => "".to_string()
            };
            card_element.set_inner_html(&card_value);

            container.append_child(card_element);
        };

        log("Appended card elements to the DOM.")
    }

    pub fn update(&self) {
        for (index, card) in self.cards.iter().enumerate() {
            let card_element = document.get_element_by_id(&index.to_string());

            let card_value = match card.state {
                CardState::Opened => card.value.to_string(),
                CardState::Matched => "✅".to_string(),
                CardState::Closed => "".to_string()
            };

            card_element.set_inner_html(&card_value);
        }
    }

    pub fn render(&self) -> String {
        self.to_string()
    }

    pub fn close_cards(&mut self) {
        self.cards.iter_mut().for_each(|card| {
            card.set_closed();
        });
    }

    pub fn reveal_card(&mut self, card_index: usize) {
        {
            let card: &mut Card = self.cards.iter_mut().nth(card_index).unwrap();

            card.set_revealed();
        }

        self.update();

        self.handle_match();

        self.update();
    }

    pub fn check_match(&mut self) -> bool {
        true
    }

    pub fn handle_match(&mut self) {
        match self.check_match() {
            true => self.increase_score(),
            false => unimplemented!()
        };
    }

    pub fn increase_score(&mut self) {
        self.score += 1;

        log(&self.score.to_string());
        self.cards
            .iter_mut()
            .filter(|card| { card.is_revealed() })
            .for_each(|card| { card.set_matched() });

    }

    pub fn log(&self, message: &str) {
        log(&message);
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

impl fmt::Display for Card {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}", self.value)?;

        Ok(())
    }
}