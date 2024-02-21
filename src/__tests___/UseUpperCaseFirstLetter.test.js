import { useUpperCaseFistLetter } from "../hooks/useUpperCaseFirstLetter"

describe('Test useUpperCaseFistLetter function', () => {
    test('Capitalize the first letter of each word', () => {
      const result = useUpperCaseFistLetter('hello world');
      expect(result).toBe('Hello world');
    })
})