type BasicTypesOfParameters = Operation | number
type OperandTypes = [BasicTypesOfParameters, BasicTypesOfParameters] | number

interface Operation {
    operands: OperandTypes
    result(): number
    toString(): string
}

const getOperandValue = function(parameter: Operation| number ):number {
    if(typeof parameter === 'number'){
        return parameter
    }else{
        return parameter.result();
    }
}

type OperatorMetadata = {
    sign: string
    apply(operands: OperandTypes)
}

export const Operator = {
    PLUS:  {
        sign: "+",
        apply: (operands: OperandTypes) => getOperandValue(operands[0]) + getOperandValue(operands[1])
    },
    MINUS: {
        sign: "-",
        apply: (operands: OperandTypes) => getOperandValue(operands[0]) - getOperandValue(operands[1]),
    },
    MULTIPLICATION: {
        sign: "x",
        apply: (operands: OperandTypes) => getOperandValue(operands[0]) * getOperandValue(operands[1]),
    },
    DIVISION: {
        sign: "÷",
        apply: (operands: OperandTypes) => getOperandValue(operands[0]) / getOperandValue(operands[1]),
    }
}


export const Node = (operator: OperatorMetadata, operands: OperandTypes) => {

    const result = function (): number {
        if (typeof operands === 'number') {
            return operands
        } else {
            return operator.apply(operands)
        }
    }

    const toString = function (): string {
        if (typeof operands === 'number') {
            return operands.toString()
        } else {
            return `(${operands[0].toString()} ${(operator.sign)} ${operands[1].toString()})`;
        }
    }

    return {result, toString, operands}
}

export const tree =
    Node(Operator.DIVISION, [
        Node(Operator.PLUS, [
            7,
            Node(Operator.MULTIPLICATION, [
                Node(Operator.MINUS, [
                    3,
                    2]),
                5
            ])
        ]),
        6
    ]);

