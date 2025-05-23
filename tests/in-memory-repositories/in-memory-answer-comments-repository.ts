import { PaginationParams } from "@/core/repositories/pagination-params";
import { AnswerCommentsRepository } from "@/domain/forum/application/repositories/answer-comments-repository";
import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment";

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  public items: AnswerComment[] = [];

  async create(answerComment: AnswerComment) {
    this.items.push(answerComment);
  }

  async delete(answercomment: AnswerComment) {
    const answercommentIndex = this.items.findIndex(
      (item) => item.id === answercomment.id
    );

    this.items.splice(answercommentIndex, 1);
  }

  async findById(id: string) {
    const answer = this.items.find((item) => item.id.toString() === id);

    if (!answer) return null;

    return answer;
  }

  async findManyByAnswerId(answerId: string, { page }: PaginationParams) {
    const answerComments = this.items
      .filter((item) => item.answerId.toString() === answerId)
      .slice((page - 1) * 20, page * 20);

    return answerComments;
  }
}
