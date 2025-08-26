import { Model } from 'objection';

export class BaseModel extends Model {
  readonly id: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}
