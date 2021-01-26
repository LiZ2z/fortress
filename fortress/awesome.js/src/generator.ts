
const a = [1, 2, 3]

function* createIterator(values) {
  for (let i = 0, len = values.length; i < len; i += 1) {
    yield values[i]
  }
}


const b = createIterator(a)

console.log(b.next())
console.log(b.next())
console.log(b.next())
console.log(b.next())
console.log(b.next())
console.log(b.next())
