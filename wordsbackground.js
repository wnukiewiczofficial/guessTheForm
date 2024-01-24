class BackgroundWords {
  constructor(dictionary) {
    this.params = dictionary.map((obj) => {
      const word = obj.form1[0].toUpperCase() + obj.form1.slice(1);
      const x = random(0, width);
      const y = random(0, height);
      const xdir = random() < 0.5 ? -1 : 1;
      const ydir = random() < 0.5 ? -1 : 1;
      const size = round(random(2, 4));
      const speed = random(0.5, 3);
      return { word, x, y, xdir, ydir, size, speed };
    });
    this.coSize = 6;
    this.coSpeed = 0.5;
  }

  drawBackgroundWords(chosenWord) {
    this.params.forEach((obj) => {
      textSize(100);
      if (chosenWord !== obj.word) {
        textSize(this.coSize * obj.size);
      }
      textAlign(LEFT, TOP);
      textFont("Josefin Sans");
      text(obj.word, obj.x, obj.y);
    });
  }

  updateBackgroundWords() {
    this.params.forEach((obj) => {
      obj.x += obj.xdir * this.coSpeed * obj.speed;
      obj.y += obj.ydir * this.coSpeed * obj.speed;

      if (obj.x + textWidth(obj.word) >= width || obj.x <= 0) obj.xdir *= -1;
      if (obj.y + textAscent() + textDescent() >= height || obj.y <= 0)
        obj.ydir *= -1;
    });
  }
}
