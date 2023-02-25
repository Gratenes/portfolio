export function lerp(x: number, y: number, a: number) {
    return (1 - a) * x + a * y
}

export function clamp(x: number, min: number, max: number) {
   return Math.min(Math.max(x, min), max)
}

export function randomRange(lb: number, ub: number, rng: () => number){
    if(ub < lb){
        throw Error("upper bound has to be greater than lower bound")
    }

    return rng()*(ub-lb)+lb
}

export function randomSin(seed = Math.PI / 4) { // ~3.4 million b4 repeat.
    // https://stackoverflow.com/a/19303725/1791917
    return () => {
        const x = Math.sin(seed++) * 10000
        return x - Math.floor(x)
    }
}