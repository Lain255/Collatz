import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";



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
    ex1.innerHTML = range(1,100,1).map((x) => tag("li", `S(${x}) : ${sequence(x).join(", ")}`)).join("")

    let ex2 = document.getElementById("ex2")
    ex2.innerHTML = range(1,100,2).map((x) => tag("li", odd_sequence(x).join(" -> "))).join("")

    let ex3 = document.getElementById("ex3")
    ex3.innerHTML = range(1,100,2).map((x) => tag("li", x.toString() + " : " + odd_sequence(x).map((y) => primeFactors(y)).join(" -> "))).join("")

    let ex4 = document.getElementById("ex4")
    ex4.innerHTML = range(1,100,2).map((x) => tag("li", x.toString() + " : " + odd_sequence(x).map((y) => y.toString(2)).join(" -> "))).join("")

    let collatzLength = range(1,100).map((n) => ({"n" : n, "Collatz Sequence Length" : sequence(n).length, "Type" : "red"}))
    let plot = Plot.auto(collatzLength, {"x" : "n", "y" : "Collatz Sequence Length"}).plot()
    let div = document.getElementById("g1");
    div.append(plot);

    let collatzOddLength = range(1,100).map((n) => ({"n" : n, "Collatz Odd Sequence Length" : odd_sequence(n).length, "Type" : "blue"}))
    plot = Plot.auto(collatzOddLength, {"x" : "n", "y" : "Collatz Odd Sequence Length"}).plot()
    div = document.getElementById("g2");
    div.append(plot);


    plot = Plot.plot({
        marks : [
            Plot.ruleY([0]),
            Plot.lineY(collatzLength, {x: "n", y: "Collatz Sequence Length", stroke: "red"}),
            Plot.lineY(collatzOddLength, {x: "n", y: "Collatz Odd Sequence Length", stroke: "blue"})
        ]
    })
    div = document.getElementById("g3");
    div.append(plot);
    
    let oddRatio = range(1,300).map((n) => ({"n" : n, "ratio": sequence(n).length / odd_sequence(n).length}))
    plot = Plot.auto(oddRatio, {"x" : "n", "y" : "ratio"}).plot() 
    div = document.getElementById("g4");
    div.append(plot);

    let binaryFractal = range(2,63,2).map((x) => {
        let count = 0
        let y = x
        while(y%2 === 0) {
            count++
            y /= 2
        } 
        return {"n" : x, "Factors of 2" : count}
    })
    plot = Plot.barY(binaryFractal, {"x" : "n", "y" : "Factors of 2"}).plot() 
    div = document.getElementById("g5");
    div.append(plot);
}

