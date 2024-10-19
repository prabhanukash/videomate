declare module 'react-konva' {
  import Konva from 'konva';
  import { Component } from 'react';

  export const Stage: typeof Konva.Stage;
  export const Layer: typeof Konva.Layer;
  export const Rect: typeof Konva.Rect;
  export const Text: typeof Konva.Text;
  export const Circle: typeof Konva.Circle;
  export const Line: typeof Konva.Line;
  export const Image: typeof Konva.Image;
  export const Transformer: typeof Konva.Transformer;
  // Add other Konva components as needed
}
