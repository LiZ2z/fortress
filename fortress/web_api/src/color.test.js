import Color from './color';

it('hex to rgb 转换', () => {
  console.log(Color.of('rgb(24,144,255)').hsl().rgb().toString());
  expect(Color.of('#1890ff').rgb().toString()).toBe('rgb(24,144,255)');
});

// it('hex to hsl 转换', () => {
//   expect(Color.of('#1890ff').rgb().hsl().toString()).toBe('hsl(209,1,0.55)');
// });

// it('hsl to rgb 转换', () => {
//   console.log(Color.of('rgb(24,144,255)').hsl().rgb().toString());
//   expect(Color.of('hsl(209,1,0.55)').rgb().toString()).toBe('rgb(24,144,255)');
// });
