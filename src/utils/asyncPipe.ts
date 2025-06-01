type MaybePromise<T> = T | Promise<T>

export class CancellationError extends Error {
    constructor(reason?: string) {
        super(reason || 'Operation was cancelled')
        this.name = 'CancellationError'
    }
}

export async function asyncPipe<T>(
    value: MaybePromise<T>,
    signal?: AbortSignal
): Promise<T>
export async function asyncPipe<T, A>(
    value: MaybePromise<T>,
    fn1: (input: T) => MaybePromise<A>,
    signal?: AbortSignal
): Promise<A>
export async function asyncPipe<T, A, B>(
    value: MaybePromise<T>,
    fn1: (input: T) => MaybePromise<A>,
    fn2: (input: A) => MaybePromise<B>,
    signal?: AbortSignal
): Promise<B>
export async function asyncPipe<T, A, B, C>(
    value: MaybePromise<T>,
    fn1: (input: T) => MaybePromise<A>,
    fn2: (input: A) => MaybePromise<B>,
    fn3: (input: B) => MaybePromise<C>,
    signal?: AbortSignal
): Promise<C>
export async function asyncPipe<T, A, B, C, D>(
    value: MaybePromise<T>,
    fn1: (input: T) => MaybePromise<A>,
    fn2: (input: A) => MaybePromise<B>,
    fn3: (input: B) => MaybePromise<C>,
    fn4: (input: C) => MaybePromise<D>,
    signal?: AbortSignal
): Promise<D>
export async function asyncPipe<T, A, B, C, D, E>(
    value: MaybePromise<T>,
    fn1: (input: T) => MaybePromise<A>,
    fn2: (input: A) => MaybePromise<B>,
    fn3: (input: B) => MaybePromise<C>,
    fn4: (input: C) => MaybePromise<D>,
    fn5: (input: D) => MaybePromise<E>,
    signal?: AbortSignal
): Promise<E>

export async function asyncPipe(value: any, ...args: any[]): Promise<any> {
    function isAbortSignal(arg: any): arg is AbortSignal {
        return (
            arg &&
            typeof arg === 'object' &&
            'aborted' in arg &&
            typeof arg.aborted === 'boolean'
        )
    }

    const lastArg = args[args.length - 1]
    const signal = isAbortSignal(lastArg) ? lastArg : undefined
    const fns = signal ? args.slice(0, -1) : args

    function checkAbortion(): void {
        if (signal?.aborted) {
            throw new CancellationError(
                signal.reason || 'Operation was aborted'
            )
        }
    }

    checkAbortion()
    let result = await value

    for (const fn of fns) {
        checkAbortion()
        result = await fn(result)
    }

    return result
}
