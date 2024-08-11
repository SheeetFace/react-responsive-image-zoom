# React Responsive Image Zoom 🔍

A lightweight and customizable React component that provides a smooth zoom effect on images when hovered over. It supports responsive zoom factors based on screen width breakpoints,adapting to different screen, and includes an optional debug mode.

## ✨ Features

- 🏋️‍♀️ **Lightweight:** Small bundle size, perfect for performance-conscious applications.
- 🔌 **No external dependencies:** Works out of the box with React.
- 📱  **Responsive:** Automatically adapts to different screen sizes, including mobile devices.
- 🎨 **Customizable:** Easily adjust zoom factors, transitions, and breakpoints.
- 🐞 **Debug mode:** Optional feature for development and testing.

## 📦 Installation

```bash
npm install react-responsive-image-zoom
```
# 🎥 Example
![example](http://res.cloudinary.com/dof771xd5/image/upload/v1723390844/tukgfj5q5gtkfczy1cqy.gif)

# 🚀 Usage

```jsx
import React from 'react';
import { ImageZoom } from 'react-responsive-image-zoom';

const App = () => {
  return (
    <ImageZoom
      src="/path/to/image.jpg"
      defaultZoomFactor={1.5}
      transition={0.5}
      breakpoints={[
        { maxWidth: 768, zoomFactor: 1.2 },
        { maxWidth: 1024, zoomFactor: 1.4 }
      ]}
      imgClassName="my-image-class"
      debug={false}
    />
  );
};

export default App;
```

## 🎛️ Props

| Prop                | Type                | Default | Description                                                        |
| ------------------- | ------------------- | ------- | ------------------------------------------------------------------ |
| `src`               | `string`            | -       | The source URL of the image (required)                             |
| `defaultZoomFactor` | `number`            | `1.3`   | The default zoom factor to use when no breakpoints match           |
| `transition`        | `number`            | `0.3`   | The duration of the zoom transition in seconds                     |
| `breakpoints`       | `Array<Breakpoint>` | `[]`    | An array of breakpoints for responsive zoom factors                |
| `imgClassName`      | `string`            | -       | Additional CSS class name for the image element                    |
| `debug`             | `boolean`           | `false` | Enable debug mode to show current width and zoom factor            |

## 📊 Breakpoint Object

| Property    | Type     | Description                                               |
| ----------- | -------- | --------------------------------------------------------- |
| `maxWidth`  | `number` | The maximum screen width for this breakpoint              |
| `zoomFactor`| `number` | The zoom factor to use for this breakpoint                |

## 🚀 Performance and Optimization

- 🏋️‍♀️ **Lightweight:** This package has a very small footprint, ensuring minimal impact on your application's load time and performance.
- 🔌 **No Dependencies:** `react-responsive-image-zoom` doesn't include any additional dependencies, keeping your project lean.
- 📱 **Responsive Design:** The component automatically adapts to different screen sizes, making it suitable for both desktop and mobile devices.
- 🖼️ **Automatic Image Scaling:** The underlying `<img>` element automatically scales to fit its container, ensuring proper display across different device sizes.
- ⚡ **Optimized Rendering:** Uses `React.memo`, `useCallback`, and `useMemo` for optimized performance.

⚠️ **Note:** When the `debug` prop is set to `true`, the component will update its state and re-render on every window resize event. This can impact performance, especially on devices with frequently changing viewport sizes. It's recommended to use the `debug` prop only during development or testing, and to disable it in production environments.# react-responsive-image-zoom
# react-responsive-image-zoom
