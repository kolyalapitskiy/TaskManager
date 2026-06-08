import { expect, test, describe } from 'vitest'
import { taskValidation } from './taskValidation'

describe('taskValidation()', () => {

  test('должен возвращать ошибку, если строка пустая', () => {
    const result = taskValidation('   ')
    expect(result.isValid).toBe(false)
    expect(result.error).toBe("Название не может быть меньше 4-ёх символов!")
  })

  test('должен возвращать ошибку для короткого названия (2 символа)', () => {
    const result = taskValidation('ab')
    expect(result.isValid).toBe(false)
    expect(result.error).toBe("Название не может быть меньше 4-ёх символов!")
  })

  test('должен проходить валидацию для названия из 4 символов', () => {
    const result = taskValidation('1234')
    expect(result.isValid).toBe(true)
  })

  test('должен проходить валидацию для нормального названия', () => {
    const result = taskValidation('Купить продукты')
    expect(result.isValid).toBe(true)
  })

  test('должен возвращать ошибку, если название слишком длинное', () => {
    const longName = 'a'.repeat(251)
    const result = taskValidation(longName)
    expect(result.isValid).toBe(false)
    expect(result.error).toBe("Название не может быть больше 250-ёх символов!")
  })

})
