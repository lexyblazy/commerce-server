describe("Express server", () => {
  beforeAll(() => {
    process.env.NODE_ENV = "test";
  });
  it("Sample test", async () => {
    expect(true).toBeTruthy();
  });
});
