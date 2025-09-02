import type { Response } from 'express';
import { FinanceService } from './finance.service';
import { FinanceInterface } from './interface/finance.interface';

export const financeMock: FinanceInterface = {
  id: 1,
  userId: 1,
  valor: 10.1,
  descricao: 'Descrição 1',
  isDeleted: false,
  createdAt: null,
  updatedAt: null,
  deletedAt: null,
};

export const statusResponseMock = {
  send: jest.fn((x) => x),
  json: jest.fn((x) => x),
  end: jest.fn(),
};

export const responseMock = {
  status: jest.fn((x) => statusResponseMock),
  send: jest.fn((x) => x),
  json: jest.fn((x) => x),
  end: jest.fn(),
} as unknown as Response;

export const financeServiceMock = {
    provide: FinanceService,
    useValue: {
      findFinanceById: jest.fn().mockResolvedValue(financeMock),
      findAllFinances: jest.fn().mockResolvedValue([financeMock]),
      findAllFinancesByUserId: jest.fn().mockResolvedValue([financeMock]),
      createFinance: jest.fn().mockResolvedValue(financeMock),
      updateFinance: jest.fn().mockResolvedValue(financeMock),
      deleteFinance: jest.fn().mockResolvedValue(true)
    }
}