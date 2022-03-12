import { Failure } from '../error/failure';

type UseCaseType<T> = Failure | T;

export abstract class UseCase<T, P> {
  abstract call(params: P): UseCaseType<T>;
}
