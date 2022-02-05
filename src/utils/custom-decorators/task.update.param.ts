import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const TaskUpdateParam = createParamDecorator(
  async (data, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const body = request.body;
    const boardId = request.params.boardId;
    const id = request.params.id;

    const result = {
      ...body,
      boardId,
      id,
    };

    return result;
  }
);
