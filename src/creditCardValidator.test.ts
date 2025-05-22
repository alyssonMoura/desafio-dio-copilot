import { CreditCardValidator, CreditCardBrand } from './creditCardValidator';

describe('CreditCardValidator', () => {
  describe('identifyBrand', () => {
    it('should identify VISA cards', () => {
      expect(CreditCardValidator.identifyBrand('4532123456788901')).toBe(CreditCardBrand.VISA);
      expect(CreditCardValidator.identifyBrand('4916123456788901')).toBe(CreditCardBrand.VISA);
      expect(CreditCardValidator.identifyBrand('4532123456788')).toBe(CreditCardBrand.VISA);
    });

    it('should identify Mastercard cards', () => {
      expect(CreditCardValidator.identifyBrand('5412345678901234')).toBe(CreditCardBrand.MASTERCARD);
      expect(CreditCardValidator.identifyBrand('5412345678901234')).toBe(CreditCardBrand.MASTERCARD);
      expect(CreditCardValidator.identifyBrand('2720123456789012')).toBe(CreditCardBrand.MASTERCARD);
    });

    it('should identify American Express cards', () => {
      expect(CreditCardValidator.identifyBrand('371234567890123')).toBe(CreditCardBrand.AMEX);
      expect(CreditCardValidator.identifyBrand('341234567890123')).toBe(CreditCardBrand.AMEX);
    });

    it('should identify Diners Club cards', () => {
      expect(CreditCardValidator.identifyBrand('30123456789012')).toBe(CreditCardBrand.DINERS);
      expect(CreditCardValidator.identifyBrand('36123456789012')).toBe(CreditCardBrand.DINERS);
    });

    it('should identify Discover cards', () => {
      expect(CreditCardValidator.identifyBrand('6011123456789012')).toBe(CreditCardBrand.DISCOVER);
      expect(CreditCardValidator.identifyBrand('6511123456789012')).toBe(CreditCardBrand.DISCOVER);
    });

    it('should identify JCB cards', () => {
      expect(CreditCardValidator.identifyBrand('3530123456789012')).toBe(CreditCardBrand.JCB);
      expect(CreditCardValidator.identifyBrand('2131123456789012')).toBe(CreditCardBrand.JCB);
    });

    it('should identify Hipercard', () => {
      expect(CreditCardValidator.identifyBrand('6062821234567890')).toBe(CreditCardBrand.HIPERCARD);
      expect(CreditCardValidator.identifyBrand('3841123456789012')).toBe(CreditCardBrand.HIPERCARD);
    });

    it('should identify ELO cards', () => {
      expect(CreditCardValidator.identifyBrand('4011781234567890')).toBe(CreditCardBrand.ELO);
      expect(CreditCardValidator.identifyBrand('5067671234567890')).toBe(CreditCardBrand.ELO);
      expect(CreditCardValidator.identifyBrand('6505091234567890')).toBe(CreditCardBrand.ELO);
    });

    it('should return UNKNOWN for invalid card numbers', () => {
      expect(CreditCardValidator.identifyBrand('1234567890123456')).toBe(CreditCardBrand.UNKNOWN);
      expect(CreditCardValidator.identifyBrand('0000000000000000')).toBe(CreditCardBrand.UNKNOWN);
    });
  });

  describe('validate', () => {
    it('should validate valid card numbers', () => {
      // Valid card numbers for each brand
      expect(CreditCardValidator.validate('4532733627287')).toBe(true);       // VISA
      expect(CreditCardValidator.validate('5495930982560008')).toBe(true);    // Mastercard
      expect(CreditCardValidator.validate('371449635398431')).toBe(true);     // American Express
      expect(CreditCardValidator.validate('30569309025904')).toBe(true);      // Diners
      expect(CreditCardValidator.validate('6011111111111117')).toBe(true);    // Discover
      expect(CreditCardValidator.validate('3530111333300000')).toBe(true);    // JCB
      expect(CreditCardValidator.validate('6062826786276634')).toBe(true);    // Hipercard
      expect(CreditCardValidator.validate('4011781234567890')).toBe(true);    // ELO
    });

    it('should invalidate cards that don\'t pass Luhn algorithm', () => {
      expect(CreditCardValidator.validate('4532733627286')).toBe(false);      // Invalid VISA
      expect(CreditCardValidator.validate('5495930982560007')).toBe(false);   // Invalid Mastercard
    });

    it('should handle cards with spaces and dashes', () => {
      expect(CreditCardValidator.validate('4532-7336-2728-7')).toBe(true);
      expect(CreditCardValidator.validate('4532 7336 2728 7')).toBe(true);
    });

    it('should invalidate cards with invalid format', () => {
      expect(CreditCardValidator.validate('abc')).toBe(false);
      expect(CreditCardValidator.validate('')).toBe(false);
      expect(CreditCardValidator.validate('12345')).toBe(false);
    });
  });
});
