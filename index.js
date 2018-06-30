const js = import("./rust_hackathon");

const shuffle = array => {
  let copy = [...array]
  let counter = copy.length

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter)

    counter--

    let temp = copy[counter]
    copy[counter] = copy[index]
    copy[index] = temp
  }

  return copy
}

export function get_shuffled_cards() {
  const emojis = [
    "😀",
    "😀",
    "😍",
    "😍",
    "😂",
    "😂",
    "🤣",
    "🤣",
    "😎",
    "😎",
    "😈",
    "😈",
    "👹",
    "👹",
    "☠",
    "☠",
    "💩",
    "💩",
    "🙀",
    "🙀",
    "🙊",
    "🙊",
    "🧟",
    "🧟",
  ];

  return shuffle(emojis).join('');
}

js.then(js => {
  const memory = js.Memory.new();
  const pre = document.getElementById("memory-canvas");

  memory.start();
});