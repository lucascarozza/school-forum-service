import { UniqueEntityId } from "@/core/entitites/unique-entity-id";
import { DomainEvent } from "@/core/events/domain-event";
import { Answer } from "../entities/answer";

export class AnswerCreatedEvent implements DomainEvent {
  public ocurredAt: Date;
  public answer: Answer;

  constructor(answer: Answer) {
    this.ocurredAt = new Date();
    this.answer = answer;
  }

  getAggregateId(): UniqueEntityId {
    return this.answer.id;
  }
}
