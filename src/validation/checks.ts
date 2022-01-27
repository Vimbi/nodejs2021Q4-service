import { HttpException, HttpStatus } from '@nestjs/common';

export const checkExistence = (data, message) => {
  if (Array.isArray(data)) {
    if (data.length === 0)
      throw new HttpException(message, HttpStatus.NOT_FOUND);
  } else {
    if (typeof data === 'undefined') {
      throw new HttpException(message, HttpStatus.NOT_FOUND);
    }
  }
};

export const checkDataCreation = (data, message: string) => {
  if (typeof data === 'undefined') {
    throw new HttpException(message, HttpStatus.BAD_REQUEST);
  }
};

export const checkRemoval = (removeSuccess, message) => {
  if (!removeSuccess.affected) {
    throw new HttpException(message, HttpStatus.NOT_FOUND);
  }
};
