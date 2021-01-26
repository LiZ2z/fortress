import InnerFlex from './Flex';
import FlexItem from './FlexItem';
declare type InnerFlexType = typeof InnerFlex;
interface FlexType extends InnerFlexType {
    Item: typeof FlexItem;
}
declare const Flex: FlexType;
export default Flex;
