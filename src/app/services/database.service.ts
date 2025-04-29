import { Injectable } from '@angular/core';
import { SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { CapacitorSQLite } from '@capacitor-community/sqlite';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private db: SQLiteDBConnection | null = null;
  private sqlite: SQLiteConnection;

  constructor() {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
  }

  async initDB() {
    try {
      await this.sqlite.createConnection('mydb', true, 'no-encryption', 1,false);
      this.db = await this.sqlite.retrieveConnection('mydb',false);
      await this.db.open();
      await this.createTables();
    } catch (error) {
      console.error('Fehler bei der Datenbankinitialisierung:', error);
    }
  }

  async createTables() {
    if (!this.db) return;

    const sql = `
      CREATE TABLE IF NOT EXISTS incomes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        amount REAL NOT NULL,
        note TEXT
      );
      CREATE TABLE IF NOT EXISTS expenses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        amount REAL NOT NULL,
        note TEXT
      );
    `;

    await this.db.execute(sql);
  }

  async addIncome(title: string, amount: number, note: string) {
    if (!this.db) return;

    const sql = `INSERT INTO incomes (title, amount, note) VALUES (?, ?, ?)`;
    await this.db.run(sql, [title, amount, note]);
  }

  async getIncomes() {
    if (!this.db) return [];

    const res = await this.db.query('SELECT * FROM incomes');
    return res.values || [];
  }
}
