import { Inject, Injectable } from '@nestjs/common';
import objection from 'objection';
import { FinanceModel } from 'src/db/models/Finance.model';
import { FinanceInterface } from './interface/finance.interface';
import { newFinance } from './dto/newFinance.dto';
import { updatedFinance } from './dto/updatedFinance.dto';

@Injectable()
export class FinanceService {
  constructor(@Inject('FinanceModel') private FinanceClass: objection.ModelClass<FinanceModel>) {}

  // find one Finance by id
  async findFinanceById(financeId: number): Promise<FinanceInterface> {
    return await this.FinanceClass.query().findOne({ id: financeId });
  }

  // find all non-deleted Finances
  async findAllFinances(): Promise<FinanceInterface[]> {
    return await this.FinanceClass.query().where('isDeleted', false);
  }

  // create a new Finance
  async createFinance(newFinance: newFinance): Promise<FinanceInterface> {
    const createdFinance: FinanceInterface = await this.FinanceClass.query().insert(
      newFinance,
    );
    return createdFinance;
  }

  // update an existent Finance
  async updateFinance(financeId: number, updatedFinance: updatedFinance): Promise<boolean> {
    await this.FinanceClass.query().update(updatedFinance).where('id', financeId);
    return true;
  }

  // mark an Finance as deleted
  async deleteFinance(FinanceId: number): Promise<boolean> {
    const deletedFinance: updatedFinance = new updatedFinance();
    deletedFinance.isDeleted = true;
    deletedFinance.deletedAt = new Date().toISOString();
    await this.FinanceClass.query().update(deletedFinance).where('id', FinanceId);
    return true;
  }
}
