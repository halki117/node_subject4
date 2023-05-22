import { User } from './entities/users.entity';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv'; // .envの変数を使うため

// dotenvのconfigメソッドを呼び出して、.envファイルの変数を読み込む
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql', // MySQL の場合
  host: process.env.DATABASE_HOST, // docker-compose.yml で指定したコンテナの service 名
  port: parseInt(process.env.DATABASE_PORT, 10), // ポート番号(そのままだと文字型なので数値型に変換している)
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  logging: true, // コンソール画面に実行したSQLが表示される
  synchronize: false, // true にすると migration が自動で実行される。
  entities: [User], // エンティティクラスを指定する（複数の場合はカンマで区切る）
  migrations: ['dist/migration/*.js'], // dist ディレクトリ内の js ファイルを指定する
});