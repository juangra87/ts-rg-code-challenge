import {Node, Operator} from "./tree";
import {strictEqual} from "assert";

describe('tests for compliance', () => {
    const tree =
        Node(Operator.DIVISION, [
            Node(Operator.PLUS, [ 7,
                Node(Operator.MULTIPLICATION, [
                    Node(Operator.MINUS, [3,2]),
                    5
                ])
            ]),
            6
        ]);


    it('toString work as expected', () => {
        strictEqual("((7 + ((3 - 2) x 5)) ÷ 6)", tree.toString());
    })

    it('result is fine', () => {
        strictEqual(2, tree.result());
    })
})

describe('test input parameters and representation', () =>{
    it('negative values are well formatted', () => {
        const tree =Node(Operator.PLUS, [2,-1]);
        expect(tree.result() - 1).toBeLessThan(Number.EPSILON)
        strictEqual(tree.toString(),"(2 + (-1))")
    })

    it('negative values in complex expressions', () => {
        const tree = Node(Operator.DIVISION, [
                        Node(Operator.MULTIPLICATION, [22,-3]),
                        Node(Operator.MINUS,[40,-26])])

        expect(tree.result() -1).toBeLessThan(Number.EPSILON)
        strictEqual(tree.toString(),"((22 x (-3)) ÷ (40 - (-26)))")
    })

    it('float values are allowed', () => {
        const tree = Node(Operator.MINUS, [5.55,3.33])

        expect(tree.result() - 2.22).toBeLessThan(Number.EPSILON)
        strictEqual(tree.toString(), "(5.55 - 3.33)")
    })

    it('NaN values are not allowed', () => {
        const tree = Node(Operator.MINUS, [5.55,Math.sqrt(-1)])

        try{
            tree.result()
        }catch (e){
            strictEqual(e.message, "A value of the operation is not supported: NaN")
        }
        strictEqual(tree.toString(), "(5.55 - NaN)")
    })

    it('Infinite values are not supported', () => {
        const tree = Node(Operator.MINUS, [5.55,Number.NEGATIVE_INFINITY])

        try{
            tree.result()
        }catch (e){
            strictEqual(e.message, `Infinite values are not supported: ${Number.NEGATIVE_INFINITY}`)
        }
        strictEqual(tree.toString(), `(5.55 - (${Number.NEGATIVE_INFINITY}))`)
    })
})