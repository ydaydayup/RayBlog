---  
title: 【解决问题】根据react中的类型工具理解实例类型 属性类型.md
date: 2024-08-23 
authors: Ray  
tags: [ 解决问题, react中的类型 ,实例类型 ,属性类型 ]  
keywords: [ 解决问题, react中的类型 ,实例类型 ,属性类型 ]  
description: 在 TypeScript 中，理解“实例类型”和“属性类型”
#image: https://img.kuizuo.cn/202312270328599.png  
sticky: 2  
---  

<!-- truncate -->

## 问题

### 背景

我想增加DialogPrimitive.Portal的属性

```typescript jsx
const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
  </DialogPortal>
));
```

### 我的解决方案


```typescript jsx
// DialogPrimitive.Content是一个react组件，typeof DialogPrimitive.Content是获取该组件的类型（实例类型）实例类型合并是无法通过React.ComponentPropsWithoutRef获取到属性类型（就是函数的传参）
type  ErrorDialogContentProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content & typeof DialogPrimitive.Portal>

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className, container, children, ...props }, ref) => (
  <DialogPortal container={container}>

  </DialogPortal>
));
```

```typescript jsx
//  先提取属性类型，再合并
type DialogContentProps =
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
  & React.ComponentPropsWithoutRef<typeof DialogPrimitive.Portal>

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className, container, children, ...props }, ref) => (
  <DialogPortal container={container}>

  </DialogPortal>
));
```

### React.ComponentPropsWithoutRef 的解释
> `Used to retrieve the props a component accepts without its ref. Can either be passed a string, indicating a DOM element (e. g. 'div', 'span', etc.) or the type of a React component.
Example:
// Retrieves the props an 'input' element accepts type InputProps = React. ComponentPropsWithoutRef<'input'>;
Example:
const MyComponent = (props: { foo: number, bar: string }) => <div />;  // Retrieves the props 'MyComponent' accepts type MyComponentPropsWithoutRef = React. ComponentPropsWithoutRef<typeof MyComponent>;
See also:
@link https:// react-typescript-cheatsheet. netlify. app/ docs/ react-types/ componentprops/  React TypeScript Cheatsheet`


## 理解“实例类型”和“属性类型”的区别

在 TypeScript 中，理解“实例类型”和“属性类型”的区别是很重要的，因为它们在定义和使用组件时扮演着不同的角色。
### 实例类型（Instance Type）

实例类型通常指的是一个类或组件在创建后，其实例所具有的类型。当你创建一个类的实例或使用一个组件时，这个实例会包含类或组件定义的所有属性和方法。在 React 组件的情况下，实例类型通常指的是组件的实例对象，它包括了组件的所有状态、方法和属性。

例如，如果你有一个类 `Person`，它的实例类型将包括 `name` 和 `age` 属性，以及可能定义的任何方法。

```typescript
class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
  }
}

const person = new Person("Alice", 30);
// `person` 是 `Person` 类的实例类型
```

### 属性类型（Props Type）

在 React 组件中，属性类型（Props Type）指的是组件接受的外部输入，也就是组件的属性（props）。这些属性可以是数据、回调函数或其他任何类型的值，它们被父组件传递给子组件，用于控制组件的行为或显示。

属性类型通常在组件定义时通过 TypeScript 的类型注解来指定，这样可以确保组件接收到正确类型的属性。

例如，如果你有一个 React 组件 `Greeting`，它接受一个 `name` 属性：

```typescript
interface GreetingProps {
  name: string;
}

const Greeting: React.FC<GreetingProps> = ({ name }) => {
  return <h1>Hello, {name}!</h1>;
};
```

在这个例子中，`GreetingProps` 就是 `Greeting` 组件的属性类型。

### 区别和应用

- **实例类型** 关注的是组件或类在实例化后的状态和行为。
- **属性类型** 关注的是组件或类从外部接收的数据和参数。

在 React 组件中，你通常会定义属性类型来确保组件接收到正确类型的数据，而实例类型则涉及到组件内部的状态和方法。在 TypeScript 中，你可以使用类型注解和接口来定义这些类型，以提高代码的可维护性和类型安全性。
