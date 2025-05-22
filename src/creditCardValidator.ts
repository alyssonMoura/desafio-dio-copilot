export enum CreditCardBrand {
  VISA = 'VISA',
  MASTERCARD = 'MASTERCARD',
  AMEX = 'AMEX',
  DINERS = 'DINERS',
  DISCOVER = 'DISCOVER',
  JCB = 'JCB',
  HIPERCARD = 'HIPERCARD',
  ELO = 'ELO',
  UNKNOWN = 'UNKNOWN'
}

export class CreditCardValidator {
  static identifyBrand(cardNumber: string): CreditCardBrand {
    const sanitized = cardNumber.replace(/[\s-]/g, '');

    if (/^4\d{12}(\d{3})?$/.test(sanitized)) {
      return CreditCardBrand.VISA;
    }
    if (/^(5[1-5]\d{14}|2(2[2-9]\d{12}|[3-6]\d{13}|7[01]\d{12}|720\d{12}))$/.test(sanitized)) {
      return CreditCardBrand.MASTERCARD;
    }
    if (/^3[47]\d{13}$/.test(sanitized)) {
      return CreditCardBrand.AMEX;
    }
    if (/^3(0[0-5]|[68]\d)\d{11}$/.test(sanitized)) {
      return CreditCardBrand.DINERS;
    }
    if (/^6(011|5\d{2})\d{12}$/.test(sanitized)) {
      return CreditCardBrand.DISCOVER;
    }
    // JCB: 3528-3589 (16 digits) or 2131, 1800 (15 digits)
    if (/^(?:35[2-8][0-9]\d{12}|2131\d{11}|1800\d{11})$/.test(sanitized)) {
      return CreditCardBrand.JCB;
    }
    // Hipercard: 606282 (16-19 digits), 3841 (16 digits)
    if (/^(606282\d{10,13}|3841\d{12})$/.test(sanitized)) {
      return CreditCardBrand.HIPERCARD;
    }
    // ELO: multiple BINs, simplified for common patterns
    if (
      /^(4011(78|79)\d{10}|431274\d{10}|438935\d{10}|451416\d{10}|457393\d{10}|504175\d{10}|5067\d{12}|509\d{13}|627780\d{10}|636297\d{10}|636368\d{10}|650\d{13}|6516\d{12}|6550\d{12})$/.test(sanitized)
    ) {
      return CreditCardBrand.ELO;
    }
    return CreditCardBrand.UNKNOWN;
  }

  static validate(cardNumber: string): boolean {
    const sanitized = cardNumber.replace(/[\s-]/g, '');
    if (!/^\d{13,19}$/.test(sanitized)) {
      return false;
    }
    let sum = 0;
    let shouldDouble = false;
    for (let i = sanitized.length - 1; i >= 0; i--) {
      let digit = parseInt(sanitized.charAt(i), 10);
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
  }
}
