function primeFactorsList(n) {
    let factors = []
    let factor = 2
    while (n > 1) {
        if (n%factor === 0) {
            factors.push(factor)
            n /= factor
        }
        else {
            factor++
        }
    }

    if (factors.length === 0) {
        return [1]
    }

    return factors
}

function primeFactors(n) {
    return primeFactorsList(n).join("*")
}

function step(n) {
    if (n % 2 === 1) {
        return 3*n+1
    }
    return n/2
}

function sequence(n) {
    let seq = [n]
    while (n !== 1) {
        n = step(n)
        seq.push(n)
    }
    return seq
}

function odd_sequence(n) {
    return sequence(n).filter((x) => x%2 === 1)
}

const range = (start, stop, step=1) => 
    Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);
const tag = (tag, content) => `<${tag}>${content}</${tag}>`

window.onload = () => {
    let ex1 = document.getElementById("ex1")
    ex1.innerHTML = range(1,100,1).map((x) => tag("li", sequence(x).join(" -> "))).join("")

    let ex2 = document.getElementById("ex2")
    ex2.innerHTML = range(1,100,2).map((x) => tag("li", odd_sequence(x).join(" -> "))).join("")

    let ex3 = document.getElementById("ex3")
    ex3.innerHTML = range(1,100,2).map((x) => tag("li", x.toString() + " : " + odd_sequence(x).map((y) => primeFactors(y)).join(" -> "))).join("")

    let ex4 = document.getElementById("ex4")
    ex4.innerHTML = range(1,100,2).map((x) => tag("li", x.toString() + " : " + odd_sequence(x).map((y) => y.toString(2)).join(" -> "))).join("")
}

