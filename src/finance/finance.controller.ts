import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Res, UnprocessableEntityException } from '@nestjs/common';
import type { Response } from 'express';
import { FinanceService } from './finance.service';
import { newFinance } from './dto/newFinance.dto';
import { updatedFinance } from './dto/updatedFinance.dto';

@Controller('finances')
export class FinanceController {
  constructor(private financeService: FinanceService) {}

  @Get('')
  async getAllFinances(@Res() response: Response) {
    const allFinances = await this.financeService.findAllFinances();
    return response
      .status(200)
      .send({ message: 'Todos os Lançamentos Financeiros logicamente não deletados (isDeleted=false)', data: allFinances });
  }

  @Get('/:financeId')
  async getFinanceById(
    @Param('financeId', ParseIntPipe) financeId: number,
    @Res() response: Response,
  ) {
    const finance = await this.financeService.findFinanceById(financeId);
    if (!finance) {
      throw new UnprocessableEntityException(
        'O Lançamento Financeiro com o Id informado não existe',
      );
    }
    return response
      .status(200)
      .send({ message: 'Lançamento Financeiro encontrado com sucesso', data: finance });
  }

  @Post('/new')
  async createUser(@Body() financeDto: newFinance, @Res() response: Response) {
    try {
      const newFinance = await this.financeService.createFinance(financeDto);
      return response
        .status(201)
        .send({ message: 'Lançamento Financeiro criado com sucesso', data: newFinance });
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  @Patch('/:financeId/update')
  async updateUser(
    @Param('financeId', ParseIntPipe) financeId: number,
    @Body() updateFinanceDto: updatedFinance,
    @Res() response: Response,
  ) {
    try {
      const updateFinance = await this.financeService.updateFinance(
        financeId,
        updateFinanceDto,
      );
      if (!updateFinance) {
        throw new UnprocessableEntityException(
          'Ocorreu um erro ao tentar atualizar esse Lançamento Financeiro, por favor tente novamente mais tarde',
        );
      }
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
    const updatedFinance = await this.financeService.findFinanceById(financeId);
    return response
      .status(201)
      .send({ message: 'Lançamento Financeiro atualizado com sucesso', data: updatedFinance });
  }

  @Delete('/:financeId')
  async deleteUserById(
    @Param('financeId', ParseIntPipe) financeId: number,
    @Res() response: Response,
  ) {
    try {
      const deleteFinance = await this.financeService.deleteFinance(financeId);
      if (!deleteFinance) {
        throw new UnprocessableEntityException(
          'Ocorreu um erro ao tentar deletar esse Lançamento Financeiro, por favor tente novamente mais tarde',
        );
      }
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
    const deletedFinance = await this.financeService.findFinanceById(financeId);
    return response
      .status(201)
      .send({ message: 'Lançamento Financeiro deletado com sucesso', data: deletedFinance });
  }
}
