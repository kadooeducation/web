export class Left<L, A> {
  constructor(readonly value: L) {}

  isLeft(): this is Left<L, A> {
    return true
  }

  isRight(): this is Right<L, A> {
    return false
  }
}

export class Right<L, A> {
  constructor(readonly value: A) {}

  isLeft(): this is Left<L, A> {
    return false
  }

  isRight(): this is Right<L, A> {
    return true
  }
}

export type Either<L, A> = Left<L, A> | Right<L, A>

export function left<L, A>(value: L): Either<L, A> {
  return new Left(value)
}

export function right<L, A>(value: A): Either<L, A> {
  return new Right(value)
}
