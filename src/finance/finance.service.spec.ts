import { Test, TestingModule } from '@nestjs/testing';
import { FinanceService } from './finance.service';
import { FinanceModel } from '../db/models/Finance.model';
import { DatabaseModule } from '../db/database.module';

describe('FinanceService', () => {
  let service: FinanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [FinanceService],
    }).compile();

    service = module.get<FinanceService>(FinanceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findFinanceById', () => {
    it('should return a finance if found', async () => {
      const mockFinance = { id: 1, userId: 1, valor: 10.1, descricao: 'Descrição 1' };

      jest.spyOn(FinanceModel, 'query').mockReturnValue({
        findOne: jest.fn().mockResolvedValue(mockFinance),
      } as any);

      const result = await service.findFinanceById(1);
      expect(result).toEqual(mockFinance);
      expect(FinanceModel.query).toHaveBeenCalled();
    });

    it('should return falsy if finance not found', async () => {
      jest.spyOn(FinanceModel, 'query').mockReturnValue({
        findOne: jest.fn().mockResolvedValue(undefined),
      } as any);

      const result = await service.findFinanceById(11);
      expect(result).toBeFalsy();
    });
  });

  describe('findAllFinances', () => {
    it('should return a list of non-deleted finances if found', async () => {
      const mockFinances = [
        { id: 1, userId: 1, valor: 10.1, descricao: 'Descrição 1' },
        { id: 2, userId: 2, valor: 20.2, descricao: 'Descrição 2' },
        { id: 3, userId: 3, valor: 30.3, descricao: 'Descrição 3' },
      ];

      jest.spyOn(FinanceModel, 'query').mockReturnValue({
        where: jest.fn().mockResolvedValue(mockFinances),
      } as any);

      const result = await service.findAllFinances();
      expect(result).toEqual(mockFinances);
      expect(FinanceModel.query).toHaveBeenCalled();
    });

    it('should return falsy if non-deleted finances found', async () => {
      jest.spyOn(FinanceModel, 'query').mockReturnValue({
        where: jest.fn().mockResolvedValue(undefined),
      } as any);

      const result = await service.findAllFinances();
      expect(result).toBeFalsy();
    });
  });

  describe('createFinance', () => {
    it('should create and return a new finance', async () => {
      const newFinance = { userId: 2, valor: 20.2, descricao: 'Descrição 2' };
      const createdFinance = { id: 2, ...newFinance };

      jest.spyOn(FinanceModel, 'query').mockReturnValue({
        insert: jest.fn().mockResolvedValue(createdFinance),
      } as any);

      const result = await service.createFinance(newFinance);
      expect(result).toEqual(createdFinance);
      expect(FinanceModel.query).toHaveBeenCalled();
      expect(FinanceModel.query().insert).toHaveBeenCalledWith(newFinance);
    });
  });
});
