import { Test, TestingModule } from '@nestjs/testing';
import { FinanceController } from './finance.controller';
import { financeMock, financeServiceMock, responseMock, statusResponseMock } from './finance.service.mock';

describe('FinanceController', () => {
  let financeController: FinanceController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FinanceController],
      providers: [financeServiceMock],
    }).compile();

    financeController = module.get<FinanceController>(FinanceController);
  });

  it('should be defined', () => {
    expect(financeController).toBeDefined();
  });

  it('Should get all finances', async () => {
    const result = await financeController.getAllFinances(responseMock);
    expect(responseMock.status).toHaveBeenCalledWith(200);
    expect(statusResponseMock.send).toHaveBeenCalledWith(result);
  });

  it('Should get finance', async () => {
    const result = await financeController.getFinanceById(financeMock.id, responseMock);
    expect(responseMock.status).toHaveBeenCalledWith(200);
    expect(statusResponseMock.send).toHaveBeenCalledWith(result);
  });

  it('Should create finance', async () => {
    const newFinance = { ...financeMock };
    delete newFinance.id;
    const result = await financeController.createFinance(newFinance, responseMock);
    expect(responseMock.status).toHaveBeenCalledWith(201);
    expect(statusResponseMock.send).toHaveBeenCalledWith(result);
  });

  it('Should update finance', async () => {
    const financeData = { ...financeMock };
    delete financeData.id;
    const result = await financeController.updateFinance(financeMock.id, financeData, responseMock);
    expect(responseMock.status).toHaveBeenCalledWith(200);
    expect(statusResponseMock.send).toHaveBeenCalledWith(result);
  });

  it('Should delete finance', async () => {
      const result = await financeController.deleteFinanceById(financeMock.id, responseMock);
      expect(responseMock.status).toHaveBeenCalledWith(200);
      expect(statusResponseMock.send).toHaveBeenCalledWith(result);
  });
});
