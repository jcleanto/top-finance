import { BaseModel } from './Base.model';

export class FinanceModel extends BaseModel {
  static tableName = 'finances';
  userId: number;
  valor: number;
  descricao: string;
}