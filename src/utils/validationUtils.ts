export const validationUtils = {
  getCriteria(): {[key: string]: Criteria[]} {
    const criteria = {
      passwordCriteria: [
        { text: "1 uppercase letter", regex: /[A-Z]{1,}/, fullFill: false },
        { text: "1 lowercase letter", regex: /[a-z]{1,}/, fullFill: false },
        { text: "1 numbers", regex: /[0-9]{1,}/, fullFill: false },
        { text: "8 characters", regex: /.{8,}/, fullFill: false }
      ]
    };
    return criteria;
  },
  validateEmail(mail: string): boolean {
    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail);
  }
};

export type Criteria = {
  text: string;
  regex: RegExp;
  fullFill: boolean;
};
