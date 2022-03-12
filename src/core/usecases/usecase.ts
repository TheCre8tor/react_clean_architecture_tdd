import { Failure } from '../error/failures/failure';

type UseCaseType<T> = Failure | T;

export abstract class UseCase<T, P> {
  abstract call(params: P): UseCaseType<T>;
}
