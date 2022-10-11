import {Node, tree, Operator} from "./tree";
import {strictEqual} from "assert";

describe('tests for compliance', () => {
    it('toString work as expected', () => {
        strictEqual("((7 + ((3 - 2) x 5)) ÷ 6)", tree.toString());
    })

    it('result is fine', () => {
        strictEqual(2, tree.result());
    })
})

describe('test input parameters and representation', () =>{
    it('negative values are allowed', () => {
        strictEqual(Node(Operator.PLUS, [2,-1]).result(), 1)
        strictEqual(Node(Operator.PLUS, [2,-1]).toString(),"(2 + -1)")
    })
    it('float values are allowed', () => {
        strictEqual(Node(Operator.MINUS, [5.55,3.33]).result(),2.22)
        strictEqual(Node(Operator.MINUS, [5.55,3.33]).toString(), "(5.55 - 3.33)")
    })
})