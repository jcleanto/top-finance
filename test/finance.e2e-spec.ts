import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { FinanceModule } from '../src/finance/finance.module';
import { FinanceService } from '../src/finance/finance.service';
import { INestApplication } from '@nestjs/common';

describe('Finance (e2e)', () => {
  let app: INestApplication;
  const financeMock1 = { id: 1, descricao: 'Descrição 1', valor: 10.1 };
  const financeMock2 = { id: 2, descricao: 'Descrição 2', valor: 20.2 };
  let financeService = {
    findAllFinances: () => [financeMock1],
    findFinanceById: () => { return financeMock1 },
    createFinance: () => { return financeMock2 },
    updateFinance: () => true,
    deleteFinance: () => { return financeMock2 },
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [FinanceModule],
    })
      .overrideProvider(FinanceService)
      .useValue(financeService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it(`/GET finances`, () => {
    return request.default(app.getHttpServer())
      .get('/finances')
      .expect(200)
      .expect({
        message: 'Todos os Lançamentos Financeiros logicamente não deletados (isDeleted=false)',
        data: financeService.findAllFinances(),
        count: 1
      });
  });

  it('/finances/:financeId (GET) should return a finance by ID', async () => {
    const financeId = 1;
    const response = await request.default(app.getHttpServer())
      .get(`/finances/${financeId}`)
      .expect(200);

    expect(response.body.data).toHaveProperty('id', financeId);
  });

  it('/finances (POST) should create a finance', async () => {
    const newFinance = {
      descricao: 'Descrição 2',
      valor: 20.2,
    };
    const response = await request.default(app.getHttpServer())
      .post('/finances/new')
      .send(newFinance)
      .expect(201);

    expect(response.body.data.descricao).toEqual(newFinance.descricao);
    expect(response.body.data).toHaveProperty('id');
  });

  it('/finances/:financeId (DELETE) should delete a finance', async () => {
    const financeId = 1;
    const deleteFinance = {
      descricao: 'Descrição 1',
      valor: 10.1,
    };
    const response = await request.default(app.getHttpServer())
      .delete(`/finances/${financeId}`)
      .expect(200);

    expect(response.body.data.descricao).toEqual(deleteFinance.descricao);
  });

  afterAll(async () => {
    await app.close();
  });
});