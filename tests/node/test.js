/*global expect*/
/*global describe*/

describe("A suite is just a function", () => {
  var a;

  it("and so is a spec", () => {
    a = true;

    expect(a).toBe(true);
  });
});