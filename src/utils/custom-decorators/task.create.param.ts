import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const TaskCreateParam = createParamDecorator(
  async (data, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const body = request.body;
    const boardId = request.params.boardId;

    const result = {
      ...body,
      boardId,
    };

    return result;
  },
);
