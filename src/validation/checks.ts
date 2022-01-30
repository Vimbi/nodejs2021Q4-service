import { BadRequestException, NotFoundException } from '@nestjs/common';

export const checkExistence = (data, message) => {
  if (Array.isArray(data)) {
    if (data.length === 0) throw new NotFoundException(message);
  } else if (typeof data === 'undefined') {
    throw new NotFoundException(message);
  }
};

export const checkDataCreation = (data, message: string) => {
  if (typeof data === 'undefined') {
    throw new BadRequestException(message);
  }
};

export const checkRemoval = (removeSuccess, message) => {
  if (!removeSuccess.affected) {
    throw new NotFoundException(message);
  }
};
