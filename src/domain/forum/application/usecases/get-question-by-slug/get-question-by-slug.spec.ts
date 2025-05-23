import { InMemoryQuestionsRepository } from "tests/in-memory-repositories/in-memory-questions-repository";
import { GetQuestionBySlugUseCase } from "./get-question-by-slug";
import { makeQuestion } from "tests/factories/make-question";
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug/slug";
import { InMemoryQuestionAttachmentsRepository } from "tests/in-memory-repositories/in-memory-question-attachments-repository";

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: GetQuestionBySlugUseCase; // System under test

describe("Get Question By Slug", () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository();
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository
    );
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to find a question by its slug", async () => {
    const newQuestion = makeQuestion({ slug: Slug.create("nova-pergunta") });

    await inMemoryQuestionsRepository.create(newQuestion);

    const result = await sut.execute({
      slug: "nova-pergunta",
    });

    expect(result.value).toMatchObject({
      question: expect.objectContaining({
        title: newQuestion.title,
      }),
    });
  });
});
