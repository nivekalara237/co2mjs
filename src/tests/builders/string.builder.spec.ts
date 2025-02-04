import { StringBuilder } from "../../lib";

describe("String Builder", () => {
  it("Constructor: initial", () => {
    const builder1 = new StringBuilder();
    const builder2 = new StringBuilder("INIT");
    expect(builder1.toString()).toEqual("");
    expect(builder2.toString()).toEqual("INIT");
  });

  it("Append string of any kind supported", () => {
    const builder = new StringBuilder()
      .append("I have ")
      .append(3)
      .append(" apples? ")
      .append(true)
      .append("!");
    expect(builder.toString()).toEqual("I have 3 apples? true!");
  });

  it("prepend string of any kind supported", () => {
    const builder = new StringBuilder()
      .prepend("!")
      .prepend(true)
      .prepend(" apples? ")
      .prepend(3)
      .prepend("I have ");
    expect(builder.toString()).toEqual("I have 3 apples? true!");
  });

  it("should build contains separating by *", () => {
    const builder = new StringBuilder();
    builder.append("I am").append("You are").append("He/she is");
    expect(builder.build(";")).toEqual("I am;You are;He/she is");
  });

  it("should build contains without separator", () => {
    const builder = new StringBuilder();
    builder.append("I am").append("You are").append("He/she is");
    expect(builder.build()).toEqual("I amYou areHe/she is");
  });

  it("should all segments appended or prepended", () => {
    const builder = new StringBuilder();
    builder.append("word").append("!").prepend("Hello");

    expect(builder.segments()).toEqual(["Hello", "word", "!"]);
  });

  it("Reverse the strings appenned", () => {
    const builder = new StringBuilder()
      .append("je")
      .append("tu")
      .append("il/elle");
    expect(builder.reverse()).toEqual("il/elletuje");
  });

  it("Reverse the content appenned", () => {
    const builder = new StringBuilder()
      .append("je")
      .append("tu")
      .append("il/elle");
    expect(builder.reverseContent()).toEqual("elle/liutej");
  });

  it("Shoud be empty", () => {
    const builder1 = new StringBuilder("  ");
    const builder2 = new StringBuilder().append(" ").prepend(" ").prepend("");
    expect(builder1.isEmpty()).toBeTruthy();
    expect(builder2.isEmpty()).toBeTruthy();
  });

  it("Shoud be not empty", () => {
    const builder1 = new StringBuilder("a");
    const builder2 = new StringBuilder().append(" .").prepend(" ").prepend("");
    expect(builder1.isEmpty()).toBeFalsy();
    expect(builder2.isEmpty()).toBeFalsy();
  });

  it("Shoud get segments size", () => {
    const builder1 = new StringBuilder("a");
    const builder2 = builder1.append(" .").prepend(" ").prepend("");
    expect(builder1.size()).toEqual(4);
  });

  it("Shoud get content size", () => {
    const builder1 = new StringBuilder("a");
    const builder2 = builder1.append(" .").prepend(" ").prepend("!!");
    expect(builder1.contentSize()).toEqual(6);
  });
});
