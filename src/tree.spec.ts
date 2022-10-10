import {tree} from "./tree";
import {strictEqual} from "assert";

describe('tests for compliance', () => {
    it('toString work as expected', () => {
        strictEqual("((7 + ((3 - 2) x 5)) ÷ 6)", tree.toString());
    })

    it('result is fine', () => {
        strictEqual(2, tree.result());
    })
})