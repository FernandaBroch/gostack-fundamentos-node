import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balanceIncome = this.transactions
      .filter(item => {
        return item.type === 'income';
      })
      .reduce((accum, currentVal) => {
        return accum + currentVal.value;
      }, 0);

    const balanceOutcome = this.transactions
      .filter(item => {
        return item.type === 'outcome';
      })
      .reduce((accum, currentVal) => {
        return accum + currentVal.value;
      }, 0);

    const total = balanceIncome - balanceOutcome;

    return { income: balanceIncome, outcome: balanceOutcome, total };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
