enum Operator {
    PLUS = "+",
    MINUS = "-",
    MULTIPLY = "x",
    DIVISION = "÷",
    NONE = ""
}

const Node = (operator: Operator, value: any, left: any, right: any) => {
    const result = function () {
        switch (operator) {
            case Operator.PLUS:
                return left.result() + right.result();
            case Operator.MINUS:
                return left.result() - right.result();
            case Operator.MULTIPLY:
                return left.result() * right.result();
            case Operator.DIVISION:
                return left.result() / right.result();
            case Operator.NONE:
                return value;
        }
    };

    const toString = function () {
        switch (operator) {
            case Operator.NONE:
                return value.toString();
            default :
                return `(${left.toString()} ${operator} ${right.toString()})`;
        }
    };

    return {
        operator,
        value,
        left,
        right,
        result,
        toString
    };
};

export const tree = Node(
    Operator.DIVISION,
    null,
    Node(
        Operator.PLUS,
        null,
        Node(Operator.NONE, 7, null, null),
        Node(
            Operator.MULTIPLY, null,
            Node(Operator.MINUS, null, Node(Operator.NONE, 3, null, null), Node(Operator.NONE, 2, null, null)),
            Node(Operator.NONE, 5, null, null)
        )
    ),
    Node(Operator.NONE, 6, null, null)
);
