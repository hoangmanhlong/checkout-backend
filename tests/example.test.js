import { add, isEven } from "./math.js";

test('add() should return sum of two numbers', () => {
  expect(add(2, 3)).toBe(5);
  expect(add(-1, 1)).toBe(0);
});

test('isEven() should return true if number is even', () => {
  expect(isEven(2)).toBe(true);
  expect(isEven(3)).toBe(false);
});
