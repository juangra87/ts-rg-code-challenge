type OperatorMetadata ={
    id: string
    apply(values: Array<Operation>)
    numOfParameters: number
}

const Operators = {
    PLUS: {
        id: "+",
        apply: (values: Array<Operation>) => values[0].result() + values[1].result(),
        numOfParameters: 2
    },
    MINUS: {
        id: "-",
        apply: (values: Array<Operation>) => values[0].result() - values[1].result(),
        numOfParameters: 2
    },
    MULTIPLICATION: {
        id: "x",
        apply: (values: Array<Operation>) => values[0].result() * values[1].result(),
        numOfParameters: 2
    },
    DIVISION: {
        id: "÷",
        apply: (values: Array<Operation>) => values[0].result() / values[1].result(),
        numOfParameters: 2
    },
    SINGLE_VALUE: {
        id: "",
        apply: (values: Array<Operation>) => values[0],
        numOfParameters: 1
    }
}

interface Operation {
    values: Array<Operation> | number;

    toString(): string;

    result(): number;
}

const Node = (operator: OperatorMetadata, values: Array<Operation> | number) => {

    const result = function (): number {
        if (operator === Operators.SINGLE_VALUE && typeof values === 'number') {
            return values
        } else {
            return operator.apply(this.values)
        }
    }

    const toString = function (): string {
        if (operator === Operators.SINGLE_VALUE) {
            return values.toString()
        } else {
            return `(${values[0].toString()} ${(operator.id)} ${values[1].toString()})`;
        }
    }

    return {result, toString, values}
}

export const tree =
    Node(Operators.DIVISION, [
        Node(Operators.PLUS, [
            Node(Operators.SINGLE_VALUE, 7),
            Node(Operators.MULTIPLICATION, [
                Node(Operators.MINUS, [
                    Node(Operators.SINGLE_VALUE, 3),
                    Node(Operators.SINGLE_VALUE, 2)
                ]),
                Node(Operators.SINGLE_VALUE, 5)
            ])
        ]),
        Node(Operators.SINGLE_VALUE, 6)
    ]);

