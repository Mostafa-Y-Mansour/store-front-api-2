import database from "../database";

type crudModel = {
  id: number;
  email: string;
  information: string;
  firstName: string;
  lastName: string;
  first_name: string;
  last_name: string;
  password: string;
  name: string;
  price: number;
  category: string;
  status: string;
  user_id: number;
};

class Model {
  constructor(public table: string) {}
  async create(user: Object): Promise<crudModel> {
    try {
      const connection = await database.connect();
      const information = Object.keys(user);
      const sql: string = `INSERT INTO ${this.table} (${information.join(",")})
       values (${Array.from({ length: information.length }, (e, i) => `$${i + 1}`)}) returning *`;
      const result = await connection.query(sql, Object.values(user));
      connection.release();
      return result.rows[0];
    } catch (err: unknown) {
      throw new Error(`cannot create ${this.table.slice(0, -1)}`);
    }
  }

  async index(): Promise<crudModel[]> {
    try {
      const connection = await database.connect();
      const sql: string = `SELECT * FROM ${this.table}`;
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (err: unknown) {
      throw new Error(`cannot get this ${this.table}: ${(err as Error).message}`);
    }
  }

  async show(id: string, value: string | number | undefined): Promise<crudModel> {
    try {
      const connection = await database.connect();
      const sql: string = `SELECT * FROM ${this.table} WHERE ${id}=($1)`;
      const result = await connection.query(sql, [value]);
      connection.release();
      return result.rows[0];
    } catch (err: unknown) {
      throw new Error(`cannot show ${this.table.slice(0, -1)}:${id}, ${(err as Error).message}`);
    }
  }

  async update(id: string, u: any): Promise<crudModel> {
    try {
      const connection = await database.connect();
      const sql: string = `
      UPDATE ${this.table}
      SET ${Object.keys(u)
        .map((e, i) => `${e}=$${i + 1}`)
        .join(",")}
      WHERE id=${id}
      RETURNING *`;
      const result = await connection.query(sql, Object.values(u));
      connection.release();
      return result.rows[0];
    } catch (err: unknown) {
      throw new Error(
        `cannot update ${this.table.slice(0, -1)}:${u.firstName} ${u.lastName}, ${
          (err as Error).message
        } `
      );
    }
  }

  async delete(id: string): Promise<crudModel> {
    try {
      const connection = await database.connect();
      const sql: string = `DELETE FROM ${this.table}
      WHERE id=$1
      RETURNING *`;
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (err: unknown) {
      throw new Error(`cannot delete ${this.table.slice(0, -1)}: ${id}, ${(err as Error).message};
    )`);
    }
  }
}
export default Model;
