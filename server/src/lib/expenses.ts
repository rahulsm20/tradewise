import { Asset, Debt, Expenditure, Income } from "@prisma/client";
import prisma from "../../prisma/client";
import { Request, Response } from "express";

export const addUpdateAsset = async ({
  asset,
  req,
  res,
}: {
  asset: Asset;
  req: Request;
  res: Response;
}) => {
  const { id, name, value, type } = asset;
  if (id) {
    const response = await prisma.asset.update({
      where: {
        id,
      },
      data: {
        name,
        value,
        type,
      },
    });
    return res
      .status(200)
      .json({ message: "Asset updated successfully", response });
  } else {
    const response = await prisma.asset.create({
      data: {
        name,
        value,
        type,
        user: {
          connect: {
            userId: req.auth?.payload.sub,
          },
        },
      },
    });
    return res
      .status(200)
      .json({ message: "Debt added successfully", response });
  }
};

export const addUpdateDebt = async ({
  debt,
  req,
  res,
}: {
  debt: Debt;
  req: Request;
  res: Response;
}) => {
  const { id, name, amount, startDate, interestRate } = debt;
  if (id) {
    const response = await prisma.debt.update({
      where: {
        id,
      },
      data: {
        name,
        amount,
        startDate,
        interestRate,
      },
    });
    return res
      .status(200)
      .json({ message: "Debt updated successfully", response });
  } else {
    const response = await prisma.debt.create({
      data: {
        name,
        amount,
        startDate,
        interestRate,
        user: {
          connect: {
            userId: req.auth?.payload.sub,
          },
        },
      },
    });
    return res
      .status(200)
      .json({ message: "Asset added successfully", response });
  }
};

export const addUpdateIncome = async ({
  income,
  req,
  res,
}: {
  income: Income;
  req: Request;
  res: Response;
}) => {
  const { id, value, source, date } = income;
  if (id) {
    const response = await prisma.income.update({
      where: {
        id,
      },
      data: {
        value,
        source,
        date,
      },
    });
    return res
      .status(200)
      .json({ message: "Debt updated successfully", response });
  } else {
    const response = await prisma.income.create({
      data: {
        value,
        source,
        date,
        user: {
          connect: {
            userId: req.auth?.payload.sub,
          },
        },
      },
    });
    return res
      .status(200)
      .json({ message: "Asset added successfully", response });
  }
};

export const addUpdateExpenditure = async ({
  expenditure,
  req,
  res,
}: {
  expenditure: Expenditure;
  req: Request;
  res: Response;
}) => {
  const { id, value, name, date } = expenditure;
  if (id) {
    const response = await prisma.expenditure.update({
      where: {
        id,
      },
      data: {
        value,
        date,
        name,
      },
    });
    return res.status(200).json({
      message: "Expense data updated successfully",
      response,
    });
  } else {
    const response = await prisma.expenditure.create({
      data: {
        value,
        name,
        date,
        user: {
          connect: {
            userId: req.auth?.payload.sub,
          },
        },
      },
    });
    return res.status(200).json({
      message: "Expense data added successfully",
      response,
    });
  }
};
