import InnerFlex from './Flex'
import FlexItem from './FlexItem'

type InnerFlexType = typeof InnerFlex;

interface FlexType extends InnerFlexType {
    Item: typeof FlexItem;
}

const Flex = InnerFlex as FlexType;

Flex.Item = FlexItem;

export default Flex;