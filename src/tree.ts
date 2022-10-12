type BasicTypesOfParameters = Operation | number
type OperandTypes = [BasicTypesOfParameters, BasicTypesOfParameters] | number

interface Operation {
    operands: OperandTypes

    result(): number

    toString(): string
}

const isAValidValue = function (value: number) {
    if (Number.isNaN(value)) {
        throw new Error(`A value of the operation is not supported: ${value}`)
    } else if(!Number.isFinite(value)) {
        throw new Error(`Infinite values are not supported: ${value}`)
    }else{
        return true
    }
}

const getOperandValue = function (parameter: Operation | number): number {
    if (typeof parameter === 'number') {
        if (isAValidValue(parameter)) {
            return parameter
        }
    } else {
        return parameter.result();
    }
}

type OperatorMetadata = {
    sign: string
    apply(operands: OperandTypes)
}

export const Operator = {
    PLUS: {
        sign: "+",
        apply: (operands: OperandTypes) => getOperandValue(operands[0]) + getOperandValue(operands[1])

    },
    MINUS: {
        sign: "-",
        apply: (operands: OperandTypes) => getOperandValue(operands[0]) - getOperandValue(operands[1])
    },
    MULTIPLICATION: {
        sign: "x",
        apply: (operands: OperandTypes) => getOperandValue(operands[0]) * getOperandValue(operands[1])
    },
    DIVISION: {
        sign: "÷",
        apply: (operands: OperandTypes) => getOperandValue(operands[0]) / getOperandValue(operands[1])
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


    const formatNumber = function (value: number): string {
        if (value < 0) {
            return `(${value.toString()})`
        } else {
            return value.toString()
        }
    }
    const toString = function (): string {
        if (typeof operands === 'number') {
            return formatNumber(operands)
        } else {
            const leftOperand = typeof operands[0] === 'number' ? formatNumber(operands[0]) : operands[0].toString()
            const rightOperand = typeof operands[1] === 'number' ? formatNumber(operands[1]) : operands[1].toString()
            return `(${leftOperand} ${(operator.sign)} ${rightOperand})`;
        }
    }
    return {result, toString, operands}
}
