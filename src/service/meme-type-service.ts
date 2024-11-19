import { prisma } from "../app/database";
import { ErrorResponse } from "../error/error-response";
import {
  toMemeTypeResponse,
  toMemeTypeResponseArray,
  type MemeType,
} from "../model/meme-type-model";
import { MemeTypeValidation } from "../validation/meme-type-validation";
import { Validation } from "../validation/validation";

export class MemeTypeService {
  static async getAllMemeType(): Promise<MemeType[]> {
    const memeTypes = await prisma.meme_type.findMany();
    return toMemeTypeResponseArray(memeTypes);
  }

  static async storeMemeType(request: MemeType): Promise<MemeType> {
    const requestBody: MemeType = Validation.validate(
      MemeTypeValidation.memeTypeRequest,
      request
    );

    const [storedMemeType] = await prisma.$transaction([
      prisma.meme_type.create({
        data: {
          name: requestBody.name,
        },
      }),
    ]);

    return toMemeTypeResponse(storedMemeType);
  }

  static async updateMemeTypeByMemeTypeId(
    request: MemeType,
    memeTypeId: number
  ): Promise<MemeType> {
    const requestBody: MemeType = Validation.validate(
      MemeTypeValidation.memeTypeRequest,
      request
    );

    const isMemeTypeExist = await prisma.meme_type.findUnique({
      where: {
        id: memeTypeId,
      },
    });

    if (!isMemeTypeExist) {
      throw new ErrorResponse(404, "meme type not found");
    }

    const [updatedMemeType] = await prisma.$transaction([
      prisma.meme_type.update({
        where: {
          id: memeTypeId,
        },
        data: {
          name: requestBody.name,
        },
      }),
    ]);

    return toMemeTypeResponse(updatedMemeType);
  }

  static async findMemeTypeByMemeTypeId(memeTypeId: number): Promise<MemeType> {
    const memeType = await prisma.meme_type.findUnique({
      where: {
        id: memeTypeId,
      },
    });

    if (!memeType) {
      throw new ErrorResponse(404, "meme type not found");
    }

    return toMemeTypeResponse(memeType);
  }

  static async destroyMemeTypeByMemeTypeId(
    memeTypeId: number
  ): Promise<MemeType> {
    const isMemeTypeExist = await prisma.meme_type.findUnique({
      where: {
        id: memeTypeId,
      },
    });

    if (!isMemeTypeExist) {
      throw new ErrorResponse(404, "meme type not found");
    }

    const [destroyedMemeType] = await prisma.$transaction([
      prisma.meme_type.delete({
        where: {
          id: memeTypeId,
        },
      }),
    ]);

    return toMemeTypeResponse(destroyedMemeType);
  }
}
