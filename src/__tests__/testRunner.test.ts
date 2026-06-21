// Smoke test confirming the Jest toolchain transforms TypeScript and runs.
describe("test runner", () => {
    it("executes TypeScript with modern syntax", () => {
        const maybeValue: number | undefined = undefined;

        expect(maybeValue ?? 41).toBe(41);
    });
});
