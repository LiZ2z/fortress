import InnerFlex from './Flex';
import FlexItem from './FlexItem';

type InnerFlexType = typeof InnerFlex;

interface IFlexType extends InnerFlexType {
  Item: typeof FlexItem;
}

const Flex = InnerFlex as IFlexType;

Flex.Item = FlexItem;

export default Flex;
